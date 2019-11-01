import React from "react";
import PropTypes from "prop-types";

const Hexagon = ({ image, idx, fabric, debug, quiltSectionWidth }) => {
  // if even number wide, true.
  // if not even number wide, make even every other row.
  const isEven = quiltSectionWidth % 2 === 0 || Math.floor(idx / quiltSectionWidth) % 2 === 0;
  return (
    <div
      css={[
        {
          overflow: "hidden",
          position: "relative",
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          width: `calc(125vw / ${quiltSectionWidth})`,
          height: `calc((8 * (125vw / ${quiltSectionWidth})) / 9)`,
          marginTop: `calc((-8 * 125vw / ${quiltSectionWidth}) / 9 / 2)`,
          backgroundRepeat: "repeat",
          backgroundImage: `url(./images/${fabric}/${fabric}${image}.jpg)`,
          backgroundPosition: "center",
        },
        isEven
          ? {
              "&:nth-of-type(odd)": {
                marginTop: 0,
              },
            }
          : {
              "&:nth-of-type(even)": {
                marginTop: 0,
              },
            },
      ]}
    >
      {debug === true && (
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            css={{
              width: "100%",
              zIndex: 10,
              color: "blue",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
          >{`${image}`}</div>
        </div>
      )}
    </div>
  );
};

Hexagon.propTypes = {
  image: PropTypes.number,
  idx: PropTypes.number,
  fabric: PropTypes.string,
  debug: PropTypes.bool,
  quiltSectionWidth: PropTypes.number,
};

const Hexagons = ({ quiltSectionHeight, quiltSectionWidth, debug, fabric, imageList }) => {
  let heightMeasurement = `8 / 9 * (125vw / ${quiltSectionWidth})`;

  return (
    <div
      className="Quilt"
      css={{
        overflow: "hidden",
        width: "94vw",
        display: "grid",
        gridTemplateColumns: `repeat(${quiltSectionWidth}, calc(94vw / ${quiltSectionWidth} ))`,
        gridTemplateRows: `repeat(${quiltSectionHeight - 1}, calc(${heightMeasurement}))`,
        margin: "40px auto -15px auto",
        paddingRight: `calc(94vw / ${quiltSectionWidth} / 3)`,
        maxHeight: `calc(${heightMeasurement} * ${quiltSectionHeight - 1})`,
      }}
    >
      {imageList.map((image, idx) => {
        return (
          <Hexagon
            key={`hexi-key-${image}-${idx}`}
            quiltSectionWidth={quiltSectionWidth}
            quiltSectionHeight={quiltSectionHeight}
            idx={idx}
            image={image}
            debug={debug}
            fabric={fabric}
          />
        );
      })}
    </div>
  );
};

Hexagons.propTypes = {
  imageList: PropTypes.array,
  quiltSectionWidth: PropTypes.number,
  quiltSectionHeight: PropTypes.number,
  fabric: PropTypes.string,
  debug: PropTypes.bool,
};

export default Hexagons;
