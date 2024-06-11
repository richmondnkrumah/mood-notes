import { ReactNode } from "react";
import DefaultEmoji from '@/assets/svg/smile.svg'

const getIconEmoji = (name: string,width:number,height:number): ReactNode => {
  switch (name) {
    case "Happy":
      return <DefaultEmoji width={width} height={height}  />
    case "Ecstatic":
      return <DefaultEmoji width={width} height={height} />
    case "Displeased":
      return <DefaultEmoji width={width} height={height} />
    case "Angry":
        return <DefaultEmoji width={width} height={height} />
    case "Neutral":
        return <DefaultEmoji width={width} height={height} />
    case "Sad":
        return <DefaultEmoji width={width} height={height} />
    default:
      return <DefaultEmoji width={width} height={height} />
  }
}

export default getIconEmoji