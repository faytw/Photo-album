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
        dataUrl:""
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

            // const imgOutput = (
            //     <div>
            //         <a href="#" download="dl.png"
            //             onClick={(e)=>location.href=this.refs.canvas.toDataURL()}>下載
            //         </a>
            //     </div>
            //     );

            
            const dataURL = canvas.toDataURL();
            this.refs.download.href = dataURL;

            // console.log("imgOutput:"+imgOutput);
      
            this.setState({
                step:2,
                finished:true,
                previewImage:true,
            });
  }
  render() {
    return (
        <div className="album-container">
          	<div className="wrapper">
               <StepBox />
    		    <div className={this.state.previewImage?"image-box":"no-image"}>
                    <canvas ref="canvas" width={240} height={320} />
                    <a href="#" ref="download" download="test.png" onClick={(e)=>require(this.state.dataUrl)}>DOWNLOAD</a>
                </div>
               <GuideText step={this.state.step} 
                        preview={this.state.previewButton}
                        finished={this.state.finished} 
                        download={this.state.dataUrl}
                        onClick={(e)=>this.previewImage()}/>
    		</div>
        	<div className="bottom-controller">
        		<span className="up-panel-button"></span>
        		<div className="panel">
        			<div className="panel-body">
        				<form>
        					<div className="form-group">
        						<label><span className="mark">*</span>選取圖片&nbsp;:</label>
                                <input type="radio" name="type" value="file" 
                                        onChange={(e)=>this.handleChange("type",e.target.value)} />
                                        <span className={this.state.type==="file"?"checked":""}>上傳檔案</span>
                                <input className="ml-style" type="radio" name="type" value="url"
                                        defaultChecked="true"
                                        onChange={(e)=>this.handleChange("type",e.target.value)}/>
                                        <span className={this.state.type==="url"?"checked":""}>圖片網址</span>
                                <div className="form-group">
                                    <label>
                                        <span className="mark">*</span>
                                        {this.state.type==="file"?"上傳檔案":"圖片網址"}&nbsp;:
                                    </label>
                                    <input type={this.state.type==="file"?"file":"text"} 
                                        value={this.state.imageUrl} name=""
                                        onChange={(e)=>this.handleChange("imageUrl",e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label><span className="mark">*</span>上方文字&nbsp;:</label>
                                <textarea type="text" value={this.state.topText} name=""
                                        onChange={(e)=>this.handleChange("topText",e.target.value)}>
                                </textarea>
                            </div>               
        					<div className="form-group">
        						<label><span className="mark">*</span>下方文字&nbsp;:</label>
        						<textarea value={this.state.bottomText} name=""
        								onChange={(e)=>this.handleChange("bottomText",e.target.value)}>
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

class GuideText extends Component {
  render(){
    const guideBox = ["請輸入必要欄位","點擊預覽","完成！"];
    return (
        <div className="guide-box">
            <p>{guideBox[this.props.step]}
                <span className="icon-box" onClick={this.props.preview?this.props.onClick:null}>
                    <i className={this.props.preview?this.props.finished?"hidden":"fa fa-eye":"fa fa-question-circle-o"}></i>
                </span>
               
               
                <span className={this.props.finished?"icon-box":"hidden"}>
                    或&nbsp;&nbsp;分享至<i className="fa fa-facebook-square"></i>
                </span>
            </p>
        </div>
    );
  }
}

export default CreateImage;
