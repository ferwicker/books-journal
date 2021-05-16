import React, {useEffect} from "react";
import ShelfDetail from "../../components/ShelfDetail"

function Shelf() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    return (
        <div className='page-top'>
            <ShelfDetail />
        </div>
    );
}

export default Shelf;