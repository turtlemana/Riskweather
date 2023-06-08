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
  import {useMemo} from 'react'
  
 
  
  export default function MiniChart({chartData}) {
    const chartDat=useMemo(()=>{
      if(chartData){
      const chartColor=JSON.parse(JSON.stringify(chartData))
      if(chartData[0].cvar > chartData[chartData.length-1].cvar){
        chartColor[0].color="#36D399"
    } else if(chartData[0].cvar <= chartData[chartData.length-1].cvar){
      chartColor[0].color="#DC2828"
    }

    return chartColor
    }},[chartData])

    
    
    return (
      <div style={{ width: 30, height: 30 }}>
        <ResponsiveContainer >
          <LineChart
            width={30}
            height={30}
            data={chartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5
            }}
          >
            <YAxis yAxisId="left" hide={true}tickCount="5" type="number" domain={['auto','auto']}/>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis  dataKey="x"  />
            <YAxis   yAxisId="left" width={2} />
            <YAxis yAxisId="right" width={2} orientation="right" className={`text-sm`} /> */}
            {/* <Tooltip /> */}
            {/* <Legend/> */}
            <Line
            dot={false}
              yAxisId="left"
              type="natural"
              dataKey="cvar"
              stroke={chartDat ? chartDat[0].color : ""}
            //   activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  