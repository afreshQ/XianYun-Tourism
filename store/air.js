export const state=()=>{
    return {
        searchHistory:[],

        allPrice:0
    }
}


export const mutations={
    setSearchHistory(state,data){

        if(state.searchHistory.length===5) state.searchHistory.pop();
            
        state.searchHistory.unshift(data);
        
    },

    setAllPrice(state,price){
        state.allPrice=price;
    }
}