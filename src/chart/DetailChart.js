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
 
  
  export default function DetailChart({chartSelect,chartData}) {
    const router=useRouter()
    return (
      <div className={`flex flex-1`}>
        <ResponsiveContainer width="100%" height={288}>
          <LineChart
            width={1800}
            height={288}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey={router.locale=="ko" ? "날짜" : "Date"} ticks={[]} scale="auto" interval="preserveStartEnd" minTickGap={50}  type="category" tickMargin="10"  />
            <YAxis   yAxisId="left" width={56} type="number" domain={['auto', 'auto']} />
            <YAxis yAxisId="right" width={62}   type="number" domain={['auto', 'auto']} orientation="right"  />
            <Tooltip formatter={(value) => value.toFixed(2)} />
            {/* <Legend/> */}
            {chartSelect == "CVaR" ?
            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `리스크(CVaR)` : `Risk(CVaR)`}
              stroke="#DC2626"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={2}
            /> :
            <>

            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `리스크(RW Index)` : `Risk(RW Index)`}
              stroke="#DC2626"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={2}
            />
            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey={router.locale=="ko" ? `리스크(EW Index)` : `Risk(EW Index)`}
              stroke="#FFD400"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={2}
            />
            </>
            }
            <Line yAxisId="right" connectNulls={true} type="linear" strokeWidth={2} dataKey={router.locale=="ko" ? "가격" : "Price"} stroke="#34D399" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  