const initialState = {
    projects: [],
    project: {},
    success: false,
    error: null,
    isLoading: false,
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Get_Project_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Get_Project_Success":
            return {
                ...state,
                isLoading: false,
                projects: action.payload,
            };

        case "Get_Project_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // Add Project
        case "Add_Project_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Add_Project_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Add_Project_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // single Project
        case "Get_SingleProject_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Get_SingleProject_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
                project: action.payload,
            };

        case "Get_SingleProject_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // Edit Project
        case "Edit_Project_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Edit_Project_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Edit_Project_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        
        //Delete Project

        case "Delete_Project_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Delete_Project_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Delete_Project_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default: 
          return state;
    }
};

export default projectReducer;