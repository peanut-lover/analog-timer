import { useEffect, useState } from "react";
import styled from "styled-components";

const Tooltip: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mousePos, setMousePos] = useState<{ left?: number; top?: number }>({
    left: undefined,
    top: undefined,
  });

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      setMousePos({ left: e.pageX, top: e.pageY });
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);

  if (mousePos.left === undefined || mousePos.top === undefined) return null;

  return (
    <TooltipContainer id="TimerTooltip" left={mousePos.left} top={mousePos.top}>
      <p>{children}</p>
    </TooltipContainer>
  );
};

export default Tooltip;

const TooltipContainer = styled.div.attrs<{ left: number; top: number }>(
  (props) => ({
    style: {
      transform: `translate(${props.left}px,${props.top}px)`,
    },
  })
)<{ left: number; top: number }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 1;
  & > p {
    margin-top: -1rem;
  }
`;
