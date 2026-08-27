import { memo } from "react";
import TableHeader from "../../components/TableHeader";
import { serial_no_option } from "../../utils/data";
import { dateFormatter, formatCurrency, getNestedValue } from "../../utils/helper";
import Loader from "../Loader";

const Table = ({ serial_no = true, columns = [], data = [], header = null, loading = false }) => {

  let headers = []

  if (serial_no) {
    headers.push(serial_no_option)
  }

  headers.push(...columns)

  return (
    <>
      {
        header &&
        <TableHeader
          title={header?.title}
          onSearch={header?.onSearch}
          onCreate={header?.onCreate}
        />
      }
      <div className="w-full overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full min-w-[600px] table-auto border-separate border-spacing-0">
          <thead className="bg-secondary sticky top-0 z-10">
            <tr>
              {headers.map((item, index) => (
                <th
                  key={index}
                  className="p-3 text-sm text-left text-white font-medium"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? (
                data.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className="transition-all hover:bg-gray-100 cursor-pointer"
                  >
                    {
                      serial_no ? <th
                        className="p-4 text-sm text-left text-gray-700 border-b border-gray-200 align-middle"
                      >
                        {index + 1}
                      </th> : null
                    }
                    {
                      columns.map((col, ind) => (
                        <td
                          key={ind}
                          className={`p-4 text-sm text-left text-gray-700 border-b border-gray-200 align-middle ${col?.capitalize ? "capitalize" : ""}`}
                        >
                          {
                            col.render
                              ? col.render(row)
                              : col?.type === "date" || col?.type === "dateonly"
                                ? dateFormatter(row[col.key], { time: col?.type === "date" })
                                : col?.type === "price"
                                  ? formatCurrency(row[col.key])
                                  : getNestedValue(row, col.key)
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="p-6 text-center text-gray-500 text-sm"
                  >
                    {
                      loading ? <Loader type="cicular" center size={30} /> :
                        "No data available"
                    }
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(Table);
