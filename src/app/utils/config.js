export const sizeConfig = {
  headerHeight: 50,
  footerHeight: 50,
  leftSideWidth: 250,
  rightSideWidth: 250,
  plateWidth: 150,
  plateHeight: 100,
  plateMargin: 30,
}

export const sizes = {
  sidesWidth: sizeConfig.leftSideWidth + sizeConfig.rightSideWidth,
  headerFooterHeight: sizeConfig.headerHeight + sizeConfig.footerHeight,
  minContainerWidth: sizeConfig.plateMargin * 2 + sizeConfig.plateWidth,
  minContainerHeight: sizeConfig.plateMargin * 2 + sizeConfig.plateHeight,
}
