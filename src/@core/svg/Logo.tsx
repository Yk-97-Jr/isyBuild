import type { SVGAttributes } from 'react';

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style type="text/css">
        {`.st0 { fill: #7367F0; }`}
      </style>
      <g>
        <circle className="st0" cx="11" cy="10.2" r="0.9" />
        <circle className="st0" cx="11" cy="7.5" r="0.9" />
        <circle className="st0" cx="8.5" cy="7.5" r="0.9" />
        <circle className="st0" cx="8.5" cy="4.7" r="0.9" />
        <ellipse className="st0" cx="5.9" cy="1.8" rx="0.9" ry="0.9" />
        <ellipse className="st0" cx="5.9" cy="4.7" rx="0.9" ry="0.9" />
        <circle className="st0" cx="3.3" cy="4.7" r="0.9" />
        <circle className="st0" cx="3.3" cy="7.5" r="0.9" />
        <circle className="st0" cx="1" cy="7.5" r="0.9" />
        <circle className="st0" cx="1" cy="10.2" r="0.9" />
      </g>
    </svg>
  );
};

export default Logo;
