import React, { Component } from 'react';
import '../css/reset.css';
import '../css/font-awesome.min.css';
import '../css/layout.css';
 
class CreateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title:"",
        reason:"",
        imgUrl:"",
        type: "url",
        step:0,
    };
  }
  handleChange(key,value){
  	this.setState({
  		[key]:value,
  	});

    if(this.state.title!=="" && this.state.imageUrl!=="" && this.state.reason!==""){
        this.setState({step:1});
    }else{
        this.setState({step:0});
    }
 
  }
 
  addImage(){
  	//
  }
  render() {
    const defaultTitle = "你有看過這隻貓嗎";
    const defaultReason = "這是我們的貓，她真的非常傲嬌 如果你沒看過，現在讓你看一下";
    const defaultImgUrl = "https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/16798013_10212225654460678_45758179352349449_o.jpg?oh=23ea65f20735456b9c29cebdd702dbfd&oe=59442861";
    return (
        <div className="album-container">
          	<div className="wrapper">
               <StepBox />
    		   <ImageBox title={this.state.title===""?defaultTitle:this.state.title}
                        reason={this.state.reason===""?defaultReason:this.state.reason}
                        imgUrl={this.state.imgUrl===""?defaultImgUrl:this.state.imgUrl}/>
               <GuideText step={this.state.step}/>
    		</div>
        	<div className="bottom-controller">
        		<span className="up-panel-button"></span>
        		<div className="panel">
        			<div className="panel-body">
        				<form>
        					<div className="form-group">
        						<label><span className="mark">*</span>上方文字&nbsp;:</label>
        						<textarea type="text" value={this.state.title} name="" 
        								onChange={(e)=>this.handleChange("title",e.target.value)}>
                                </textarea>
        					</div>
        					<div className="form-group">
        						<label><span className="mark">*</span>選取圖片&nbsp;:</label>
                                <input type="radio" name="type" value="file" 
                                        checked={this.state.type==="file"}
                                        onChange={(e)=>this.handleChange("type",e.target.value)} />上傳檔案
                                <input type="radio" name="type" value="url" 
                                        defaultChecked={this.state.type==="url"}
                                        onChange={(e)=>this.handleChange("type",e.target.value)}/>圖片網址
                                <div className="form-group">
                                    <div className={this.state.type==="file"?"":"hidden"}>
                                        <label><span className="mark">*</span>上傳檔案&nbsp;:</label>
                                        <input type="file" value={this.state.url} name="" 
                                            onChange={(e)=>this.handleChange("imageUrl",e.target.value)}/>
                                    </div>
                                    <div className={this.state.type==="file"?"hidden":""}>
                                        <label><span className="mark">*</span>圖片網址&nbsp;:</label>
                                        <input type="text" value={this.state.url} name="" 
                                          onChange={(e)=>this.handleChange("imageUrl",e.target.value)}/>
                                    </div>
                                </div>
                            </div>               
        					<div className="form-group">
        						<label><span className="mark">*</span>下方文字&nbsp;:</label>
        						<textarea value={this.state.description} name="" 
        								onChange={(e)=>this.handleChange("reason",e.target.value)}>
        						</textarea>
        					</div>
        			    </form>
        			</div>
        			<div className="panel-footer"></div>
        		</div>
        	</div>
        </div>
    );
  }
}

class StepBox extends Component {
  render(){
    return (
        <div className="step-box">
            <span>新增圖片</span>
            <span>>></span>
            <span>預覽新圖片</span>
            <span>>></span>
            <span>輸出圖片</span>
        </div>
    );
  }
}

class ImageBox extends Component {
	render(){
		return (
		    <div className="image-box">
                <p className="image-title">{this.props.title}</p>
                <div className="my-image">
                    <img src={this.props.imgUrl} alt=""/>
                </div>
                <p className="image-reason">{this.props.reason}</p>			
			</div>
		);
	}
}

class GuideText extends Component {
  render(){
    const guideBox = ["請輸入必要欄位","可以準備輸出圖片囉"];
    return (
        <div className="guide-box">
            <p>{guideBox[this.props.step]}
                <span className="icon-box"><i className="fa fa-question-circle-o"></i></span>
            </p>
        </div>
    );
  }
}

export default CreateImage;
