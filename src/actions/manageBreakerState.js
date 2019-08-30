import axios from "axios";
export const MANAGE_BREAKER_STATE = "MANAGE_BREAKER_STATE";
export const DISABLE_BUTTONS = "DISABLE_BUTTONS";
export const manageBreakerState = (state) => ({ type: MANAGE_BREAKER_STATE, state});
export const disableButtons = (state) => ({ type: DISABLE_BUTTONS, state })

export const changeState = (desiredState, returning=false) => {
    let variableToChange = null;
    if(desiredState === 'close') 
    {
        //close
        variableToChange = '5d6555a792b680020be46e16';
    }
    else {
        //open
        variableToChange = '5d6555b092b680020be46e1a';
    }
    return dispatch => {
      axios({
        url: `http://192.168.10.201:5000/api/values/5d65553992b680020be46e15/${variableToChange}`,
        headers: {
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGVybWlzc2lvbnMiOjE1LCJsYW5nIjoicGwiLCJpYXQiOjE1NjY5MTY4Mzd9.-R_KORNiwD74EdM6cnWZgJiJ6a977vNIuNYVYLXCO3U',
        },
        method: "PUT",
        data: {
            "value": returning === true ? 0 : 1
        }
      })
        .then(res => {
          //success
          console.log(res)
        })
        .catch(error => {
          // error
          console.log(error)
        });
    };
  };

  export const checkState = () => {
      return dispatch => {
        axios({
            url: `http://192.168.10.201:5000/api/values/5d65553992b680020be46e15/5d6555c692b680020be46e1e`,
            headers: {
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwicGVybWlzc2lvbnMiOjE1LCJsYW5nIjoicGwiLCJpYXQiOjE1NjY5MTY4Mzd9.-R_KORNiwD74EdM6cnWZgJiJ6a977vNIuNYVYLXCO3U',
            },
            method: "GET"
          })
            .then(res => {
              //success
              dispatch(manageBreakerState(Object.values(res.data)[0]));
            })
            .catch(error => {
              // error
              console.log(error)
            });
      }
  }
  