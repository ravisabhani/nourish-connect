import React from 'react'

export const Title = (props) => {
      return (
            <>
                  <div className='title'>
                        <img src={props.logo} alt="Logo" class="logo" />
                        <span>{props.title}</span>
                        <img src={props.line} alt="Line" class='line' />
                  </div>

            </>
      )
}
