import React, { Component } from 'react';
import '../css/reset.css';
import '../css/font-awesome.min.css';
import '../css/layout.css';

class CreateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topText:"",
        bottomText:"",
        imageUrl:"",
        type: "url",
        step:0,
        previewButton:false,
        previewImage:false,
        finished:false,
    };
  }
  handleChange(key,value){
  	this.setState({
  		[key]:value,
  	});

    if(this.state.topText!=="" && this.state.imageUrl!=="" && this.state.bottomText!==""){
        this.setState({
            step:1,
            previewButton:true,
        });
    }else{
        this.setState({
            step:0,
            previewButton:false,
        });
    }
  }
  previewImage(){
  	 const canvas = this.refs.canvas;
     const img = new Image();
     const topText = this.state.topText;
     const bottomText = this.state.bottomText;
     const context = canvas.getContext('2d');
               
     img.onload = function () {
        context.drawImage(img, 40, 31, 160, 240);
        context.fillText(topText, 70, 18); 
        context.fillText(bottomText, 20, 290); 
     }
          
     img.src = this.state.imageUrl;
           
     this.setState({
        step:2,
        finished:true,
        previewImage:true,
     });
  }
  refreshInfo(){
    this.setState({
        step:0,
        topText:"",
        bottomText:"",
        imageUrl:"",
    });
  }
  render() {
    return (
        <div className="album-container">
          	<div className="wrapper">
                <StepBox step={this.state.step}/>
    		    <div className={this.state.previewImage?"image-box":"no-image"}>
                    <canvas ref="canvas" width={240} height={320} />
                </div>
                <GuideText step={this.state.step} 
                        preview={this.state.previewButton}
                        finished={this.state.finished} 
                        download={this.state.dataUrl}
                        refresh={(e)=>this.refreshInfo()}
                        onClick={(e)=>this.previewImage()}/>
    		</div>
        	<div className="bottom-controller">
        		<span className="up-panel-button"></span>
        		<div className="panel">
        			<div className="panel-body">
        				<form>
        					<div className="form-group">
        						<label className="mr-style"><span className="mark">*</span>選取圖片&nbsp;:</label>
                                <input type="radio" name="type" value="file" 
                                        onChange={(e)=>this.handleChange("type",e.target.value)} />
                                    <span className={this.state.type==="file"?"checked":""}>上傳檔案</span>
                                <input className="ml-style" type="radio" name="type" value="url"
                                        defaultChecked="true"
                                        disabled={this.state.step!==0}
                                        onChange={(e)=>this.handleChange("type",e.target.value)}/>
                                    <span className={this.state.type==="url"?"checked":""}>圖片網址</span>
                                <div className="form-group">
                                    <label>
                                        <span className="mark">*</span>
                                        {this.state.type==="file"?"上傳檔案":"圖片網址"}&nbsp;:
                                    </label>
                                    <input type={this.state.type==="file"?"file":"text"} 
                                        value={this.state.imageUrl} name=""
                                        disabled={this.state.step!==0}
                                        onChange={(e)=>this.handleChange("imageUrl",e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label><span className="mark">*</span>上方文字&nbsp;:</label>
                                <textarea type="text" value={this.state.topText} name=""
                                        disabled={this.state.step!==0}
                                        onChange={(e)=>this.handleChange("topText",e.target.value)}>
                                </textarea>
                            </div>               
        					<div className="form-group">
        						<label><span className="mark">*</span>下方文字&nbsp;:</label>
        						<textarea value={this.state.bottomText} name=""
                                        disabled={this.state.step!==0}
        								onChange={(e)=>this.handleChange("bottomText",e.target.value)}>
        						</textarea>
        					</div>
        			    </form>
        			</div>
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
            <span className={this.props.step===0?"this-step":null}>step1:新增圖片</span>
            <span>>></span>
            <span className={this.props.step===1?"this-step":null}>step2:預覽新圖片</span>
            <span>>></span>
            <span className={this.props.step===2?"this-step":null}>step3:另存圖片</span>
        </div>
    );
  }
}

class GuideText extends Component {
  render(){
    const guideBox = ["請輸入必要欄位","點擊預覽","完成"];
    return (
        <div className="guide-box">
            <p>{guideBox[this.props.step]}
                <span className="icon-box" onClick={this.props.preview?this.props.onClick:null}>
                    <i className={this.props.preview?this.props.finished?"hidden":"fa fa-eye":"fa fa-question-circle-o"}></i>
                </span>
                <span className={this.props.step===2?"again":"hidden"}
                    onClick={this.props.refresh}>
                    <i className="fa fa-refresh"></i>&nbsp;重新玩
                </span>
            </p>
        </div>
    );
  }
}

export default CreateImage;
