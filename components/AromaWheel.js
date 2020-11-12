import { useEffect, useRef, useState } from "react";
import Pie from './Pie';

const AromaWheel = (props) => {
  const { aromas, aromaGroups } = props;

  const parentsData = aromas.map(v => {
    return {
      ...v,
      value: v.children.length
    };
  });

  const chirdrenData = aromas.flatMap(v => v.children);
  const groupData = aromaGroups.map(v => {
    return {
      ...v,
      value: parentsData.filter(d => v.children.includes(d.name))
              .flatMap(d => d.children)
              .length
    };
  })

  const diameter = 800;

  return (
    <>
      <div className="wheel">
        <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <Pie
            data={parentsData}
            radius={400}
            hole={375}
            labels={true}
            strokeWidth={1}
            stroke={'#fff'}
          />
          <Pie
            data={chirdrenData}
            diameter={diameter}
            radius={375}
            hole={240}
            labels={true}
          />
          <Pie
            data={parentsData}
            diameter={diameter}
            radius={240}
            hole={130}
            labels={true}
            strokeWidth={1}
            stroke={'#fff'}
          />
          <Pie
            data={groupData}
            diameter={diameter}
            radius={130}
            hole={80}
            labels={true}
            strokeWidth={1}
            stroke={'#fff'}
          />
          <Pie
            data={[{ value: chirdrenData.length, name: 'Center', color: '#fff' }]}
            diameter={diameter}
            radius={80}
            hole={0}
            labels={true}
            strokeWidth={1}
            stroke={'#fff'}
          />
        </svg>
      </div>
      <style jsx>{`
        svg {
          display: inline-block;
          vertical-align: middle;
          transform-origin: 50% 50%;
          transform: rotate(-90deg);
          animation: scale .6s;
          margin: 10px;
        }
        svg text {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bolder;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default AromaWheel;
