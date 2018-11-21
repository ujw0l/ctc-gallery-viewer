class ctcOverlayViewer{
	

		  constructor(elem) { 
			  this.prepareOverlay(this.addRemoveActiveGallery(elem));
			  ctcOverlayViewer.onRequiredEventListener();
			  
		  }
	
		  
	appendStyle(){
		
		
		
		
		
		
		
	}	  
		 
		 //function to prrepare overlay 
		 prepareOverlay(sideGallery){

			 if(document.getElementById("ctcOverlayV") == null){
							let overlayDiv = document.createElement('div');
							overlayDiv.id = "ctcOverlayV";
							overlayDiv.className = "ctcOverlayV";
					
							 overlayDiv.appendChild(sideGallery);
							 
							//image container
							let imageContainer = document.createElement('div');
							imageContainer.id = "ctcOverlayImageContainerV";
							imageContainer.className = "ctcOverlayImageContainerV"; 
						   
						   
						     
						    let ctcLoadedImgAltTitle = document.createElement('div');
							ctcLoadedImgAltTitle.id = "ctcLoadedImgAltTitleV";
							ctcLoadedImgAltTitle.className = "ctcLoadedImgAltTitleV";
							imageContainer.appendChild(ctcLoadedImgAltTitle);
						 
							
							//close button span
							let ctcOverlayClosebtn = document.createElement('span');
							ctcOverlayClosebtn.id = "ctcOverlayClosebtnV";
							ctcOverlayClosebtn.className = "ctcOverlayClosebtnV";
							ctcOverlayClosebtn.setAttribute("title", "close");
							ctcOverlayClosebtn.setAttribute("onclick", "ctcOverlayViewer.closeOverlay();");
							
						
							
							//imageContainer.appendChild(ctcLoadedImgAltTitle);
							overlayDiv.appendChild(ctcOverlayClosebtn);
							overlayDiv.appendChild(imageContainer);
				
							document.body.insertBefore(overlayDiv,document.body.firstChild);
         
						
				}
			 	else{
			 		
			 		return;
			 	}
			 
			 
		 }
		 
		 
		 //function check and remove active gallery class from old element
		 checkRemoveOldGal(elem){
	
				var activeGallery = document.getElementsByClassName("ctcActiveGalleryV");
	
				if(activeGallery.length >= 1){
					
					var attr = ['data-v-img-number','onclick'];
					var allOldImg  = ctcOverlayViewer.objectToArray(activeGallery[0].getElementsByTagName('img'));
									allOldImg.map(x =>ctcOverlayViewer.removeElemAttr(attr,ctcOverlayViewer.removeClass(["activeGalImgV"],x)));
			
									ctcOverlayViewer.removeClass(["ctcActiveGalleryV"],activeGallery[0]);		

				   }
				
				return elem;
		 }

		 
		 //function to apply style 
		  static applyStyle(rules,elem){
		
			  let cssRules ='';

		       rules.map(x=> cssRules +=  x[0]+":"+x[1]+";");
				
			  elem.setAttribute("style",cssRules);
			  return  elem;
		  }
		  
		 //function to set attribute of elment 
		  static setElemAttr(attr,elem){
	  
			  attr.map(x=>  elem.setAttribute(x[0],x[1]));
		
			  return elem;
		  }
		  
		  
		//function to set attribute of elment 
		  static removeElemAttr(attr,elem){
			  
			 attr.map(x => elem.removeAttribute(x));
			  return elem;
		  }
		 
		//function to add class
		  static addElemClass(newClass,elem){
			  
			  newClass.map(x=>elem.classList.add(x));
			  
			  return elem;
		  }
		  
		  
		  //function remove class
		  static removeStyle(styleRule,elem){
			  
			  styleRule.map(x=>elem.style.x[0]="");
			  
			  return elem;
		  }
		  
		  //function to remove class
		  static removeClass(removeClass,elem){
		
			  removeClass.map(x => elem.classList.remove(x));
			  
			  return elem;
		  }
		  
		  
		  //function remove element
		  static removeElem(removeElem){
			  
			  removeElem.map(x=> x.parentNode.removeChild(x));
		  }
		  //function to object into array
		  static objectToArray(obj){
			  
			  
			 
			  var newArray =[];
					  Object.keys(obj).map( function(x){
						  
						  
						  if(Number.isInteger(parseInt(x))){
							    newArray.push(obj[x]);
							  }
					  });
					 
					return newArray;
			
			  
		  }
		  
		
	static applyAnimation(animation,elem){
		
		if(animation[0] == 'opacity' && animation[1] > 0 ){
			var opacity = 0;
			var margin = 50;
			var dime = 0;
			
			
			var intervalId = setInterval(()=>{
			
				
			  
				
									if(opacity >= animation[1] &&  margin <= 0 && dime >= 100){
										
											clearInterval(intervalId);
										}
										else{
											
											  opacity = opacity+0.1;
											  margin = margin-10;
												dime = dime+20;
											if( opacity <=animation[1]){
											    elem.style.opacity =  opacity;
											}
											if(margin >=0){
													
													elem.style.top = margin+'%';
													elem.style.right = margin+'%';
													elem.style.bottom = margin+'%';
													elem.style.left =	margin+'%';
											}
											if(dime <= 100){
													elem.style.height = dime+'%';
													elem.style.width =	dime+'%';
											}
											
										}
									}, animation[2]/5,intervalId);
									
			
			
			
		}
		else{
	
			var opacity = animation[1];
			var margin = 0;
			var dime = 100;
		
			var intervalId = setInterval(()=>{
			
				
					
			
				
									if(opacity <= animation[1] &&  margin === 50 && dime === 0){
											
											
											clearInterval(intervalId);
										}
										else{
							
											opacity = opacity-0.1;
											margin = margin+5;
											dime = dime-10;
											if( opacity >=animation[1]){
											    elem.style.opacity =  opacity;
											}
											elem.style.opacity = animation[1];
											
											if(dime <= 0){
												elem.style.height = dime+'%';
												elem.style.width =	dime+'%';
											}
											
											if(margin >= 50){
													elem.style.top = margin+'%';
													elem.style.right = margin+'%';
													elem.style.bottom = margin+'%';
													elem.style.left =	margin+'%';
											}
											
										
											
										}
									}, animation[2]/5,intervalId);
			
			
			
			
		}
		
		return elem;
	}	  
		  
		  
 //function to add or remove active and inactive gallery		 
  addRemoveActiveGallery(elem){
	  
	  var newImageCount =1;
	  
	  if(elem.classList.contains( "ctcActiveGalleryV" ) === false){

		 
		  ctcOverlayViewer.addElemClass(["ctcActiveGalleryV"],this.checkRemoveOldGal(elem));	
			
			var sideGalleryContainer = document.getElementById("ctcOverlayThumbGalleryContainerV");
			if(sideGalleryContainer !== null){
				
				ctcOverlayViewer.removeElem(ctcOverlayViewer.objectToArray(document.getElementsByClassName("sideGalImgV")));
			}
			else{
			
				
				sideGalleryContainer = ctcOverlayViewer.addElemClass(["ctcOverlayThumbGalleryContainerV"],document.createElement('div'));
				sideGalleryContainer.id="ctcOverlayThumbGalleryContainerV";
					
					
					
			}

			
		   
			
			var newActiveImages = ctcOverlayViewer.objectToArray(elem.getElementsByTagName('img'));
				newImageCount = newActiveImages.length;
			let gallerySpanHeight = Math.round(0.045*window.screen.width);	

			if(newActiveImages.length >=2){
			newActiveImages.map( function(img,i){
				
				ctcOverlayViewer.addElemClass(["activeGalImgV"],ctcOverlayViewer.setElemAttr([['onclick','ctcOverlayViewer.loadOverlayImages('+i+');']],img));
				
				   var styleRule = [['background','url('+img.getAttribute("src")+')'],['height',gallerySpanHeight]];
				   var ElemAttr = [['title',img.getAttribute("title")], ["alt",img.getAttribute("alt")],['onclick','ctcOverlayViewer.loadOverlayImages('+i+');']];
				   sideGalleryContainer.appendChild(ctcOverlayViewer.addElemClass(["sideGalImgV"],ctcOverlayViewer.setElemAttr(ElemAttr,ctcOverlayViewer.applyStyle(styleRule,document.createElement('span')))));
				
			});
		}
		else{
			ctcOverlayViewer.addElemClass(["activeGalImgV"],ctcOverlayViewer.setElemAttr([['onclick','ctcOverlayViewer.loadOverlayImages('+0+');']],newActiveImages[0]));

		}
		
	}
	  
	 
	  
	      return sideGalleryContainer;
	 
  }		
  

//function to run on close button lcik		  
  static closeOverlay(){
	  
	  ctcOverlayViewer.applyStyle([['opacity',0],['width',0+'px']],ctcOverlayViewer.applyAnimation(['opacity',0,600],ctcOverlayViewer.applyStyle([['height',0+'px']],document.getElementById("ctcOverlayV"))));
	 
	  document.getElementById("ctcOverlayImageContainerV").style.backgroundImage = "";
	  document.body.style.overflow= 'auto';	 	  
  }

  
 
		 
/*
 * function to load overlay image
 * 
 */		  
		  

		  
static loadOverlayImages(currentImageNumber){

       	 

					var overlayImg = document.querySelectorAll('img[onclick="ctcOverlayViewer.loadOverlayImages('+currentImageNumber+');"]');
					var imageRatio = 0;
					var imageWidth = 0;
					var imageHeight = 0;
					var imageActualHeight =0;
					var imageActualWidth =0;
					var imgHeightRatio =0;
					var imgMarginTop ='';
					var prevImage = 0;
					var nextImage = 0;
					var screenWidth = window.screen.width;
					var screenHeight = window.screen.height;
					var closeBtn =  document.getElementById("ctcOverlayClosebtnV");
					var image = new Image();
					 var windowWidth = window.innerWidth;
					 var windowHeight = window.innerHeight;
					 var imageNumberToLoad = parseInt(currentImageNumber);
					 var totalImageCount = document.getElementsByClassName("activeGalImgV").length;
					 var sideImgGallery = document.getElementById("ctcOverlayThumbGalleryContainerV");
					 
					 if(imageNumberToLoad < 0 || totalImageCount < imageNumberToLoad+1){
						 
						
						 return;
					 }
					 else{
						 
						 var imageToLoad = image.src = overlayImg[0].src;
					 }

					 	let overlay = document.getElementById("ctcOverlayV");
				       document.body.style.overflow= 'hidden'; 
					 
					//special case when window is not in full screen
					 //while window is resized little bit
					 
					 if(windowWidth !== screenWidth  || screenHeight !== windowHeight){
						screenWidth =  windowWidth;
						screenHeight = windowHeight;
	
					 }
				
					
					 
					 
					  if(overlay.offsetHeight === 0){ 
						
							ctcOverlayViewer.applyAnimation(['opacity',1,500],ctcOverlayViewer.applyStyle([['opacity',1],['top','0'],['left','0'],['right','0'],['bottom','0']],overlay));
						}
						else{
							
							ctcOverlayViewer.applyStyle([['opacity',1],['top','0'],['left','0'],['right','0'],['bottom','0'],['height','100%'],['width','100%']],overlay);
							
						}					 
					 
					 
		           //optimize font for screen resolution
					let optimizedFontSize= (screenWidth/1280)*120; 
					
					if(optimizedFontSize < 50){
						
						optimizedFontSize = 50;
						
					}
					else if(optimizedFontSize < 70){
							 		 
							optimizedFontSize = 70;
					}
					else if(optimizedFontSize > 120){
						optimizedFontSize= 120;
				   }
			
							
				
				
					 
	 document.body.style.overflow= 'hidden';
	 
	 ctcOverlayViewer.addElemClass(['overlayContentloadingV'],closeBtn);
	  
			
	 image.addEventListener('load', function() {
				var gallerySpanHeight = 0.045*screenWidth;
				
								imageActualHeight = image.height;
								imageActualWidth  = image.width; 
						
											var imageScreenHeightRatio = 0;
											var imageScreenWidthRatio =0;
											var optimizedImageHeight = 0;
											var optimizedImageWidth = 0;
							
										if((imageActualWidth >= screenWidth) && (imageActualHeight >= screenHeight )){	
													if(imageActualWidth >= imageActualHeight){
																			if(imageActualWidth > imageActualHeight ){
																				 
																			     imageScreenWidthRatio = imageActualWidth/screenWidth;
																			     optimizedImageWidth = (imageActualWidth/imageScreenWidthRatio)-(0.10*screenWidth);
																			     optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
																						     if(optimizedImageHeight >=(0.90*screenHeight)){
																						    	 imageScreenHeightRatio = screenHeight/imageActualHeight;
																								 optimizedImageHeight = imageActualHeight*imageScreenHeightRatio-(0.10*screenHeight);
																								 optimizedImageWidth = imageActualWidth*(optimizedImageHeight/imageActualHeight); 
																						     }
																		}
															
															else{

																		   if(screenWidth > screenHeight){
																			   optimizedImageHeight = (0.90*screenHeight);
																			   optimizedImageWidth =  optimizedImageHeight;
																			  
																		     }
																		   else if(screenHeight > screenWidth){
																			   
																			   optimizedImageWidth = (0.90*screenWidth);
																			   optimizedImageHeight =  optimizedImageWidth;
																			   
																		   }
																		   else{	   
																		
																			   imageScreenHeightRatio = screenHeight/imageActualHeight;
																				 optimizedImageHeight = imageActualHeight*imageScreenHeightRatio-(0.10*screenHeight);
																				 optimizedImageWidth = imageActualWidth*(optimizedImageHeight/imageActualHeight);
																		   }
															}	 
													 	
											}
											else{
												 imageScreenHeightRatio = imageActualHeight/screenHeight;
												 optimizedImageHeight = (imageActualHeight/imageScreenHeightRatio)-(0.10*screenHeight);
												 optimizedImageWidth = imageActualWidth*(optimizedImageHeight/imageActualHeight);
											}    
										        
										}
										else if(imageActualWidth >= screenWidth &&  imageActualHeight  < screenHeight){
											 imageScreenWidthRatio = screenWidth/imageActualWidth;
											 optimizedImageWidth = imageActualWidth*imageScreenWidthRatio-(0.10*screenWidth);
											  optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
										}
										else if(imageActualHeight >= screenHeight && imageActualWidth < screenWidth){
											 imageScreenHeightRatio = screenHeight/imageActualHeight;
											 optimizedImageHeight = imageActualHeight*imageScreenHeightRatio-(0.10*screenHeight);
											 optimizedImageWidth = imageActualWidth*(optimizedImageHeight/imageActualHeight);
											 optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
										}
										else{
													var avilableImageWidth =  0.90*screenWidth;		
													var avilableImageHeight =  0.90*screenHeight;
													if(imageActualWidth >= avilableImageWidth &&  imageActualHeight >= avilableImageHeight){
														var imageAvilableWidthRatio = avilableWidth/imageActualWidth;
														imageAvilableHeightRatio = avilableHeight/imageActualHeight;
															 optimizedImageWidth = avilableWidth*imageAvilableWidthRatio;
													         optimizedImageHeight = screenHeight*imageScreenHeightRatio;
													}	
													else if(imageActualWidth >= avilableImageWidth &&  imageActualHeight < avilableImageHeight ){
														 var imageAvilableWidthRatio = avilableImageWidth/imageActualWidth;
														 optimizedImageWidth = imageActualWidth*imageAvilableWidthRatio;
														  optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
													}
													else if(imageActualHeight >= avilableImageHeight && imageActualWidth < avilableImageWidth){
														 var imageAvilableHeightRatio = avilableImageHeight/imageActualHeight;
														 optimizedImageHeight = imageActualHeight*imageAvilableHeightRatio;
														 optimizedImageWidth = imageActualWidth*(optimizedImageHeight/imageActualHeight);
													}
													else{
														optimizedImageWidth = imageActualWidth;
														optimizedImageHeight = imageActualHeight;
													}
													optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
										} 
										
										
								//at last check it optimized width is still large			
							   if(optimizedImageWidth>(0.90*screenWidth)){	   
								   optimizedImageWidth = 0.90*screenWidth;
								   optimizedImageHeight = imageActualHeight*(optimizedImageWidth/imageActualWidth);
								   
							   }
							   
							   
							   		let galleryRightNav = document.getElementById("ctcGalleryRightNavV");
							   		let galleryLeftNav = document.getElementById("ctcGalleryLeftNavV");
							   		let containerMarginTop = Math.round(screenHeight-optimizedImageHeight)/2;
						        	
									let navIconMargin = Math.round((optimizedImageHeight-(1.6*optimizedFontSize))/2);	
								    let overlayImgContainer = document.getElementById("ctcOverlayImageContainerV");
									let prevImgNum = overlayImgContainer.getAttribute("data-v-overlay-img");
			  		                
			  		                let closeMarginTop =   Math.round(containerMarginTop-(closeBtn.offsetHeight/1.2)); 
			  		                let prevGalImg = document.querySelectorAll('span[onclick="ctcOverlayViewer.loadOverlayImages('+prevImgNum+');"]');
			  		                let selectedGalImg = document.querySelectorAll('span[onclick="ctcOverlayViewer.loadOverlayImages('+imageNumberToLoad+');"]');
			  		               
			  		                let rightNav = document.getElementById("ctcGalleryRightNavV");
			  		                let leftNav  = document.getElementById("ctcGalleryLeftNavV");
			  		            
			  		              if(rightNav !== null){
			  		            	ctcOverlayViewer.removeElem([rightNav]);
			  		            	
			  		              }
			  		              
			  		            if(leftNav !== null){ 
			  		            	ctcOverlayViewer.removeElem([leftNav]);
			  		            	
			  		              }
 			  		           
			  		           
			  		            
			  		          //script to load image and margin of close button 
								
								 ctcOverlayViewer.removeClass(['overlayContentloadingV'],closeBtn);
								 
		  		          
			  		              if(prevGalImg[0] !== undefined){
			  		            	ctcOverlayViewer.removeClass(['ctcOverlayThumbGalleryActiveV'],prevGalImg[0]);
			  		                  
			  		              }
			  		   		              
			
									if(totalImageCount>=2){
										
										overlayImgContainer.setAttribute('data-v-overlay-img',imageNumberToLoad);	
										
										let containerMarginLeft = Math.round((0.955*screenWidth)-optimizedImageWidth)/2;
										
										
										let style = [["background-image",'url('+imageToLoad+')'],['margin-left',containerMarginLeft+"px"],["margin-top",containerMarginTop+"px"],["width",Math.round(optimizedImageWidth)+"px"],["height",Math.round(optimizedImageHeight)+"px"]];
						
										ctcOverlayViewer.applyStyle(style,overlayImgContainer);
										
									
										if(optimizedFontSize < 51){
											
											ctcOverlayViewer.applyStyle([["margin-right",containerMarginLeft+"px"],['margin-top',closeMarginTop+"px"],['font-size','35px']],closeBtn);
											
										  
										}
										else{
											ctcOverlayViewer.applyStyle([["margin-right",containerMarginLeft+"px"],['margin-top',closeMarginTop+"px"]],closeBtn)
											
										}
										
										
										let countAndCurrent = document.getElementById("ctcOverlayCountAndCurrentImageV");
										
										if( countAndCurrent === null){
											
											countAndCurrent = document.createElement('div');
											countAndCurrent.id = "ctcOverlayCountAndCurrentImageV";
											countAndCurrent.className = "ctcOverlayCountAndCurrentImageV";
											overlayImgContainer.appendChild(countAndCurrent);
										}
										
										//first add image counr and current images
										
												
										sideImgGallery.style.opacity=  "1";
								
										var galSpan = ctcOverlayViewer.objectToArray(document.getElementsByClassName("sideGalImgV"));
										
										galSpan.map(x=>x.style.height=gallerySpanHeight+"px");
								
										if((totalImageCount*(gallerySpanHeight+4)) < screenHeight){
											galSpan[0].style.marginTop = (screenHeight-(totalImageCount*(gallerySpanHeight+9)))/2+"px";
										}
										
										galSpan[currentImageNumber].scrollIntoView(true);
					  		            selectedGalImg[0].classList.add('ctcOverlayThumbGalleryActiveV');
								
										if(imageNumberToLoad-1 >= 0  && imageNumberToLoad+1 < totalImageCount){

											

											 overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryRightNavV'],
															     ctcOverlayViewer.setElemAttr([['title','Next Image'],["onclick","ctcOverlayViewer.loadOverlayImages("+(imageNumberToLoad+1)+");"],['id','ctcGalleryRightNavV']],
															     ctcOverlayViewer.applyStyle([['margin-top',navIconMargin+"px"],['font-size',optimizedFontSize+'px']],document.createElement('span')))));
											 
											 overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryLeftNavV'],
													 			 ctcOverlayViewer.setElemAttr([['title','Previous Image'],["onclick","ctcOverlayViewer.loadOverlayImages("+(imageNumberToLoad-1)+");"],['id','ctcGalleryLeftNavV']],
													 			 ctcOverlayViewer.applyStyle([['margin-top',navIconMargin+"px"],['font-size',optimizedFontSize+'px']],document.createElement('span')))));
											
						  		    
											
										
							  		        document.getElementById("ctcOverlayCountAndCurrentImageV").innerHTML = (imageNumberToLoad+1)+' of '+totalImageCount;
						  		            
							  		        
							  		        
										}
										else if(imageNumberToLoad-1 < 0  && imageNumberToLoad+1 < totalImageCount){
								
											//add element left and right nav
											overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryRightNavV'],
												     ctcOverlayViewer.setElemAttr([['title','Next Image'],["onclick","ctcOverlayViewer.loadOverlayImages("+(imageNumberToLoad+1)+");"],['id','ctcGalleryRightNavV']],
												     ctcOverlayViewer.applyStyle([['margin-top',navIconMargin+"px"],['font-size',optimizedFontSize+'px']],document.createElement('span')))));
						  		            
						  		            
						  		          document.getElementById("ctcOverlayCountAndCurrentImageV").innerHTML = 'Image '+(imageNumberToLoad+1)+' of '+totalImageCount;
						  		          	
										}
										else if (imageNumberToLoad-1 >= 0 && imageNumberToLoad+1 >= totalImageCount){
											
											 overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryLeftNavV'],
										 			 ctcOverlayViewer.setElemAttr([['title','Previous Image'],["onclick","ctcOverlayViewer.loadOverlayImages("+(imageNumberToLoad-1)+");"],['id','ctcGalleryLeftNavV']],
										 			 ctcOverlayViewer.applyStyle([['margin-top',navIconMargin+"px"],['font-size',optimizedFontSize+'px']],document.createElement('span')))));
								
			  		    
											document.getElementById("ctcOverlayCountAndCurrentImageV").innerHTML = 'Image '+(imageNumberToLoad+1)+' of '+totalImageCount;

										}
       	   								
					}
					else{
						let countContainer = document.getElementById("ctcOverlayCountAndCurrentImageV");
						if(countContainer !== null){
								countContainer.parentNode.removeChild(countContainer);
						}
						
						
						
						
						
						//set left margin for image container
						overlayImgContainer.setAttribute('data-v-overlay-img',imageNumberToLoad);	
						
						let containerMarginLeft = Math.round((0.95*screenWidth-optimizedImageWidth)/2-(sideImgGallery.offsetWidth/2.3));
						
						
						ctcOverlayViewer.applyStyle([["background-image","url("+imageToLoad+")"],
													 ["margin-left",containerMarginLeft+"px"],
													 ["margin-top",containerMarginTop+"px"],
													 ["width",optimizedImageWidth+"px"],
													 ["height",optimizedImageHeight+"px"]],overlayImgContainer);
						
						ctcOverlayViewer.applyStyle([["margin-right",((1.15*containerMarginLeft)+sideImgGallery.offsetWidth)+"px"],["margin-top",closeMarginTop+"px"]],closeBtn);
					}
			  		              
									//load image title	
									let imgTitle = overlayImg[0].getAttribute("title");
									let ctcLoadedImgAltTitle = document.getElementById("ctcLoadedImgAltTitleV");
									
									if(imgTitle !== null){
											ctcLoadedImgAltTitle.innerHTML = imgTitle;
											ctcLoadedImgAltTitle.style.opacity = "1"; 
											
									}	
									else{
										
										ctcLoadedImgAltTitle.style.opacity = "0"; 
									}        	   																		  		                	  
									        	   			
	
									
									
															
			  		              
			  		              
	 	});
	 
	 
	  
	 
	 
	 
}//end of function loadoverlay
			
			       	   						
				     	  

			 
			 
		
		
				
	

	  
					  
						
		
	
	//function on arrow keys press
	static onRequiredEventListener(){
		
		var ctcOverlayContainer = document.getElementById("ctcOverlayV");
		
		
		//when screen resizes
		window.addEventListener('resize', function(){
			
			if(ctcOverlayContainer !== null && ctcOverlayContainer.offsetHeight !== 0){
					var overlayImgContainer = document.getElementById("ctcOverlayImageContainerV");
					ctcOverlayViewer.loadOverlayImages((overlayImgContainer.getAttribute("data-v-overlay-img")));
			}
			
		});	
		
		
		//on keypress do stuffs
		window.addEventListener('keydown', function(event) {
			

			if(ctcOverlayContainer.offsetHeight !== 0){
				if (event.code === 'ArrowUp' ||event.code === 'ArrowLeft'){ 
					
					let overlayImgContainer = document.getElementById("ctcOverlayImageContainerV");
					ctcOverlayViewer.loadOverlayImages(parseInt(overlayImgContainer.getAttribute("data-v-overlay-img"))-1);
					event.preventDefault();
				}
				else if (event.code === 'ArrowDown' || event.code == 'ArrowRight'){
					let overlayImgContainer = document.getElementById("ctcOverlayImageContainerV");
					ctcOverlayViewer.loadOverlayImages(parseInt(overlayImgContainer.getAttribute("data-v-overlay-img"))+1);
					event.preventDefault();
				}
				else if (event.code == 'Escape'){ 
					ctcOverlayViewer.closeOverlay();
					event.preventDefault();
				}
			}
			  
		});
		
		
		
	}
	
	
	  
		  
}

	








