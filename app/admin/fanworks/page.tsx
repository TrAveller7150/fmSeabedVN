'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FanWork {
    id: number
    cover_image_url: string
    author: string
    category: string
    description: string | null
    source_url: string | null
    created_at: string
}

export default function FanWorksAdminPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [works, setWorks] = useState<FanWork[]>([])
    const [loading, setLoading] = useState(true)
  const token = searchParams.get('token') || ''
  const adminPath = process.env.NEXT_PUBLIC_ADMIN_PATH || '/admin'
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        author: '',
        category: '画',
        description: '',
        source_url: '',
        cover_image: null as File | null,
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        checkAuthAndLoad()
    }, [])

  const checkAuthAndLoad = async () => {
    try {
      const authResponse = await fetch('/api/auth/check')
      const authData = await authResponse.json()
      if (!authData.authenticated) {
        const loginToken = token || process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN || ''
        router.push(`/login?token=${loginToken}`)
        return
      }

      await loadWorks()
    } catch (error) {
      const loginToken = token || 'soakckhaikkaot'
      router.push(`/login?token=${loginToken}`)
    } finally {
      setLoading(false)
    }
  }

    const loadWorks = async () => {
        try {
            const response = await fetch('/api/fanworks?limit=100')
            const data = await response.json()
            setWorks(data.data || [])
        } catch (error) {
            console.error('加载作品失败:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        try {
            // 验证必填字段（编辑时封面图可选）
            if (!formData.author || !formData.category) {
                setError('作者和类别不能为空')
                setSubmitting(false)
                return
            }

            if (!editingId && !formData.cover_image) {
                setError('添加作品时封面图不能为空')
                setSubmitting(false)
                return
            }

            const formDataToSend = new FormData()
            formDataToSend.append('author', formData.author)
            formDataToSend.append('category', formData.category)
            formDataToSend.append('description', formData.description)
            formDataToSend.append('source_url', formData.source_url)
            if (formData.cover_image) {
                formDataToSend.append('cover_image', formData.cover_image)
            }

            const url = editingId ? `/api/fanworks/${editingId}` : '/api/fanworks'
            const method = editingId ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                body: formDataToSend,
            })

            const data = await response.json()

            if (response.ok) {
                setShowAddForm(false)
                setEditingId(null)
                setFormData({
                    author: '',
                    category: '画',
                    description: '',
                    source_url: '',
                    cover_image: null,
                })
                await loadWorks()
            } else {
                setError(data.error || (editingId ? '更新失败' : '添加失败'))
            }
        } catch (error) {
            setError('网络错误，请稍后重试')
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch(`/api/fanworks/${id}`)
            const data = await response.json()

            if (response.ok && data.data) {
                const work = data.data
                setEditingId(id)
                setFormData({
                    author: work.author,
                    category: work.category,
                    description: work.description || '',
                    source_url: work.source_url || '',
                    cover_image: null, // 编辑时不重新上传图片
                })
                setShowAddForm(true)
                // 滚动到表单
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                alert('获取作品信息失败')
            }
        } catch (error) {
            alert('网络错误，请稍后重试')
        }
    }

    const handleCancel = () => {
        setShowAddForm(false)
        setEditingId(null)
        setFormData({
            author: '',
            category: '画',
            description: '',
            source_url: '',
            cover_image: null,
        })
    }

    const handleDelete = async (id: number) => {
        if (!confirm('确定要删除这个作品吗？')) {
            return
        }

        try {
            const response = await fetch(`/api/fanworks/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                await loadWorks()
            } else {
                alert('删除失败')
            }
        } catch (error) {
            alert('网络错误，请稍后重试')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">加载中...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">二创作品管理</h1>
                    <div className="space-x-4">
            <button
              onClick={() => {
                const loginToken = token || process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN || ''
                router.push(`${adminPath}?token=${loginToken}`)
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              返回
            </button>
                        <button
                            onClick={() => {
                                if (editingId) {
                                    handleCancel()
                                } else {
                                    setShowAddForm(!showAddForm)
                                }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            {showAddForm || editingId ? '取消' : '添加作品'}
                        </button>
                    </div>
                </div>

                {(showAddForm || editingId) && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingId ? '编辑作品' : '添加新作品'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    作者信息 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="例如：夕原@u_br2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    作品类别 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="画">画</option>
                                    <option value="MAD.AMV">MAD.AMV</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    作品简介
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="作品简介（可选）"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    源地址
                                </label>
                                <input
                                    type="url"
                                    value={formData.source_url}
                                    onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    封面图 {!editingId && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.files?.[0] || null })}
                                    required={!editingId}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                {editingId && (
                                    <p className="mt-1 text-sm text-gray-500">不选择文件则保留原图片</p>
                                )}
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {submitting ? (editingId ? '更新中...' : '提交中...') : (editingId ? '更新' : '提交')}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    取消
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        封面
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        作者
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        类别
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        创建时间
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {works.map((work) => (
                                    <tr key={work.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={work.cover_image_url}
                                                alt={work.author}
                                                className="h-16 w-16 object-cover rounded"
                                                onError={(e) => {
                                                    console.error('图片加载失败:', work.cover_image_url)
                                                    e.currentTarget.src = '/assets/fanworks/fanwork.jpg' // 备用图片
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {work.author}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {work.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(work.created_at).toLocaleDateString('zh-CN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleEdit(work.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    编辑
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(work.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    删除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
