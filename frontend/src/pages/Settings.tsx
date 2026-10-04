import { useState } from 'react';
import { PageHeader, Card, PrimaryButton, SecondaryButton } from '../components/ui';
import { Save, Bell, Clock, User, Shield, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [format12, setFormat12] = useState(true);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-6">
        <PageHeader title="Settings" subtitle="Store details and your personal preferences." />
        <div className="flex gap-2">
          <SecondaryButton>Cancel</SecondaryButton>
          <PrimaryButton><Save className="w-4 h-4 mr-2" /> Save Settings</PrimaryButton>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            <a href="#store" className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-900">Store Profile</a>
            <a href="#notifications" className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">Notifications</a>
            <a href="#account" className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">My Account</a>
            <a href="#danger" className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 mt-4">Danger Zone</a>
          </nav>
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 space-y-8">
          
          <div id="store">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><User className="w-5 h-5" /> Store Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input type="text" defaultValue="UrbanBrew Café" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch / Location</label>
                    <input type="text" defaultValue="Mumbai Outlet" className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                      <option>Asia/Kolkata (IST)</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Time Format</p>
                        <p className="text-xs text-gray-500">How hours are displayed across schedules.</p>
                      </div>
                    </div>
                    <div className="flex p-1 bg-gray-100 rounded-lg">
                      <button onClick={() => setFormat12(true)} className={`px-4 py-1 text-sm font-medium rounded-md ${format12 ? 'bg-white shadow' : 'text-gray-500'}`}>12h (AM/PM)</button>
                      <button onClick={() => setFormat12(false)} className={`px-4 py-1 text-sm font-medium rounded-md ${!format12 ? 'bg-white shadow' : 'text-gray-500'}`}>24h</button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div id="notifications">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time Off Requests</p>
                    <p className="text-xs text-gray-500">When someone requests vacation or sick leave.</p>
                  </div>
                  <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Schedule Infeasible</p>
                    <p className="text-xs text-gray-500">If the engine cannot find a mathematically valid roster.</p>
                  </div>
                  <div className="w-10 h-5 bg-green-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                </div>
              </div>
            </Card>
          </div>

          <div id="account">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> My Account</h2>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=166534&color=fff" alt="Avatar" className="w-16 h-16 rounded-full" />
                <div>
                  <p className="text-base font-semibold text-gray-900">Alex Morgan</p>
                  <p className="text-sm text-gray-500">Owner · alex.morgan@urbanbrew.in</p>
                </div>
              </div>
            </Card>
          </div>

          <div id="danger">
            <Card className="border-red-100 bg-red-50/30">
              <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Danger Zone</h2>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Factory Reset</p>
                  <p className="text-xs text-gray-600">Delete all team members, shifts, and schedules. This cannot be undone.</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 whitespace-nowrap">Reset Workspace</button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
