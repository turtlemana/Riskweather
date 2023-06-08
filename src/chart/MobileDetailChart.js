import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  
  import { useRouter } from "next/router";

  
  export default function DetailChart({chartData,chartSelect}) {
    const router=useRouter()

    return (
      <div className={`flex flex-1`} >
        <ResponsiveContainer width="100%" height={288}>
          <LineChart
            width={1800}
            height={288}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 8,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey={router.locale=="ko" ? "날짜" : "Date"} ticks={[]} tick={{fontSize: 10}} scale="auto" interval="preserveStartEnd" minTickGap={50}  type="category" tickMargin="10"  />
            <YAxis   yAxisId="left" width={0} type="number" domain={['auto', 'auto']} />
            <YAxis yAxisId="right" width={36}   type="number" domain={['auto', 'auto']} orientation="right" tick={{fontSize: 10}}  />
            <Tooltip allowEscapeViewBox={{x:false, y:false}} formatter={(value,name) => [value.toFixed(2),name.split("(")[0]]} contentStyle={{fontSize:"0.75rem", fontWeight:"bold", }} />
            {/* <Legend/> */}
            {chartSelect == "CVaR" ?
            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `CVaR` : `CVaR`}
              stroke="#DC2626"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={1.5}
            /> :
            <>
          <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `RW Index` : `RW Index`}
              stroke="#DC2626"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={1.5}
            />
            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `EW Index` : `EW Index`}
              stroke="#FFD400"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={1.5}
            />

            </>
            }
            <Line yAxisId="right" connectNulls={true} type="linear" strokeWidth={1.5} dataKey={router.locale=="ko" ? "가격" : "Price"} stroke="#34D399" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  