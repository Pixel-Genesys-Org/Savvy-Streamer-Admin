import { Activity, Ban, CalendarDays, CircleDollarSign, Clapperboard, Film, Receipt, Search, Sparkles, Tv, UserCheck, Users } from "lucide-react";
import Loader from "../../components/Loader";
import { formatCurrency, getGreeting } from "../../utils/helper";
import DashboardCharts, { TopSearchesChart } from "./DashboardCharts";
import useDashboardController from "./useDashboardController";

const SummaryCard = ({ title, value, icon: Icon, accent }) => (
  <div className="glass-panel glow-border relative overflow-hidden rounded-3xl p-5 sm:p-6">
    <div className={`absolute -top-10 -right-8 h-32 w-32 rounded-full blur-3xl ${accent}`} />
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-sm tracking-wide text-muted">{title}</p>
        <p className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">{value ?? 0}</p>
      </div>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
        <Icon className="h-7 w-7 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { values } = useDashboardController();
  const totalUsers = values?.data?.users || 0;
  const activeUsers = values?.data?.active_users || 0;
  const activeShare = totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const totalEarned = values?.data?.total_earned || 0;
  const thisMonthEarned = values?.data?.this_month_earned || 0;
  const paidCount = values?.data?.paid_count || 0;
  const failedCount = values?.data?.failed_count || 0;
  const totalSearches = values?.data?.total_searches || 0;
  const uniqueTitles = values?.data?.unique_titles || 0;
  const movieTitles = values?.data?.movie_titles || 0;
  const tvTitles = values?.data?.tv_titles || 0;

  return (
    <div className="w-full">
      <div className="glass-panel relative mb-6 overflow-hidden rounded-3xl p-5 sm:p-8">
        <div className="ambient-orb top-[-60px] right-[-40px] h-40 w-40 bg-primary/30 animate-pulse-slow" />
        <div className="relative">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan">
            <Sparkles size={14} />
            StreamSmart Admin
          </div>
          <p className="font-heading text-2xl font-bold sm:text-4xl">
            {getGreeting()},{" "}
            <span className="gradient-text">{values.user_name || "Admin"}</span>
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Welcome to <strong className="text-white">Savvy Streamer</strong>. Here’s what’s
            happening across the platform today.
          </p>
        </div>
      </div>

      {values.isLoading ? (
        <Loader center />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              title="Total Users"
              value={totalUsers}
              icon={Users}
              accent="bg-primary/40"
            />
            <SummaryCard
              title="Active Users"
              value={activeUsers}
              icon={UserCheck}
              accent="bg-cyan/40"
            />
            <div className="glass-panel glow-border relative overflow-hidden rounded-3xl p-5 sm:p-6 sm:col-span-2 xl:col-span-1">
              <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-success/20 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm tracking-wide text-muted">Active Share</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                    {activeShare}%
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-success">
                    <Activity size={16} />
                    Live engagement
                  </p>
                </div>
                <div className="relative h-20 w-20">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <path
                      className="text-white/10"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-primary"
                      stroke="url(#activeGradient)"
                      strokeWidth="3.5"
                      strokeDasharray={`${activeShare}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <defs>
                      <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6BE0FE" />
                        <stop offset="100%" stopColor="#C563FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 font-heading text-lg font-semibold text-white">Search Monitoring</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Searches"
                value={totalSearches}
                icon={Search}
                accent="bg-cyan/40"
              />
              <SummaryCard
                title="Unique Titles"
                value={uniqueTitles}
                icon={Clapperboard}
                accent="bg-primary/40"
              />
              <SummaryCard
                title="Movies"
                value={movieTitles}
                icon={Film}
                accent="bg-success/40"
              />
              <SummaryCard
                title="TV Shows"
                value={tvTitles}
                icon={Tv}
                accent="bg-error/40"
              />
            </div>
            <div className="mt-4">
              <TopSearchesChart titles={values.data?.charts?.top_searches} />
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 font-heading text-lg font-semibold text-white">Subscription Earnings</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Earned"
                value={formatCurrency(totalEarned)}
                icon={CircleDollarSign}
                accent="bg-success/40"
              />
              <SummaryCard
                title="This Month"
                value={formatCurrency(thisMonthEarned)}
                icon={CalendarDays}
                accent="bg-cyan/40"
              />
              <SummaryCard
                title="Paid"
                value={paidCount}
                icon={Receipt}
                accent="bg-primary/40"
              />
              <SummaryCard
                title="Failed"
                value={failedCount}
                icon={Ban}
                accent="bg-error/40"
              />
            </div>
          </div>

          <DashboardCharts charts={values.data?.charts} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
