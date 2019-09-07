	/*
	 * 
	 * 
	 * 
	 * CTC Gallery Viewer
	 *  images in overlay carousel and gallery written in vanilla js
	 * https://ujwolbastakoti.wordpress.com/
	 * MIT license
	 * 
	 * 
	 * 
	 */


	"use strict";
	class ctcOverlayViewer {

			constructor(sel,param2) {
				Array.from(document.querySelectorAll(sel)).forEach((el,i) => this.prepareGal(el,i,param2));	
				window.addEventListener('resize', () => this.adjustApp());
				window.addEventListener('keydown', (event) => this.onKeyStroke(event));
			}
		
			prepareGal(gal,param2){
				let imgs = Array.from(gal.querySelectorAll('img'));	
				imgs.forEach((img,imgNum)=> {
					img.addEventListener('click', event=> this.createOverlay(event.target,imgNum,imgs,param2));
				});
			}
		
			createOverlay(img,imgNum, gal,param2) {
				let overlayWidth = window.innerWidth;
				let overlayHeight = window.innerHeight;
				let alltImgWidth = 1 < gal.length ? 0.95 : 1;

			  let scrollCss =  document.createElement('style');
					scrollCss.id = 'ctc-scroll-css';
					scrollCss.innerHTML = `::-webkit-scrollbar-track {background: rgba(255, 255, 255, 1);} ::-moz-scrollbar-track { background: rgba(255, 255, 255, 1);} #gal-sidebar::-webkit-scrollbar {display: none;} #gal-sidebar::-moz-scrollbar {display: none;}`;
					document.querySelector('head').appendChild(scrollCss);
			    	document.body.style.overflow = 'hidden';
			
			  let overlayDivEl = document.createElement("div");
				  overlayDivEl.id = "gallery-overlay";
				  overlayDivEl.style = `position:fixed;height:${overlayHeight}px;width:${overlayWidth}px;background-color:rgba(0,0,0,.6);z-index:100000;top:0%;left:0%;right:0%;bottom:0%;`;
				  document.body.insertBefore(overlayDivEl, document.body.firstChild);
			
			  let jsCropCloseBtn = document.createElement('span');
				  jsCropCloseBtn.id = "overlay-close-btn";
				  jsCropCloseBtn.title = "Close";
				  jsCropCloseBtn.innerHTML = "&#10539;";
				  jsCropCloseBtn.style = `cursor:pointer;position:absolute;left:3px;font-size:${0.016*overlayWidth}px;color:rgba(255,255,255,1);text-shadow:-1px -1px 1px rgba(0,0,0,1);z-index:200000;`;
				  overlayDivEl.appendChild(jsCropCloseBtn);
				  jsCropCloseBtn.addEventListener('click', () => this.closeOverlay());

			 let imgLoading =  document.createElement('span');
				  imgLoading.id = 'image-loading-main';
				  imgLoading.style = `left:${(alltImgWidth-0.075)*overlayWidth/2};top:${overlayHeight/2};font-size:${0.016*overlayWidth}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`;
				  imgLoading.innerHTML = 'Loading';
				  overlayDivEl.appendChild(imgLoading);
				  let loadingInt = setInterval( ()=>{
					switch(imgLoading.innerHTML){
						case 'Loading':
								imgLoading.innerHTML = 'Loading.'
						  break;
						case 'Loading.':
								imgLoading.innerHTML = 'Loading..'
						  break;
						case 'Loading..':
								imgLoading.innerHTML = 'Loading...'
						break;
						case 'Loading...':
								imgLoading.innerHTML = 'Loading....'
						break;
						case 'Loading....':
								imgLoading.innerHTML = 'Loading.'
						break;		
						default:
					}
				},350); 

			 let imgEl = document.createElement('img');
			 let loadedImg = new Image();
				clearInterval(loadingInt);
				imgLoading.style.display = 'none';
				 loadedImg.src = img.src;
				 imgEl.style.display = 'none';
				 loadedImg.addEventListener('load', (event)=>{	
					let opImgDim = this.getOptimizedImageSize(overlayWidth, overlayHeight, loadedImg.width, loadedImg.height);
					imgEl.id = 'loaded-img';	 
					imgEl.style = `height:${opImgDim.height}px;width:${opImgDim.width}px;display:inline-block;margin:${((overlayHeight - opImgDim.height) / 2)}px ${(((alltImgWidth * overlayWidth) - opImgDim.width) / 2)}px;transition: 0.3s ease;`;
					imgEl.src = loadedImg.src;
					imgEl.title =  undefined!= img.getAttribute('title') || null != img.getAttribute('title') ? img.getAttribute('title') :'';	
					overlayDivEl.appendChild(imgEl);
					if( 1< gal.length ){
						this.createToolbar(overlayDivEl,gal,imgEl,imgNum,param2);
					}
				});
				this.createSidebar(overlayDivEl,gal,imgEl,imgNum,param2);
			}


			createToolbar(overlayDivEl,gal,imgEl,imgNum,param2){
					let toolbarDiv = overlayDivEl.querySelector('#toolbar-div');
					let ovWidth = overlayDivEl.offsetWidth;
					let ovHeight = overlayDivEl.offsetHeight;
					let btnStyle =  `height:${0.0347*ovHeight}px;width:${0.0345*ovHeight}px;text-align:center;display:inline-block;font-size:${0.028*ovHeight}px;cursor:pointer;color:rgba(255,255,255,1);border-radius:${0.035*ovHeight}px;margin:${0.002*ovHeight}px;background-color:rgba(0,0,0,0.5);border:1px dotted rgba(255,255,255,0.5);`;

					if(undefined == toolbarDiv){
						let toolbarDiv = document.createElement('div');
						toolbarDiv.id = 'toolbar-div';
						toolbarDiv.style = `left:${((0.93*ovWidth)-(6*0.037*ovHeight))/2}px;bottom: 2px;display: inline-block;position: fixed;background-color:rgba(0,0,0,0);border: 1px solid rgba(255,255,255,0);`;
				
									let prevBtn =  document.createElement('div');
										prevBtn.id = 'gal-prev-img';
										prevBtn.style = btnStyle;
										prevBtn.innerHTML = '&#60;';
										prevBtn.title = 'Previous image';
										prevBtn.addEventListener('click',()=>{
											let imgNumToLoad = 0 <= imgNum-1 ? imgNum-1 : gal.length-1;
											this.loadImg(imgNumToLoad,gal,overlayDivEl,imgEl);
										});
										prevBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
										});
										prevBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});
										toolbarDiv.insertBefore(prevBtn, toolbarDiv.firstChild);

									let firstImgBtn =  document.createElement('div');
										firstImgBtn.id = 'gal-first-img';
										firstImgBtn.style  = btnStyle+'transform:rotate(-90deg);';
										firstImgBtn.innerHTML = '&#8892;';
										firstImgBtn.title = 'Go to first image';
										firstImgBtn.addEventListener('click',()=>this.loadImg(0,gal,overlayDivEl,imgEl));
										firstImgBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										firstImgBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});
										toolbarDiv.appendChild(firstImgBtn);
										
									let zoomInBtn =  document.createElement('div');
										zoomInBtn.id = 'img-zoom-in';
										zoomInBtn.style  = btnStyle;
										zoomInBtn.innerHTML = '&#43;';
										zoomInBtn.title = 'Zoom in';
										zoomInBtn.addEventListener('click',()=>imgEl.style.transform = 0 === imgEl.style.transform.length? `scale(1.2)` : `scale(${parseFloat(imgEl.style.transform.replace('scale(','').replace(')',''))+0.2})`);	
										zoomInBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										zoomInBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});
										toolbarDiv.appendChild(zoomInBtn);	
										
									let zoomOutBtn =  document.createElement('div');
										zoomOutBtn.id ='img-zoom-out';
										zoomOutBtn.style  = btnStyle;
										zoomOutBtn.innerHTML = '&#8722;';
										zoomOutBtn.title = 'Zoom out';
										zoomOutBtn.addEventListener('click',()=>{
											let zoom = parseFloat(imgEl.style.transform.replace('scale(','').replace(')',''))-0.2;
											let scale = 0 > zoom ? 0.1 : zoom;
											imgEl.style.transform =  0 === imgEl.style.transform.length ? `scale(0.8)` : `scale(${scale})`
										});
										zoomOutBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										zoomOutBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});
										toolbarDiv.appendChild(zoomOutBtn);

									let lastImgBtn =  document.createElement('div');
										lastImgBtn.id = 'gal-last-img';
										lastImgBtn.style  = btnStyle+'transform:rotate(90deg);';
										lastImgBtn.innerHTML = '&#8892;';
										lastImgBtn.title = 'Go to last image';
										lastImgBtn.addEventListener('click',()=>this.loadImg((gal.length-1),gal,overlayDivEl,imgEl));
										lastImgBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										lastImgBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});
										toolbarDiv.appendChild(lastImgBtn);
										
									
									
									let nextBtn =  document.createElement('div');
										nextBtn.id = 'gal-next-img';
										nextBtn.style  = btnStyle;
										nextBtn.innerHTML = '&#62;';
										nextBtn.title = 'Next image';
										nextBtn.addEventListener('click',()=>{
												let imgNumToLoad = gal.length-1 >= imgNum+1 ? imgNum+1 : 0;
												this.loadImg(imgNumToLoad,gal,overlayDivEl,imgEl);
											});
										nextBtn.addEventListener('mouseenter',event=>{
												event.target.style.fontWeight = 'bolder';
												event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
		
											});
										nextBtn.addEventListener('mouseleave',event=>{
												event.target.style.fontWeight = '';
												event.target.style.boxShadow = "";
											});	
										toolbarDiv.appendChild(nextBtn);
										overlayDivEl.appendChild(toolbarDiv);										
										

													
									}else{

										let prevBtn =  document.createElement('div');
										prevBtn.id = 'gal-prev-img';
										prevBtn.style = btnStyle;
										prevBtn.innerHTML = '&#60;';
										prevBtn.title = 'Previous image';
										prevBtn.addEventListener('click',()=>{
											let imgNumToLoad = 0 <= imgNum-1 ? imgNum-1 : gal.length-1;
											this.loadImg(imgNumToLoad,gal,overlayDivEl,imgEl);
										});
										prevBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										prevBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});	
										toolbarDiv.insertBefore(prevBtn, toolbarDiv.firstChild);

										let nextBtn =  document.createElement('div');
										nextBtn.id = 'gal-next-img';
										nextBtn.style  = btnStyle;
										nextBtn.innerHTML = '&#62;';
										nextBtn.title = 'Next image';
										nextBtn.addEventListener('click',()=>{
											let imgNumToLoad = gal.length-1 >= imgNum+1 ? imgNum+1 : 0;
											this.loadImg(imgNumToLoad,gal,overlayDivEl,imgEl);
										});
										nextBtn.addEventListener('mouseenter',event=>{
											event.target.style.fontWeight = 'bolder';
											event.target.style.boxShadow = "-1px -1px 1px rgba(255,255,255,0.5)";
	
										});
										nextBtn.addEventListener('mouseleave',event=>{
											event.target.style.fontWeight = '';
											event.target.style.boxShadow = "";
										});	
										toolbarDiv.appendChild(nextBtn);

									}
									
			}
		
			
		
			createSidebar(overlayDiv,gal,imgEl,imgClicked,param2) {
				if( 1 < gal.length ){
							let sidebar = document.createElement('div');
							sidebar.id = `gal-sidebar`;
							sidebar.style = `overflow:auto;tex-align:center;display:inline-block;width:${0.04*overlayDiv.offsetWidth}px;height:${overlayDiv.offsetHeight}px;float:right;right:0px;background-color:rgba(255,255,255,0.7);`;
							overlayDiv.appendChild(sidebar);
					
							let sidebarImgStyle = `border-radius:2%;cursor:pointer;margin-bottom:1px;background-color:rgba(255,255,255,1);width:98%;height:${0.98*sidebar.offsetWidth}px;border:1px solid rgba(0,0,0,0.8);background-repeat: no-repeat;background-size:contain;background-position: center;transition:0.3 ease;`;
							gal.map((img,i)=>{
				
								let imgPrev = new Image();
								imgPrev.src  = img.src; 

								let sidebarImg  = document.createElement('div');
								sidebarImg.classList.add('img-preview');
								sidebarImg.title =  undefined!= img.getAttribute('title') || null != img.getAttribute('title') ? img.getAttribute('title') :'';
								sidebarImg.style = sidebarImgStyle;
								sidebarImg.addEventListener('mouseenter', event=>event.target.style.borderRadius='12%');
								sidebarImg.addEventListener('mouseleave', event=>event.target.style.borderRadius='2%');

								let rotateDiv = document.createElement('div');
									rotateDiv.classList.add('img-loading');
									rotateDiv.style = `text-align:center;color:rgba(0,0,0,1);font-size:${0.6*sidebar.offsetWidth}px;`;
									rotateDiv.title = 'Loading';
									rotateDiv.innerHTML = `.`;
									sidebarImg.appendChild(rotateDiv);

								sidebar.appendChild(sidebarImg);
								let rotateInterval = setInterval( ()=>{
										let rotateSpan = sidebarImg.querySelector('.img-loading');

										switch(rotateSpan.innerHTML){
											case '.':
												rotateSpan.innerHTML = '..'
											  break;
										    case '..':
													rotateSpan.innerHTML = '...'
											break;
											case '...':
													rotateSpan.innerHTML = '....'
											break;
											case '....':
													rotateSpan.innerHTML = '.'
											break;		
											default:
										}
								},250); 

								imgPrev.addEventListener('load',(event)=>{
									clearInterval(rotateInterval);
									sidebarImg.innerHTML = '';
									sidebarImg.style.backgroundImage = `url('${event.target.src}')`;
									sidebarImg.addEventListener('click', () => this.loadImg(i,gal,overlayDiv,imgEl) );
									});
							});

							this.scrollToPrev(imgClicked);
							sidebar.style.paddingTop = 1 <= ((overlayDiv.offsetHeight - (gal.length * sidebar.offsetWidth)) / 2) ?  `${((overlayDiv.offsetHeight - (gal.length * sidebar.offsetWidth)) / 2)}px`: `0px`;
				}
			}

		loadImg(imgNum,gal,overlayDiv,imgEl){
				
				var clickedImg = new Image();
				clickedImg.src =  gal[imgNum].src;
				imgEl.style.display = 'none';
				
				let imgLoading = overlayDiv.querySelector('#image-loading-main');
				imgLoading.style.display = 'inline-block';

				let loadingInt = setInterval( ()=>{
					switch(imgLoading.innerHTML){
						case 'Loading':
								imgLoading.innerHTML = 'Loading.'
						  break;
						case 'Loading.':
								imgLoading.innerHTML = 'Loading..'
						  break;
						case 'Loading..':
								imgLoading.innerHTML = 'Loading...'
						break;
						case 'Loading...':
								imgLoading.innerHTML = 'Loading....'
						break;
						case 'Loading....':
								imgLoading.innerHTML = 'Loading.'
						break;		
						default:
					}
				},350); 

				clickedImg.addEventListener('load',()=>{
					clearInterval(loadingInt);
					imgLoading.style.display = 'none';
					let toolbarDiv = overlayDiv.querySelector('#toolbar-div');
					toolbarDiv.removeChild(document.querySelector('#gal-prev-img'));
					toolbarDiv.removeChild(document.querySelector('#gal-next-img'));
					let imgSrc = event.target.src;
					let opImgDim = this.getOptimizedImageSize(overlayDiv.offsetWidth, overlayDiv.offsetHeight, clickedImg.width, clickedImg.height);
					
					imgEl.style = `height:${opImgDim.height}px;width:${opImgDim.width}px;display:inline-block;margin:${((overlayDiv.offsetHeight- opImgDim.height) / 2)}px ${(((0.95 * overlayDiv.offsetWidth) - opImgDim.width) / 2)}px;transition: 0.3s ease;`;	
					imgEl.src = imgSrc;
					imgEl.title =  undefined!= gal[imgNum].getAttribute('title') || null != gal[imgNum].getAttribute('title') ? gal[imgNum].getAttribute('title') :'';	

						this.createToolbar(overlayDiv,gal,imgEl,imgNum)
						this.scrollToPrev(imgNum);
			});	
		}


		scrollToPrev(imgNum){
			 Array.from(document.querySelectorAll('.img-preview')).forEach((prev,i)=>{

				if(i === imgNum){
					prev.scrollIntoView({ behavior: "smooth",
										  block: "center"
										});
				   prev.style.opacity = '1';
				   prev.style.border=`1px solid rgba(255, 0, 0, 1)`;					
				   
				}else{
					prev.style.opacity  = '0.8';
					prev.style.border=`1px solid rgba(0,0,0,0.8)`;	
				}
			 });
		}

		adjustApp() {

				let overlayWidth = window.innerWidth;
				let overlayHeight = window.innerHeight;
				let overlayDiv = document.querySelector('#gallery-overlay');
			
				if(undefined != overlayDiv){
					overlayDiv.style = `position:fixed;top:0%;left:0%;right:0%;bottom:0%;height:${overlayHeight}px;width:${overlayWidth}px;background-color:rgba(0,0,0,.8);z-index:100000;`;
					overlayDiv.querySelector('#overlay-close-btn').style.fontSize = `${0.016*overlayWidth}`;
					let loadedImg = document.querySelector('#loaded-img');
					let sidebarDiv = document.querySelector('#gal-sidebar');
					let alltImgWidth = undefined != sidebarDiv ? 0.95 : 1;
					let imgLoading = overlayDiv.querySelector('#image-loading-main');
						imgLoading.style.left  = `${(alltImgWidth-0.075)*overlayWidth/2}`;
						imgLoading.style.top = `${overlayHeight/2}`;
						imgLoading.style.fontSize =  `${0.016*overlayWidth}px`
	
					let bufferImg = new Image();
						bufferImg.src = loadedImg.src;			
					let opImgDim = this.getOptimizedImageSize(overlayWidth, overlayHeight, bufferImg.width, bufferImg.height);
					let imgDisplay =  loadedImg.style.display;	
						loadedImg.style = `height:${opImgDim.height}px;width:${opImgDim.width}px;display:${imgDisplay};margin:${((overlayHeight- opImgDim.height) / 2)}px ${(((alltImgWidth * overlayWidth) - opImgDim.width) / 2)}px;`;	
				
								
             if(undefined != sidebarDiv){						
					
						let sidebarImgs = Array.from(sidebarDiv.querySelectorAll('div'));
							sidebarDiv.style.paddingTop =  1 <= ((overlayHeight - (sidebarImgs.length * 0.04*overlayWidth)) / 2) ?  `${((overlayHeight - (sidebarImgs.length * 0.04*overlayWidth)) / 2)}px`:'0px';
							sidebarDiv.style.height = overlayHeight+'px';
							sidebarDiv.style.width = (0.04*overlayWidth)+'px';
							sidebarImgs.map(x => {
								x.style.height = x.offsetWidth + 'px';
								
								if(undefined != x.querySelector('.img-loading')){
									x.querySelector('.img-loading').style.fontSize = `${0.6*sidebarDiv.offsetWidth}px`;
								}
								
							});	

							let toolbarDiv = overlayDiv.querySelector('#toolbar-div');
							toolbarDiv.style = `left:${((0.93*overlayWidth)-(6*0.037*overlayHeight))/2}px;bottom: 2px;display: inline-block;position: fixed;background-color:rgba(0,0,0,0);border: 1px solid rgba(255,255,255,0);`;
							
							Array.from(toolbarDiv.querySelectorAll('div')).map( x=>{
								x.style.height = `${0.0347*overlayHeight}px`;
								x.style.width = `${0.0347*overlayHeight}px`;
								x.style.borderRadius = `${0.035*overlayHeight}px`;
								x.style.margin= `${0.002*overlayHeight}px`;
								x.style.fontSize = `${0.028*overlayHeight}px`;
							});

				}			
					

				}
			}
	
			closeOverlay() {
				document.body.removeChild(document.querySelector('#gallery-overlay'));
				document.body.style.overflow = '';
				document.body.style.margin = ''
				document.querySelector('head').removeChild(document.querySelector('#ctc-scroll-css'));
			}
		
		getOptimizedImageSize(screenWidth, screenHeight, imageActualWidth, imageActualHeight) {
		
				var imageScreenHeightRatio = 0,
					imageScreenWidthRatio = 0,
					optimizedImageHeight = 0,
					optimizedImageWidth = 0;
				var imgPercent = 0.85,
					marginPercent = 0.15;
		
				if ((imageActualWidth >= screenWidth) && (imageActualHeight >= screenHeight)) {
					if (imageActualWidth >= imageActualHeight) {
						if (imageActualWidth > imageActualHeight) {
		
							imageScreenWidthRatio = imageActualWidth / screenWidth;
							optimizedImageWidth = (imageActualWidth / imageScreenWidthRatio) - (marginPercent * screenWidth);
							optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
							if (optimizedImageHeight >= (imgPercent * screenHeight)) {
								imageScreenHeightRatio = screenHeight / imageActualHeight;
								optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (marginPercent * screenHeight);
								optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
							}
						} else {
		
							if (screenWidth > screenHeight) {
								optimizedImageHeight = (imgPercent * screenHeight);
								optimizedImageWidth = optimizedImageHeight;
		
							} else if (screenHeight > screenWidth) {
								optimizedImageWidth = (imgPercent * screenWidth);
								optimizedImageHeight = optimizedImageWidth;
		
							} else {
								imageScreenHeightRatio = screenHeight / imageActualHeight;
								optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (marginPercent * screenHeight);
								optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
							}
						}
		
					} else {
						imageScreenHeightRatio = imageActualHeight / screenHeight;
						optimizedImageHeight = (imageActualHeight / imageScreenHeightRatio) - (marginPercent * screenHeight);
						optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
					}
		
				} else if (imageActualWidth >= screenWidth && imageActualHeight < screenHeight) {
					imageScreenWidthRatio = screenWidth / imageActualWidth;
					optimizedImageWidth = imageActualWidth * imageScreenWidthRatio - (marginPercent * screenWidth);
					optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
				} else if (imageActualHeight >= screenHeight && imageActualWidth < screenWidth) {
					imageScreenHeightRatio = screenHeight / imageActualHeight;
					optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (marginPercent * screenHeight);
					optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
					optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
				} else {
					var avilableImageWidth = imgPercent * screenWidth;
					var avilableImageHeight = imgPercent * screenHeight;
					if (imageActualWidth >= avilableImageWidth && imageActualHeight >= avilableImageHeight) {
						var imageAvilableWidthRatio = avilableImageWidth / imageActualWidth;
						imageAvilableHeightRatio = avilableImageHeight / imageActualHeight;
						optimizedImageWidth = avilableImageWidth * imageAvilableWidthRatio;
						optimizedImageHeight = screenHeight * imageScreenHeightRatio;
					} else if (imageActualWidth >= avilableImageWidth && imageActualHeight < avilableImageHeight) {
						var imageAvilableWidthRatio = avilableImageWidth / imageActualWidth;
						optimizedImageWidth = imageActualWidth * imageAvilableWidthRatio;
						optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
					} else if (imageActualHeight >= avilableImageHeight && imageActualWidth < avilableImageWidth) {
						var imageAvilableHeightRatio = avilableImageHeight / imageActualHeight;
						optimizedImageHeight = imageActualHeight * imageAvilableHeightRatio;
						optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
					} else {
						optimizedImageWidth = imageActualWidth;
						optimizedImageHeight = imageActualHeight;
					}
					optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
				}
		
		
				//at last check it optimized width is still large			
				if (optimizedImageWidth > (imgPercent * screenWidth)) {
					optimizedImageWidth = imgPercent * screenWidth;
					optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
				}
		
				return {
					width: optimizedImageWidth,
					height: optimizedImageHeight
				};
			}
		

   onKeyStroke(event){
		let overlayDiv = document.querySelector('#gallery-overlay');
		if (undefined != overlayDiv ) {
					if (event.code === 'ArrowUp' || event.code === 'ArrowLeft') {
						if(undefined != document.querySelector('#gal-prev-img')){
							document.querySelector('#gal-prev-img').click();
						}
					} else if (event.code === 'ArrowDown' || event.code == 'ArrowRight') {
						if(undefined != document.querySelector('#gal-next-img')){
							document.querySelector('#gal-next-img').click();
						}
					} else if (event.code == 'Escape') {
						overlayDiv.querySelector('#overlay-close-btn').click();
					}
				}
		}

		
		}