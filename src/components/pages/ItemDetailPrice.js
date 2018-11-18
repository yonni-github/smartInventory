import React, { Component } from 'react';
import { View, Image, Text,TextInput } from 'react-native';

class ItemDetailPrice extends Component{
	
	constructor (props) {
		super(props)
		this.state = {
			itemPrice: '00.00'
        }
    }

	onChangedPrice(text){ 
		var newText = ''; 
		var numbers = '0123456789'; 
		
		if(text.length < 1){ 
			this.setState({ myNumber: '' }); 
		} 

		for (var i=0; i < text.length; i++) { 
			if(numbers.indexOf(text[i]) > -1 ) { 
				newText = newText + text[i]; 
			} 
				this.setState({ myNumber: newText }); 
		} 
	}

	render(){
		return(		
		    	<View style={styles.background}>      
		             <View style={{paddingLeft: 10}}>
		               <Text style={{fontSize: 17, color: '#2F3A49'}} > Price
		               </Text>
		              </View>
		       		<View style={{paddingRight: 10}}> 
						<TextInput 
						   style={styles.textInput}
						   keyboardType='numeric'
						   onChangeText={(text)=> this.onChangedPrice(text)}
						   value={"$" + this.state.itemPrice}
						   maxLength={10}  //setting limit of input
						/>
		          </View>
		        </View>	    
		);
	}

};

const styles ={
	background: {
		height:60,
		flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
	},
	textInput:{
		color: '#2F3A49',
		fontSize: 17
	}
}

export default ItemDetailPrice;