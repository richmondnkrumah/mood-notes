import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 393;
const guidelineBaseHeight = 790;

// Horizontal scale function
const scaleHorizontal = (size: number) => Math.round((width / guidelineBaseWidth) * size);

// Vertical scale function
const scaleVertical = (size: number) => Math.round((height / guidelineBaseHeight) * size);

export { scaleHorizontal, scaleVertical };
