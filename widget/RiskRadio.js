
import React, {Component} from "react";
import {Text,View,TouchableOpacity,Image,Dimensions} from "react-native";

type Props = {
    data: Object,
    callBack:Object,
    navigator:Object,
    number:Number,
};

const RadioImage = require('../../img/pop/radio.png');
const CheckRadioImage = require('../../img/pop/check_radio.png');

export default class RiskRadio extends Component {
    props: Props;
    commons: Commons = new Commons().bind(this);
    constructor(props) {
        super(props);
        this.state = {
            paper:null,
            loading: false,
            checkedOption:[],
        };
        this.props.data.riskEvaluationOptionModel.map((rowData,i)=>(
            this.setState({
                checkedOption:this.state.checkedOption.push(0),
            })
        ))
    };

    check = (option,id,stemId,i)=> {
        let checkedTemp = this.state.checkedOption;
        if(checkedTemp[i]==0){
            for(let j=0;j<checkedTemp.length;j++){
                checkedTemp[j]=0;
            }
            checkedTemp[i]=1;
        }
        this.setState({
            checkedOption:checkedTemp,
        });
        this.props.callBack(0,stemId,id);
    };

    render() {
        /*const {height, width} = Dimensions.get('window');
         let dd = width*0.2
         let props = this.props;
         let imageUrl = imageUri(this.props.data.imagesPathWx);*/
        return (
            <View>
                <Text style={styles.q_title}>{this.props.number}.{this.props.data.title}</Text>
                <View style={styles.cut}></View>
                {this.props.data.riskEvaluationOptionModel.map((rowData,i) => (
                    <View>
                        <View style={styles.question}>
                            <TouchableOpacity onPress={()=>{this.check(rowData.option,rowData.id,rowData.stemId,i)}}>
                                {(()=> {
                                    if(this.state.checkedOption[i]==1)return <Image style={styles.check} source={CheckRadioImage}/>
                                    else return <Image style={styles.check} source={RadioImage}/>
                                })()}
                            </TouchableOpacity>
                            <View style={styles.item}>
                                <Text style={styles.i_text}>{rowData.content}</Text>
                            </View>
                        </View>
                        {(()=> {
                            if(this.state.checkedOption.length-1>i)return <View style={styles.cut}></View>
                        })()}
                    </View>))}
            </View>
        )
    };
};

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#f0f0f0',
        flex: 1,
    },
    header: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6
    },
    h_text: {
        fontSize: 15,
        lineHeight: 30,
        color: '#333',
    },
    content: {
        backgroundColor: "#fff",
    },
    question: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    check: {
        width: 20,
        marginLeft: 15,
        marginRight: 15
    },
    item: {
        flex: 1,
    },
    i_text: {
        fontSize: 15,
        color: '#333',
    },
    q_title: {
        fontSize: 15,
        color: '#333',
        lineHeight: 50,
        paddingLeft: 15,
        paddingRight: 15,
    },
    button: {},
    btnWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7011',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
    },
    btnWrapDisabled: {
        backgroundColor: '#cdcdcd',
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
    },
    cut: {
        height: 1,
        backgroundColor: '#dedede',
        marginLeft: 15,
        marginRight: 15,
    },
    k9: {
        height: 9
    },
});
