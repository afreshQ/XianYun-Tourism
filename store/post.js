export const state=()=>{
    return {
        draftList:[
            // {form:{},createdTime:'9102-11-20'}
        ]
    }
}

export const mutations={
    setDraftList(state,data){

        // if(state.searchHistory.length===5) state.searchHistory.pop();
            
        state.draftList.unshift(data);
        
    },
}