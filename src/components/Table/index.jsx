import { memo } from "react";
import TableHeader from "../../components/TableHeader";
import { serial_no_option } from "../../utils/data";
import { dateFormatter, formatCurrency, getNestedValue } from "../../utils/helper";
import Loader from "../Loader";
import TablePagination from "../TablePagination";

const Table = ({ serial_no = true, columns = [], data = [], header = null, loading = false, pagination = null }) => {
  let headers = [];

  if (serial_no) {
    headers.push(serial_no_option);
  }

  headers.push(...columns);

  const page = pagination?.page || 1;
  const page_size = pagination?.page_size || 10;

  return (
    <>
      {header && (
        <TableHeader title={header?.title} onSearch={header?.onSearch} onCreate={header?.onCreate} />
      )}
      <div className="glass-panel w-full overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[640px] table-auto border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-deep/80 to-surface">
            <tr>
              {headers.map((item, index) => (
                <th
                  key={index}
                  className="p-3 text-left text-xs font-semibold tracking-wide text-white uppercase sm:p-4 sm:text-sm"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="cursor-pointer transition-all duration-200 hover:bg-primary/10"
                >
                  {serial_no ? (
                    <th className="border-b border-white/10 p-3 text-left align-middle text-sm font-medium text-white/70 sm:p-4">
                      {(page - 1) * page_size + index + 1}
                    </th>
                  ) : null}
                  {columns.map((col, ind) => (
                    <td
                      key={ind}
                      className={`border-b border-white/10 p-3 text-left align-middle text-sm text-white/80 sm:p-4 ${col?.capitalize ? "capitalize" : ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : col?.type === "date" || col?.type === "dateonly"
                          ? dateFormatter(row[col.key], { time: col?.type === "date" })
                          : col?.type === "price"
                            ? formatCurrency(row[col.key])
                            : getNestedValue(row, col.key)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="p-8 text-center text-sm text-muted">
                  {loading ? <Loader type="cicular" center size={30} /> : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination?.total > 0 && <TablePagination {...pagination} />}
    </>
  );
};

export default memo(Table);
