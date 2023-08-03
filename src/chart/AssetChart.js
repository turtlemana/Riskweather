
import {
    PieChart,
    Pie,
    Legend,
    Cell,
    ResponsiveContainer,
    Label,
    Tooltip
  } from "recharts";


  import { useRouter } from "next/router";
  
  const data01 = [
    { name: "Active Campagins", value: 90 },
    { name: "Inactive Campagins", value: 25 },
    { name: "ICPs with no campagins", value: 10 }
  ];
  
  // const COLORS = ["#89aaff", "#6691ff", "#4277ff", "#1e5dff","#0046f9","#003cd6","#0032b2","#00288e","#001e6b","#001447"];
  const COLORS= ['#3366E6','#FF6633','#FF33FF','#FFFF99','#00B3E6','#E6B333','#FFB399','#999966 ','#99FF99','#B34D4D']  
  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className="CircleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size
        }}
      ></div>
    );
  };
  
  const CustomizedLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="LegendList ">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className={`flex`}>
            <div className="BulletLabel flex">
              <Bullet backgroundColor={entry.payload.fill} size="5px" />
              <div className="BulletLabelText text-[5px]">{entry.value}</div>
            </div>
            <div  className={`ml-1 text-[5px]`}>{entry.payload.value}</div>
          </li>
        ))}
      </ul>
    );
  };
  
  const CustomLabel = ({ viewBox, labelText, value }) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="15"
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };
  
  export default function AssetChart({data}) {
    
    const router=useRouter();
    let initialValue=0
    // const total= useMemo=(()=>{
    //   const totalAmount=data.reduce((acc,asset)=>acc+(asset.price * asset.quantity),initialValue)
    //   return totalAmount

    // },[data])
    const total=data.reduce((acc,asset)=>acc+(asset.price * asset.quantity),initialValue)

    return (
      <div style={{ width: "100%", height: 420 }}>
        <ResponsiveContainer>
          <PieChart isAnimationActive={false} >
            <Pie
            isAnimationActive={false}
              data={data}
              dataKey="total"
              cx="50%"
              cy="50%"
              innerRadius={60}
              
              
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{outline: 'none'}}
                />
              ))}
              <Label
                content={<CustomLabel labelText={`${router.locale=="ko" ?"자산 수" : "Assets"}`} value={data.length} />}
                position="center"
              />
            </Pie>
            <Tooltip contentStyle={{
              borderRadius:'4px',
              padding:'8px'
            }} formatter={(value) => ((value/total) * 100).toLocaleString('en-us',{minimumFractionDigits: 0, maximumFractionDigits: 2}) + "%"}/>
            {/* <Legend content={<CustomizedLegend />} /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  