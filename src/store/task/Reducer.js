const initialState = {
    tasks: [],
    task: {},
    success: true,
    error: null,
    isLoading: false,
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Get_Task_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Get_Task_Success":
            return {
                ...state,
                isLoading: false,
                tasks: action.payload,
            };

        case "Get_Task_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // Add Project
        case "Add_Task_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Add_Task_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Add_Task_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // single Project
        case "Get_SingleTask_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Get_SingleTask_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
                task: action.payload,
            };

        case "Get_SingleTask_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        // Edit Project
        case "Edit_Task_Pending":
            return {
                ...state,
                isLoading: true,
            };

        case "Edit_Task_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Edit_Task_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        //Delete Project

        case "Delete_Task_Pending":
            return {
                ...state,
                isLoading: true,
            };
            
        case "Delete_Task_Success":
            return {
                ...state,
                isLoading: false,
                success: true,
            };

        case "Delete_Task_Failed":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default taskReducer