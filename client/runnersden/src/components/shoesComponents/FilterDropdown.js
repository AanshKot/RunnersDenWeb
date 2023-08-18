import React from 'react'





const toggleBrand = (brand,unfilteredBrands,setUnfilteredBrands) => {
    const newUnfilteredBrands = {
        ...unfilteredBrands,
        [brand]: !unfilteredBrands[brand],
    };

    setUnfilteredBrands(newUnfilteredBrands);
}

function DropDownRow({brandname,filterStatus,handleClick}){
   
    const isSelected = filterStatus ? "unfiltered" : "filtered"
    
    return(
      <button 
      className={`filter-button ${isSelected}`}
      key={brandname}
      onClick={handleClick}>
        {brandname}
      </button>  
    );
}



function filterDropdown({unfilteredBrands,setUnfilteredBrands}) {
    const dropDownRows = []
    
    for (const brand in unfilteredBrands) {
        dropDownRows.push(
            <DropDownRow
                brandname={brand}
                filterStatus={unfilteredBrands[brand]}
                handleClick={() => toggleBrand(brand, unfilteredBrands, setUnfilteredBrands)}
                key={brand}
            />
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px',background:"#FFF",width:"60%",borderRadius:"10px" }}>
            {dropDownRows}
        </div>
    );
}

export default filterDropdown