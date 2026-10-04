import { Check, X, User, RotateCcw } from 'lucide-react';
import { Card, PageHeader, StatusBadge, PrimaryButton, SecondaryButton } from '../components/ui';

export default function TimeOff() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-6">
        <PageHeader
          title="Time Off"
          subtitle="See when your team can't work and manage their leave requests."
        />
        <PrimaryButton>+ Add Time Off</PrimaryButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Review Queue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">2</span>
            <span className="text-sm font-medium text-gray-900">waiting approval</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Action required before Friday roster run</p>
        </Card>
        <Card className="bg-white">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Today</p>
            <StatusBadge tone="success">On Leave</StatusBadge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">1</span>
            <span className="text-sm font-medium text-gray-900">person off</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            <User className="w-3 h-3" /> Priya Sharma (Personal)
          </div>
        </Card>
        <Card className="bg-white">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Next 14 Days</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">3</span>
            <span className="text-sm font-medium text-gray-900">upcoming leaves</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Already accommodated in draft</p>
        </Card>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            ✨ Smart Availability Sync
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Approved time off is locked as <span className="font-semibold text-gray-900">unavailable time</span> in the solver. Shifts are reassigned using qualified staff to prevent overtime penalties.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Needs Your Attention</h2>
            <StatusBadge tone="warning">2 waiting</StatusBadge>
          </div>
          <p className="text-sm text-gray-500">Review promptly to prevent scheduling bottlenecks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><User className="text-gray-500 w-5 h-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Priya Sharma <span className="font-normal text-gray-500">Full-time</span></p>
                  <p className="text-xs text-gray-500">Senior Barista · Level 2 Specialist</p>
                </div>
              </div>
              <StatusBadge tone="info">Personal</StatusBadge>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-gray-900">Friday, 18 Oct - Full Day (1 day)</p>
              <p className="text-sm text-gray-600 mt-1 italic">"Need to attend a family function out of town."</p>
            </div>

            <div className="bg-red-50 rounded-lg p-3 mb-4 border border-red-100 flex gap-2">
              <span className="text-red-600 mt-0.5">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-red-900">Scheduled for Morning Shift (7:00-15:30) on Friday</p>
                <p className="text-xs text-red-700 mt-1">Approving this leave will create 1 open slot. 2 alternative Baristas are available to swap.</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
              <p className="text-xs text-gray-500">Requested by Priya · Yesterday 9:15 AM</p>
              <div className="flex gap-2">
                <SecondaryButton><X className="w-4 h-4 mr-1" /> Reject</SecondaryButton>
                <PrimaryButton><Check className="w-4 h-4 mr-1" /> Approve</PrimaryButton>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><User className="text-gray-500 w-5 h-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Arjun Patel <span className="font-normal text-gray-500">Part-time</span></p>
                  <p className="text-xs text-gray-500">Junior Barista · Front Counter</p>
                </div>
              </div>
              <StatusBadge tone="info">Education / Exam</StatusBadge>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-gray-900">Sunday, 20 Oct - Evening (15:00-23:30)</p>
              <p className="text-sm text-gray-600 mt-1 italic">"College semester mid-term exam on Monday morning."</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100 flex gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <div>
                <p className="text-sm font-semibold text-green-900">Not currently assigned to Sunday evening</p>
                <p className="text-xs text-green-700 mt-1">Zero roster adjustments required. Approval will block him from automatic schedule fills.</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
              <p className="text-xs text-gray-500">Requested by Arjun · Today 8:30 AM</p>
              <div className="flex gap-2">
                <SecondaryButton><X className="w-4 h-4 mr-1" /> Reject</SecondaryButton>
                <PrimaryButton><Check className="w-4 h-4 mr-1" /> Approve</PrimaryButton>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">Schedule may need updating <StatusBadge tone="warning">1 open shift</StatusBadge></p>
            <p className="text-sm text-green-700 mt-1">Priya Sharma is currently scheduled to work Friday Morning. Once approved, click <span className="font-semibold">Update Schedule</span> to automatically find an available replacement with matching barista skills without adding overtime.</p>
          </div>
        </div>
        <PrimaryButton>Update Schedule</PrimaryButton>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Upcoming Approved Time Off</h2>
        <p className="text-sm text-gray-500 mb-4">Scheduled absences booked in advance across the next 30 days</p>
        
        <Card className="overflow-hidden p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team Member</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates & Duration</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">Rahul Patil</td>
                <td className="py-3 px-4 text-sm text-gray-600">Mon, 21 Oct - Tue, 22 Oct</td>
                <td className="py-3 px-4 text-sm text-blue-600">Family</td>
                <td className="py-3 px-4"><StatusBadge tone="success">● Approved</StatusBadge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">Sneha Roy</td>
                <td className="py-3 px-4 text-sm text-gray-600">Saturday, 26 Oct</td>
                <td className="py-3 px-4 text-sm text-blue-600">Vacation</td>
                <td className="py-3 px-4"><StatusBadge tone="success">● Approved</StatusBadge></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
