import { RotateCcw, Save, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Card, NoticeState, StatusBadge, PrimaryButton, SecondaryButton } from '../components/ui';

export default function Rules() {
  const [, setHasUnsaved] = useState(false);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">Rules</h1>
            <StatusBadge tone="success">Active Engine v2.4</StatusBadge>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tell OptiShift how you want your schedule to work for UrbanBrew Café.</p>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton onClick={() => setHasUnsaved(false)}>
            <RotateCcw className="w-4 h-4 mr-2" /> Reset to Defaults
          </SecondaryButton>
          <PrimaryButton onClick={() => setHasUnsaved(false)}>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </PrimaryButton>
        </div>
      </div>

      <NoticeState
        tone="success"
        title="These rules help us build schedules that fit your business and your team."
        body="We'll always follow your must-have requirements first (people available, mandatory skills, working limits), then try to create the most balanced, cost-effective schedule. You stay in control without having to calculate shift math."
      />
      
      <div className="mt-2 text-sm text-green-700 font-medium flex gap-6 mb-8">
        <span>● 100% Labour Law Compliant</span>
        <span>● Mumbai Retail Hours Optimized</span>
        <span>● Fair Allocation by Default</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section 1 */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">1</span>
                  Staffing Requirements
                </h2>
                <p className="text-sm text-gray-500 mt-1">How many people do you need working at the same time? We'll make sure every shift has enough hands.</p>
              </div>
              <StatusBadge tone="neutral">Must-Have</StatusBadge>
            </div>
            
            <div className="space-y-3">
              {[
                { title: "Morning Shift 07:00 - 15:30", sub: "Breakfast & corporate coffee peak", count: 3 },
                { title: "Evening Shift 15:00 - 23:30", sub: "After-work rush & kitchen closing prep", count: 4 },
                { title: "Weekend Brunch Peak Sat-Sun", sub: "Heavy dine-in & patio traffic", count: 4 }
              ].map(s => (
                <div key={s.title} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.title}</p>
                    <p className="text-xs text-gray-500">{s.sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600">-</button>
                    <span className="w-8 text-center font-medium text-gray-900">{s.count}</span>
                    <button className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600">+</button>
                    <span className="text-xs text-gray-500 w-12">people min</span>
                  </div>
                </div>
              ))}
              <button className="text-sm font-medium text-green-700 flex items-center gap-1 mt-2 hover:text-green-800">
                <Plus className="w-4 h-4" /> Add custom shift requirement
              </button>
            </div>
          </Card>

          {/* Section 2 */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">2</span>
                  Mandatory Skills & Roles
                </h2>
                <p className="text-sm text-gray-500 mt-1">Make sure specialized roles like Baristas and Supervisors are always on shift when the store is open.</p>
              </div>
              <StatusBadge tone="neutral">Must-Have</StatusBadge>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-sm font-medium text-gray-900 w-32">Morning Shift</p>
                <div className="flex gap-4 flex-1">
                  <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">• Min 1 Barista (L2+)</span>
                  <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">• Min 1 Cashier / POS</span>
                </div>
                <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-sm font-medium text-gray-900 w-32">Evening Shift</p>
                <div className="flex gap-4 flex-1">
                  <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">• Min 1 Shift Supervisor</span>
                  <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">• Min 1 Kitchen & Prep</span>
                </div>
                <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Shift</label>
                <select className="w-full text-sm border-gray-300 rounded-md py-1.5"><option>Evening Shift</option></select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Role or Skill</label>
                <select className="w-full text-sm border-gray-300 rounded-md py-1.5"><option>Senior Barista</option></select>
              </div>
              <div className="w-32">
                <label className="block text-xs font-medium text-gray-700 mb-1">Required</label>
                <select className="w-full text-sm border-gray-300 rounded-md py-1.5"><option>At least 1</option></select>
              </div>
              <PrimaryButton onClick={() => setHasUnsaved(true)}>Add Rule</PrimaryButton>
            </div>
          </Card>

          {/* Section 3 */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">3</span>
                  Working Hours & Rest Limits
                </h2>
                <p className="text-sm text-gray-500 mt-1">Set limits so people don't get scheduled for too much work and have enough time to sleep between shifts.</p>
              </div>
              <StatusBadge tone="info">Labour Safety</StatusBadge>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Weekly Hours Cap</p>
                <p className="text-xs text-gray-500 mb-3">Maximum normal hours</p>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={40} className="w-16 text-center text-lg font-bold border-gray-300 rounded-md p-1" />
                  <span className="text-sm text-gray-600">hrs / week</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Daily Hours Limit</p>
                <p className="text-xs text-gray-500 mb-3">Single shift maximum</p>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={8} className="w-16 text-center text-lg font-bold border-gray-300 rounded-md p-1" />
                  <span className="text-sm text-gray-600">hrs / day</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Rest Between Shifts</p>
                <p className="text-xs text-gray-500 mb-3">No "clopenings"</p>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={12} className="w-16 text-center text-lg font-bold border-gray-300 rounded-md p-1" />
                  <span className="text-sm text-gray-600">hours minimum</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 4 */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">4</span>
                  Extra Hours & Overtime
                </h2>
                <p className="text-sm text-gray-500 mt-1">Tell us what to do when someone would need to work beyond their normal hours to cover a shift.</p>
              </div>
              <StatusBadge tone="neutral">Budget Control</StatusBadge>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer">
                <input type="radio" name="overtime" defaultChecked className="mt-1 w-4 h-4 text-green-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">Avoid extra hours whenever possible</p>
                    <span className="text-[10px] uppercase font-bold text-green-700 bg-green-200 px-1.5 py-0.5 rounded">Recommended</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">OptiShift will first prioritize staff who haven't reached 40 hours. Extra hours will only be used if there is truly no other person available.</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                <input type="radio" name="overtime" className="mt-1 w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Allow extra hours when needed</p>
                  <p className="text-sm text-gray-600 mt-1">Allows team members to take on up to 4 extra hours per week if they want more hours or to cover absences easily.</p>
                </div>
              </label>
            </div>
          </Card>
          
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">5</span>
              Fair Work Distribution
            </h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Keep weekly hours balanced</p>
                  <p className="text-xs text-gray-500">Avoid giving one full-timer 42 hours while another gets only 28.</p>
                </div>
                <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Prefer balanced weekend distribution</p>
                  <p className="text-xs text-gray-500">Rotate Saturday and Sunday shifts across staff so everyone gets some weekend rest.</p>
                </div>
                <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">6</span>
              Team Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Try to follow preferred shifts</p>
                  <p className="text-xs text-gray-500">We'll match employee preferred mornings or evenings when staffing requirements permit.</p>
                </div>
                <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Avoid abrupt shift pattern changes</p>
                  <p className="text-xs text-gray-500">Keep people on consistent blocks (e.g. 3 mornings in a row instead of flipping daily).</p>
                </div>
                <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
            </div>
          </Card>
          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Priority Hierarchy Guide</h3>
            <h4 className="text-base font-semibold text-gray-900 mb-4">How OptiShift Applies Your Rules</h4>
            <div className="space-y-4 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded bg-gray-900 text-white flex items-center justify-center text-xs font-bold z-10">1</div>
                <p className="text-sm font-semibold text-gray-900">Must-Haves (Non-negotiable)</p>
                <p className="text-xs text-gray-600 mt-1">Store coverage targets, certified skill availability, approved leaves, and not double-booking.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded bg-gray-400 text-white flex items-center justify-center text-xs font-bold z-10">2</div>
                <p className="text-sm font-semibold text-gray-900">Well-being & Rest Limits</p>
                <p className="text-xs text-gray-600 mt-1">Max 40 hrs/week per person, max 8 hrs/day, and mandatory 12 hours rest between shifts.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold z-10">3</div>
                <p className="text-sm font-semibold text-gray-900">Staff Happiness & Optimization</p>
                <p className="text-xs text-gray-600 mt-1">Zero overtime where possible, balanced weekend rotations, and matching individual morning or evening preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
