import Chart from "chart.js/auto";
import {
  BookCheck,
  DollarSign,
  KeyRound,
  LogIn,
  User,
  UserCheck,
  Users
} from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import { formatCurrency, getGreeting } from "../../utils/helper";
import useDashboardController from "./useDashboardController";
import Loader from "../../components/Loader";

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
}) => (
  <div
    className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 min-h-[90px] sm:min-h-[100px] w-full transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg flex flex-col justify-between cursor-pointer"
  >
    <div className="flex items-center justify-between h-full">
      <div>
        <p className="text-lg sm:text-xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600 text-sm sm:text-base mt-1">{title}</p>
      </div>
      <div className={`p-2 rounded-lg ${iconColor}`}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </div>
    </div>
  </div>
);

const EnrollmentFollowUpCard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Expired follow ups",
              data: [35, 50, 55, 30, 30, 25, 45],
              backgroundColor: "#FF947A",
              borderRadius: 4,
              borderWidth: 0,
            },
            {
              label: "Expired Enrollments",
              data: [60, 80, 95, 60, 60, 45, 80],
              backgroundColor: "#D47D41",
              borderRadius: 4,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  family: "Ubuntu, sans-serif",
                },
                color: "#6b7280",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 50,
                font: {
                  size: 10,
                  family: "Ubuntu, sans-serif",
                },
                color: "#9ca3af",
              },
              grid: {
                display: true,
                color: "#f3f4f6",
                lineWidth: 1,
              },
              border: {
                display: false,
              },
            },
            x: {
              ticks: {
                font: {
                  size: 10,
                  family: "Ubuntu, sans-serif",
                },
                color: "#6b7280",
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            bar: {
              borderWidth: 0,
              borderRadius: 4,
            },
          },
          categoryPercentage: 0.3,
          barPercentage: 0.8,
          layout: {
            padding: {
              top: 5,
              bottom: 5,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Enrollment and Follow-up Activity
      </h3>
      <div className="h-48 sm:h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

const ApprovalPercentageCard = () => {
  const pieChartRef = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    if (pieChartRef.current) {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const ctx = pieChartRef.current.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 100);
      gradient.addColorStop(0, "#D47D41");
      gradient.addColorStop(1, "#FF947A");

      pieChartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Progress", "Remaining"],
          datasets: [
            {
              data: [71, 29],
              backgroundColor: [gradient, "#f3f4f6"],
              borderWidth: 0,
              cutout: "90%",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      });
    }

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 h-[240px] sm:h-[270px] transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Approvals Percentage
        </h3>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 cursor-pointer">
          <span>Today</span>
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between h-32 sm:h-40">
        <div className="flex items-center justify-center w-full sm:w-1/2 mb-3 sm:mb-0">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <canvas ref={pieChartRef}></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base sm:text-xl font-bold text-gray-900">
                71%
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center sm:pl-3 lg:pl-6">
          <div className="mb-2 sm:mb-3 lg:mb-4">
            <h4 className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
              System status
            </h4>
            <div className="flex items-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FA5A7D] rounded-full mr-2"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                OPTIMUM
              </span>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-400 leading-tight">
            <p className="break-words">Hello World One Two Three</p>
            <p className="break-words">Four Five Six</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriorityEnrollmentCard = () => {
  const lineChartRef = useRef(null);
  const lineChartInstance = useRef(null);

  useEffect(() => {
    if (lineChartRef.current) {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const ctx = lineChartRef.current.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

      lineChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["M", "T", "W", "T", "F"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 15, 10, 8],
              borderColor: "#3b82f6",
              backgroundColor: gradient,
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#8b5cf6",
              pointBorderColor: "#8b5cf6",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          scales: {
            y: {
              display: false,
              beginAtZero: true,
            },
            x: {
              display: true,
              ticks: {
                color: "#6b7280",
                font: {
                  size: 8,
                  family: "Ubuntu, sans-serif",
                },
                maxRotation: 0,
                minRotation: 0,
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
          elements: {
            point: {
              hoverRadius: 5,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      });
    }

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 h-[240px] sm:h-[270px] transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Priority Enrollment
      </h3>
      <div className="h-32 sm:h-40 flex-1">
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
};

export const CredentialsCard = () => (
  <div
    className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 h-[240px] sm:h-[270px] w-full min-w-0 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
    style={{ fontFamily: "Ubuntu, sans-serif" }}
  >
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
      Credentials
    </h3>
    <div
      className="space-y-3 sm:space-y-4 w-full min-w-0"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      <div>
        <div className="flex justify-between items-center mb-1 min-w-0">
          <span className="text-sm sm:text-base font-medium text-gray-700 break-words truncate">
            458 of 901
          </span>
          <span className="text-sm sm:text-base font-normal text-gray-700 text-right break-words truncate">
            Expire Soon
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full min-w-0">
          <div
            className="h-2 rounded-full bg-yellow-400"
            style={{ width: `${(458 / 901) * 100}%` }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1 min-w-0">
          <span className="text-sm sm:text-base font-medium text-gray-700 break-words truncate">
            548 of 720
          </span>
          <span className="text-sm sm:text-base font-normal text-gray-700 text-right break-words truncate">
            Expire Credentials
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full min-w-0">
          <div
            className="h-2 rounded-full bg-red-300"
            style={{ width: `${(548 / 720) * 100}%` }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1 min-w-0">
          <span className="text-sm sm:text-base font-medium text-gray-700 break-words truncate">
            154 of 480
          </span>
          <span className="text-sm sm:text-base font-normal text-gray-700 text-right break-words truncate">
            Missing Credentials
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full min-w-0">
          <div
            className="h-2 rounded-full bg-orange-400"
            style={{ width: `${(154 / 480) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export const BirthdayCard = () => (
  <div
    className="relative bg-gradient-to-br from-[#ffe0c3] via-[#ffb6b9] to-[#fbc2eb] rounded-2xl shadow-xl p-3 sm:p-6 flex flex-col min-h-[220px] sm:min-h-[320px] w-full border-l-8 border-[#ffb6b9] transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer items-start"
    style={{ fontFamily: "Ubuntu, sans-serif" }}
  >
    <span className="text-3xl sm:text-4xl mb-2">🎂</span>
    <h3 className="w-full text-base sm:text-lg font-bold text-gray-700 mb-2 break-words text-left truncate">
      Birthday
    </h3>
    <div className="text-gray-500 font-semibold mb-2 text-sm sm:text-lg text-left w-full">
      Today
    </div>
    <div className="rounded-xl bg-white/70 backdrop-blur-md border border-gray-100 shadow px-3 sm:px-4 py-2 sm:py-3 mb-4 text-gray-700 text-sm sm:text-base flex items-center font-medium justify-start w-full">
      No Events
    </div>
    <div className="text-gray-400 font-semibold mb-2 text-sm sm:text-lg text-left w-full">
      Upcoming Birthdays
    </div>
    <div className="rounded-xl bg-white/70 backdrop-blur-md border border-gray-100 shadow px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-base flex items-center font-medium justify-start w-full">
      No Events
    </div>
  </div>
);

export const AnniversaryCard = () => (
  <div
    className="relative bg-gradient-to-br from-[#c2e9fb] via-[#a1c4fd] to-[#d4fc79] rounded-2xl shadow-xl p-3 sm:p-6 flex flex-col min-h-[220px] sm:min-h-[320px] w-full border-l-8 border-[#a1c4fd] transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer items-start"
    style={{ fontFamily: "Ubuntu, sans-serif" }}
  >
    <span className="text-3xl sm:text-4xl mb-2">🎉</span>
    <h3 className="w-full text-base sm:text-lg font-bold text-gray-700 mb-2 break-words text-left truncate">
      Anniversary
    </h3>
    <div className="text-gray-500 font-semibold mb-2 text-sm sm:text-lg text-left w-full">
      Today
    </div>
    <div className="rounded-xl bg-white/70 backdrop-blur-md border border-gray-100 shadow px-3 sm:px-4 py-2 sm:py-3 mb-4 text-gray-700 text-sm sm:text-base flex items-center font-medium justify-start w-full">
      No Events
    </div>
    <div className="text-gray-400 font-semibold mb-2 text-sm sm:text-lg text-left w-full">
      Upcoming Anniversary
    </div>
    <div className="rounded-xl bg-white/70 backdrop-blur-md border border-gray-100 shadow px-3 sm:px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-base flex items-center font-medium justify-start w-full">
      No Events
    </div>
  </div>
);

export const RecentEventsCard = () => (
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-1">
      <EnrollmentFollowUpCard />
    </div>
    <div className="w-full md:max-w-xs flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">Today 22nd Jan, 2021</h2>
      <div className="flex flex-col gap-4">
        {[
          {
            type: "Login",
            platform: "abc@gmail.com",
            activity: "login",
          },
          {
            type: "Logout",
            platform: "abc@gmail.com",
            activity: "logout",
          },
          {
            type: "Login",
            platform: "abc@gmail.com",
            activity: "login",
          },
          {
            type: "Login",
            platform: "abc@gmail.com",
            activity: "login",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.activity === "up" ? "bg-green-50" : "bg-orange-50"
                }`}
            >
              {item.activity === "login" ? (
                <KeyRound className="w-4 h-4 text-green-600" />
              ) : (
                <LogIn className="w-4 h-4 text-orange-600" />
              )}
            </div>
            <div className="flex-1 w-0">
              <div className="text-sm font-semibold text-gray-900">
                {item.type}
              </div>
              <div className="text-xs text-gray-500 break-words whitespace-normal w-full">
                {item.platform}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {

  const { values } = useDashboardController()

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-3xl font-bold">
          {getGreeting()}, {values.user_name} 👋
        </p>
        <p className="text-gray-600 mt-1">
          Welcome to <strong>Savvy Streamer</strong>. Here’s what’s new today.
        </p>
      </div>
      {
        values.isLoading ? <Loader center /> :
          <Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <SummaryCard
                title="Total Users"
                value={values?.data?.users}
                icon={Users}
                iconColor="bg-[#FA5A7D]"
              />
              <SummaryCard
                title="Active Users"
                value={values?.data?.active_users}
                icon={UserCheck}
                iconColor="bg-[#33DAD1]"
              />
            </div>
          </Fragment>
      }
      {/* <div className="w-full md:max-w-xs flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">{"Today"}</h2>
        <div className="flex flex-col gap-4">
          {values?.data?.new_managers?.length === 0 ? (
            <p className="text-gray-500 text-sm">No new managers found.</p>
          ) : (
            values?.data?.new_managers?.map((manager, index) => (
              <div
                key={manager._id || index}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {manager.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {manager.email}
                  </div>
                  <div className="text-xs text-gray-400 truncate italic">
                    {manager.company_name}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <BirthdayCard />
        <AnniversaryCard />
      </div>

      <div className="xl:col-span-3 flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6">
        <RecentEventsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        <div>
          <ApprovalPercentageCard />
        </div>
        <div>
          <PriorityEnrollmentCard />
        </div>
        <div>
          <CredentialsCard />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
