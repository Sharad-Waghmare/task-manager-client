import axios from 'axios';

const api = "http://localhost:8010/project/allproject";

export const allProjectData = () =>{
    return (dispatch) =>{
        dispatch({ type: "Get_Project_Pending"});
        axios
        .get(`${api}`)
        .then((res)=>{
            console.log(res.data);
            dispatch({ type: "Get_Project_Success", payload: res.data});
        })
        .catch((err) =>{
            dispatch({ type: "Get_Project_Failed", payload: err.message});
        })

    }
};

export const addProjectData = (data) =>{
    return(dispatch) =>{
        dispatch({ type: "Add_Project_Pending"});
        return axios
        .post(`${api}`, data)
        .then((res)=>{
            dispatch({ type: "Add_Project_Success", payload: res.data})
            return Promise.resolve()
        })
        .catch((err)=>{
            dispatch({ type: "Add_Project_Failed", payload: err.message})
            return Promise.reject()
        })
    }
}

export const singleProjectData = (id) =>{
    return (dispatch) => {
        dispatch({ type: "Get_SingleProject_Pending" });
      return  axios
            .get(`${api}/${id}`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: "Get_SingleProject_Success", payload: res.data })
                return Promise.resolve()

            })
            .catch((err) => {
                dispatch({ type: "Get_SingleProject_Failed", payload: err.message })
                return Promise.reject()
            })
    };
};

export const editProjectData = (id, data) =>{
    return(dispatch) => {
        console.log(id)
        dispatch({ type: "Edit_Project_Pending" });
        return axios
          .put(`${api}/${id}`, data)

          .then((res) => {
            console.log(res.data);
            dispatch({ type: "Edit_Project_Success", payload: res.data });
            return Promise.resolve()
            
          })
          .catch((err) => {
            dispatch({ type: "Edit_Project_Failed", payload: err.message });
            return Promise.reject()
            
          });
      };
};

export const deleteProjectData = (id)=>{
    return(dispatch) =>{
        dispatch({ type: "Delete_Project_Pending"});
        return axios
        .delete(`${api}/${id}`)
        .then((res)=>{
          console.log(res);
          dispatch({ type: "Delete_Project_Success", payload: res.data });
        })
        .catch((err)=>{
          console.log(err);
          dispatch({ type: "Delete_Project_Failed", payload: err.message });
        })
      }
}
