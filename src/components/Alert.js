import React from 'react'
import PropTypes from 'prop-types'

function Alert(props) {
    const capital=(word)=>{
        if(word==="danger"){
            word="error";
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height:'50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      {capital(props.alert.type==='success'?'success':'danger')} : {props.alert.msg}
  {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
</div>}
</div>
  )
}

export default Alert
