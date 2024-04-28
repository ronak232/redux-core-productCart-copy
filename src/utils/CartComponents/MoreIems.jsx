import { Button } from "../../StyledComponents/Button.style";
import React from "react";

function MoreIems({ showMoreItems, disableButton }) {
  return (
    <div className="product__loader">
      <Button
        bgColor="light-grey"
        padding="10px"
        borderRadius="6px"
        onClick={showMoreItems}
        disabled={!disableButton}
      >
        More Items
      </Button>
    </div>
  );
}

export default MoreIems;
