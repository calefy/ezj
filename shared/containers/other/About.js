import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

class Account extends Component {

    render() {

        return (

            <div className="other-about">
                <h4 className="h4-title">关于我们</h4>
                <p>紫荆教育</p>
                <p>紫荆教育是清华控股旗下专注于金融教育和专业培训的教育品牌，由清华大学五道口金融学院发起并将在线教育中心公司化而成。“紫荆”二字源于清华校内建筑中历史
悠久的“紫荆学堂”，亦取意清华校花紫荆花“敢为天下先”和“ 精诚团结”的象征。</p>
                <p>紫荆教育以“专注金融教育  引领金融实践”为使命，推出了超过150门专业主题课程和各层级岗位培训课程，形成了国内独一无二的金融专业实战教育体系：</p>
                <p>一是专业业务体系，主要包括面向银行的风险管理、资产证券化、公司理财、私人银行、互联网金融，面向证券业的财富管理、资产管理、投资银行，面向保险业的资产
配置、高净值客户等核心培训和认证体系。</p>
                <p>二是金融领导力体系，为各个金融机构中高层提供监管层对话、金融业前瞻以及金融领导力提升等量身定制课程。</p>
                <p>三是学位项目体系，与美国专业领域知名的大学合作的MBA学位、金融学硕士学位等项目，为金融行业从业人员深造提升、开拓国际化视野提供机会。</p>
                <p>依托于学校和学院专业的教学管理经验以及先进的教育理念，采用线上线下结合、国内国外结合的形式，发展个性化学习，极大提升个人和组织的学习效率。</p>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Account);