import React, {Component} from 'react';
import {Text,View,TouchableOpacity,Dimensions,StyleSheet,Alert,Image} from "react-native";
import Commons, {ProgressView, Link, context, HocNavScreen} from "commons";
import {Navigation} from "react-native-navigation";
import {RiskQuestionnNaireModel,RiskEvaluationResultModel} from "app-js-sdk";
import RiskCheckBox from '../../widget/RiskCheckBox';
import RiskRadio from '../../widget/RiskRadio';

const answers = [];
type answer={
    stemId:Number,
    option:[]
}
class RiskEvaluationScreen extends Component {

    commons: Commons = new Commons().bind(this);

    constructor(props) {
        super(props);
        this.state = {
            paper: null,
            loading: false,
        };
        this.commons.apis.riskEvaluationApi.selectQuestionNaire().then((p: RiskQuestionnNaireModel[])=> {
            this.setState({
                paper: p
            });
            for (let i = 0; i < p.length; i++) {
                answers[i] = {stemId: p[i].id, option: []};
            }
        }).default();
    }

    static navigatorStyle = {
        navBarHidden: true,
        tabBarHidden: true,
    };

    tag = false;

    onChange = () => {
        if(this.tag){
            return;
        }else{
            this.tag=true;
        }

        for(let i=0;i<answers.length;i++){
            if(answers[i].option.length==0){
                Alert.alert("Number "+(i+1)+"question is not checked !");
                return false;
                this.tag=false;
            }
        }
        let str = JSON.stringify(answers).toString();
        this.commons.apis.riskEvaluationApi.saveRiskEvaluation(str).then((p:String)=>{
            this.commons.apis.riskEvaluationApi.riskEvaluationResult().then((m:RiskEvaluationResultModel)=>{
                this.props.navigator.push({
                    screen: "RiskEvaluation.RiskEvaluationFinishScreen",
                    passProps: {userRiskLevel:m,isTest:1},
                });
            }).default();
        }).default(()=>{
            this.tag = false;
        })
    };
    callBack = (type, stemId, id) => {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].stemId == stemId) {
                if (type == 1) {//check box
                    if (answers[i].option.includes(id)) {
                        answers[i].option.splice(answers[i].option.indexOf(id), 1);
                    } else {
                        answers[i].option.push(id);
                    }
                } else {//radio
                    answers[i].option[0] = id;
                }
            }
        }
    }

    render() {

        const {height, width} = Dimensions.get('window');
        let mg = (width - 214) / 2;
        if (this.state.paper == null) {
            return <ProgressView isVisible={this.state.loading}/>;
        }
        let paper = this.state.paper;
        return (
            <ScrollView style={styles.wrap}>
                <View style={styles.header}>
                    <Text style={styles.h_text}>Dear user：Please do this test</Text>
                </View>
                {paper.map((rowData, i) => (
                    <View>
                        <View style={styles.content}>
                            {(()=> {
                                if (rowData.type == 1) {
                                    return <RiskRadio data={rowData} key={i} number={i+1}
                                                      callBack={this.callBack}></RiskRadio>
                                } else return <RiskCheckBox data={rowData} key={i} number={i+1}
                                                            callBack={this.callBack}></RiskCheckBox>
                            })()}
                        </View>
                        <View style={styles.k9}></View>
                    </View>

                ))}
                <View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.btnWrap} onPress={this.onChange}>
                        <Text style={styles.btnText}>complete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
export default HocNavScreen(RiskEvaluationScreen);
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
