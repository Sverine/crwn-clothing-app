import React from "react";

import MenuItem from "../menu-item/Menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import "./Directory.styles.scss";
import { useSelector } from "react-redux";

const Directory = () =>{

  const sections = useSelector(selectDirectorySections);

  return(
      <div className="directory-menu">
          {
              sections.map(({id, ...otherSectionProps})=>(
                  <MenuItem key={id} {...otherSectionProps}/>
              ))
          }
      </div>
  )
}

export default Directory;