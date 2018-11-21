import React, { Component } from 'react';
import { View, Image, Text,ScrollView, TextInput } from 'react-native';
import { Dimensions } from 'react-native'
import Moment from 'react-moment';
import {format, compareAsc} from 'date-fns'
import DatePicker from 'react-native-datepicker'
import ItemDetailPrice from './ItemDetailPrice'
import ItemDetailDate from './ItemDetailDate'
import ItemDetailCategories from './ItemDetailCategories'
import ItemDetailInventory from './ItemDetailInventory'

class ItemDetail extends React.Component{

	render(){
		return(		
		    <ScrollView style={styles.scrollViewStyle}>

		        <ItemDetailPrice>
		        </ItemDetailPrice>

		        <ItemDetailCategories>
		        </ItemDetailCategories>
			    
			    <View style={styles.horizontalLine}>
			    </View>

		        <ItemDetailDate>
		        </ItemDetailDate>

		        <ItemDetailInventory>
		        </ItemDetailInventory>

			    <View style={styles.editContainer}>	       
			       <View style={styles.horizontalLine}>
			       </View>	       
			       <View style={{justifyContent: 'center', flex: 1}}> 
			               <Text style={{textAlign: 'center', color: '#F7931E',fontSize: 15}}>
			                   EDIT ATTRIBUTES
			               </Text> 
			       </View>	    
			    </View>		
     
		    </ScrollView>
		);
	}
};

const styles ={	
	editContainer:{
		height: 60
	},
	horizontalLine:{
		borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
	},
	scrollViewStyle:{
		flex: 1
	}
}

export default ItemDetail;