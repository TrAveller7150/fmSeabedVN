import FanWorksList from '@/components/fanworks/FanWorksList'

export default function FanWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="py-[80px] px-[64px]">
          <FanWorksList />
        </div>
      </div>
    </div>
  )
}
