import React, { Component } from 'react';
import '../css/reset.css';
import '../css/layout.css';
 
class CreateImage extends Component {
  constructor(props) {
    super(props);
    this.showPanel = this.showPanel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    	images:[],
    	panel:true,
    	title:"",
    	url:"",
    	description:"",
      type: "url",
    };
  }
  componentWillMount(){
  	//
  }
  showPanel(){
  	this.setState({
  		panel:!this.state.panel,
  	});
  }
  handleChange(key,value){
  	this.setState({
  		[key]:value,
  	});
  };
  handleSubmit(){
  	//送出表單
  }
  addImage(){
  	const ImageArr = this.state.images.slice();//先複製一份資料
  	const addImage = [{
  		"title":this.state.title,
  		"url":this.state.url,
  		"description":this.state.description
  	}];
  	
  	ImageArr.concat(addImage);//加入新的圖片

  	this.setState({
  		images: ImageArr,//更新頁面資訊
  	});

  	this.handleSubmit();
  }
  render() {
    return (
      <div className="album-container">
      	<div className="wrapper">
           <StepBox />
			     <ImageBox images={this.state.images}/>
           <GuideText />
		    </div>
    		<div className="bottom-controller">
    			<span className={this.state.panel?"up-panel-button":"panel-button"} onClick={this.showPanel}></span>
    			<div className={this.state.panel?"panel":"hidden"}>
    				<div className="panel-body">
    					<form>
    						<div className="form-group">
    							<label>上方文字&nbsp;:</label>
    							<textarea type="text" value={this.state.title} name="" 
    								onChange={(e)=>this.handleChange("title",e.target.value)}>
                  </textarea>
    						</div>
    						<div className="form-group">
    							<label>選取圖片&nbsp;:</label>
                  <input type="radio" name="type" value="file" 
                        checked={this.state.type==="file"}
                        onChange={(e)=>this.handleChange("type",e.target.value)} />上傳檔案
                  <input type="radio" name="type" value="url" 
                        defaultChecked={this.state.type==="url"}
                        onChange={(e)=>this.handleChange("type",e.target.value)}/>圖片網址
                  <div className="form-group">
                    <div className={this.state.type==="file"?"":"hidden"}>
                      <label>上傳檔案&nbsp;:</label>
                      <input type="file" value={this.state.url} name="" 
                        onChange={(e)=>this.handleChange("url",e.target.value)}/>
                    </div>
                    <div className={this.state.type==="file"?"hidden":""}>
                      <label>圖片網址&nbsp;:</label>
                      <input type="text" value={this.state.url} name="" 
                      onChange={(e)=>this.handleChange("url",e.target.value)}/>
                    </div>
                  </div>
                </div>
               
    						<div className="form-group">
    							<label>下方文字&nbsp;:</label>
    							<textarea value={this.state.description} name="" 
    									onChange={(e)=>this.handleChange("description",e.target.value)}>
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
			</div>
		);
	}
}

class GuideText extends Component {
  render(){
    return (
      <div className="guide-box">
        <p>請輸入必要欄位</p>
      </div>
    );
  }
}

export default CreateImage;
