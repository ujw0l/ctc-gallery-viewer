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

		constructor(elem) {
			this.addRemoveActiveGallery(this.prepareOverlay(elem));
			this.onRequiredEventListener();
		}

		//function to prrepare overlay 
		prepareOverlay(elem) {

			var overlayDiv = document.getElementById("ctcOverlayV");

			if (overlayDiv === null) {

				let downloadButton = `<a id="ctcOverlayDownloadButtonV" href="javascript:void(0);" onclick= 'ctcOverlayViewer.downloadCurrentImg(this)' title="Download Image" download >&#10515;</a>`;
				let ctcLoadedImgAltTitle = `<div id="ctcLoadedImgAltTitleV" class="ctcLoadedImgAltTitleV"></div>`;
				let imageContainer = `<div id="ctcOverlayImageContainerV" class="ctcOverlayImageContainerV">${downloadButton}${ctcLoadedImgAltTitle}</div>`;
				let ctcOverlayClosebtn = `<span id="ctcOverlayClosebtnV" class="ctcOverlayClosebtnV" title="Close" onclick="ctcOverlayViewer.closeOverlay();" ></span>`;
				let overlayDiv = document.createElement('div');
				overlayDiv.id = "ctcOverlayV";
				overlayDiv.className = "ctcOverlayV";
				overlayDiv.innerHTML = `${ctcOverlayClosebtn}${imageContainer}`;
				document.body.insertBefore(overlayDiv, document.body.firstChild);
			}

			return [elem, document.querySelector('#ctcOverlayV')];
		}



		static downloadCurrentImg(el) {
			let loadedImg = new Image();
			loadedImg.src = el.getAttribute('data-href');
			let fileName = el.getAttribute('data-href').split('/').reverse()[0];
			let imgExt = fileName.split('.').reverse()[0];
			let tempCanv = document.createElement('canvas');
			let downloadLink = document.createElement('a');
			let tempCtx = tempCanv.getContext('2d');
			tempCanv.height = loadedImg.height;
			tempCanv.width = loadedImg.width;
			tempCtx.imageSmoothingEnabled = true;
			tempCtx.imageSmoothingQuality = 'high';
			tempCtx.drawImage(loadedImg, 0, 0);
			downloadLink.href = tempCanv.toDataURL("image/" + imgExt);
			downloadLink.setAttribute('download', fileName);
			downloadLink.click();
		}


		static checkForUnloadedImg(unloadedGalImg) {
			var unloadedGalImg = document.querySelectorAll("#ctcOverlayThumbGalleryContainerV span[data-gal-unloaded-v]");
			if (unloadedGalImg !== null) {
				var errorCount = 0;
				let gallerySpanHeight = 0.045 * window.screen.width;
				ctcOverlayViewer.objectToArray(unloadedGalImg).map((imgSpan) => {
					var thumbImage = new Image();
					let imgUrl = thumbImage.src = imgSpan.getAttribute("data-gal-unloaded-v");
					thumbImage.decode().then(() => {
						var styleRule = [
							['display', 'block'],
							['background', 'url(' + imgUrl + ')'],
							['height', gallerySpanHeight + 'px']
						];
						ctcOverlayViewer.applyStyle(styleRule, imgSpan).removeAttribute('data-gal-unloaded-v');
					}).catch(() => {
						if (errorCount === 0) {
							ctcOverlayV.removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
							var activeElem = document.getElementsByClassName("ctcActiveGalleryV")
							activeElem[0].removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
						}
						errorCount++;
					});
				});
			} else {
				ctcOverlayV.removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
				document.getElementsByClassName("ctcActiveGalleryV").removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
			}

		}

		//function to apply style 
		static applyStyle(rules, elem) {
			let cssRules = '';
			rules.map(x => cssRules += x[0] + ":" + x[1] + ";");
			elem.setAttribute("style", cssRules);
			return elem;
		}

		//function to set attribute of elment 
		static setElemAttr(attr, elem) {
			attr.map(x => elem.setAttribute(x[0], x[1]));
			return elem;
		}


		//function to set attribute of elment 
		static removeElemAttr(attr, elem) {
			attr.map(x => elem.removeAttribute(x));
			return elem;
		}

		//function to add class
		static addElemClass(newClass, elem) {
			newClass.map(x => elem.classList.add(x));
			return elem;
		}

		//function remove class
		static removeStyle(styleRule, elem) {
			styleRule.map(x => elem.style.x[0] = "");
			return elem;
		}

		//function to remove class
		static removeClass(removeClass, elem) {
			removeClass.map(x => elem.classList.remove(x));
			return elem;
		}


		//function remove element
		static removeElem(removeElem) {
			removeElem.map(x => x.parentNode.removeChild(x));
		}
		//function to object into array
		static objectToArray(obj) {
			var newArray = [];
			Object.keys(obj).map(function (x) {
				if (Number.isInteger(parseInt(x))) {
					newArray.push(obj[x]);
				}
			});
			return newArray;
		}

		//function to create open and close of overlay animation	
		static openCloseAnimation(animation, elem) {
			if (animation[0] == 'opacity' && animation[1] > 0) {
				var opacity = 0;
				var margin = 50;
				var dime = 0;

				var intervalId = setInterval(() => {
					if (opacity >= animation[1] && margin <= 0 && dime >= 100) {
						clearInterval(intervalId);
					} else {
						opacity = opacity + 0.1;
						margin = margin - 10;
						dime = dime + 20;
						if (opacity <= animation[1]) {
							elem.style.opacity = opacity;
						}
						if (margin >= 0) {
							elem.style.top = margin + '%';
							elem.style.right = margin + '%';
							elem.style.bottom = margin + '%';
							elem.style.left = margin + '%';
						}
						if (dime <= 100) {
							elem.style.height = dime + '%';
							elem.style.width = dime + '%';
						}
					}
				}, animation[2] / 5, intervalId);

			} else {
				var opacity = animation[1];
				var margin = 0;
				var dime = 100;
				var intervalId = setInterval(() => {
					if (opacity <= animation[1] && margin === 50 && dime === 0) {
						clearInterval(intervalId);
					} else {

						opacity = opacity - 0.1;
						margin = margin + 5;
						dime = dime - 10;
						if (opacity >= animation[1]) {
							elem.style.opacity = opacity;
						}
						elem.style.opacity = animation[1];
						if (dime <= 0) {
							elem.style.height = dime + '%';
							elem.style.width = dime + '%';
						}

						if (margin >= 50) {
							elem.style.top = margin + '%';
							elem.style.right = margin + '%';
							elem.style.bottom = margin + '%';
							elem.style.left = margin + '%';
						}
					}
				}, animation[2] / 5, intervalId);

			}
			return elem;
		}


		//function to add or remove active and inactive gallery		 
		addRemoveActiveGallery(param) {
			var newImageCount = 1;
			if (param[0].classList.contains("ctcActiveGalleryV") === false) {
				var sideGalleryContainer = document.querySelector("#ctcOverlayThumbGalleryContainerV");
				if (sideGalleryContainer !== null) {
					ctcOverlayViewer.removeElem([sideGalleryContainer]);
				}
				var activeGallery = document.getElementsByClassName("ctcActiveGalleryV");
				if (activeGallery.length >= 1) {
					var attr = ['data-v-img-number', 'onclick'];
					var allOldImg = ctcOverlayViewer.objectToArray(activeGallery[0].getElementsByTagName('img'));
					allOldImg.map(x => ctcOverlayViewer.removeElemAttr(attr, x));
					ctcOverlayViewer.removeClass(["ctcActiveGalleryV"], activeGallery[0]);
				}

				ctcOverlayViewer.addElemClass(["ctcActiveGalleryV"], param[0]);
				var newActiveImages = ctcOverlayViewer.objectToArray(param[0].querySelectorAll('img'));
				newImageCount = newActiveImages.length;
				let gallerySpanHeight = Math.round(0.045 * window.screen.width);
				if (newActiveImages.length >= 2) {
					var errorCount = 0;
					var sideGalleryContainer = ctcOverlayViewer.addElemClass(["ctcOverlayThumbGalleryContainerV"], document.createElement('div'));
					sideGalleryContainer.id = "ctcOverlayThumbGalleryContainerV";
					param[1].insertBefore(sideGalleryContainer, param[1].firstChild);

					newActiveImages.map(function (img, i = 0) {
						var thumbImage = new Image();
						thumbImage.src = img.src;
						img.setAttribute('onclick', 'ctcOverlayViewer.loadOverlayImages(' + i + ');');

						let imgNumb = i;
						thumbImage.decode().then(() => {

							let imgSpan = document.createElement('span');
							imgSpan.id = 'ctcGalleryThumbV-' + i;
							imgSpan.title = img.getAttribute("title");
							imgSpan.alt = img.getAttribute("alt");
							imgSpan.setAttribute('onclick', img.getAttribute("onclick"));
							imgSpan.style.display = 'block';
							imgSpan.style.background = 'url(' + img.src + ')';
							imgSpan.style.height = gallerySpanHeight + 'px';
							imgSpan.style.cursor = 'pointer';
							sideGalleryContainer.appendChild(imgSpan);

						}).catch((error) => {

							let imgSpan = document.createElement('span');
							imgSpan.title = img.getAttribute("title");
							imgSpan.alt = img.getAttribute("alt");
							imgSpan.setAttribute('onclick', img.getAttribute("onclick"));
							imgSpan.setAttribute("data-gal-unloaded-v", img.src);

							sideGalleryContainer.appendChild(imgSpan);
							errorCount++;
							if (errorCount === 1) {
								param[0].removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
								param[0].addEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg);
								param[1].removeEventListener("mouseover", ctcOverlayViewer.checkForUnloadedImg, true);
								param[1].addEventListener('mouseover', ctcOverlayViewer.checkForUnloadedImg);
							}
						});
					});
				} else {
					newActiveImages[0].setAttribute('onclick', 'ctcOverlayViewer.loadOverlayImages(' + 0 + ');');
				}
			}
			return param[0];
		}


		//function to run on close button lcik		  
		static closeOverlay() {
			ctcOverlayViewer.applyStyle([
				['opacity', 0],
				['width', 0 + 'px']
			], ctcOverlayViewer.openCloseAnimation(['opacity', 0, 600], ctcOverlayViewer.applyStyle([
				['height', 0 + 'px']
			], document.querySelector("#ctcOverlayV"))));
			document.querySelector("#ctcOverlayImageContainerV").style.backgroundImage = "";
			document.body.style.overflow = 'auto';
		}

		//function to get optimized image size
		static getOptimizedImageSize(screenWidth, screenHeight, imageActualWidth, imageActualHeight) {

			var imageScreenHeightRatio = 0;
			var imageScreenWidthRatio = 0;
			var optimizedImageHeight = 0;
			var optimizedImageWidth = 0;

			if ((imageActualWidth >= screenWidth) && (imageActualHeight >= screenHeight)) {
				if (imageActualWidth >= imageActualHeight) {
					if (imageActualWidth > imageActualHeight) {

						imageScreenWidthRatio = imageActualWidth / screenWidth;
						optimizedImageWidth = (imageActualWidth / imageScreenWidthRatio) - (0.10 * screenWidth);
						optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
						if (optimizedImageHeight >= (0.9 * screenHeight)) {
							imageScreenHeightRatio = screenHeight / imageActualHeight;
							optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (0.10 * screenHeight);
							optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
						}
					} else {

						if (screenWidth > screenHeight) {
							optimizedImageHeight = (0.9 * screenHeight);
							optimizedImageWidth = optimizedImageHeight;

						} else if (screenHeight > screenWidth) {
							optimizedImageWidth = (0.9 * screenWidth);
							optimizedImageHeight = optimizedImageWidth;

						} else {
							imageScreenHeightRatio = screenHeight / imageActualHeight;
							optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (0.1 * screenHeight);
							optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
						}
					}

				} else {
					imageScreenHeightRatio = imageActualHeight / screenHeight;
					optimizedImageHeight = (imageActualHeight / imageScreenHeightRatio) - (0.1 * screenHeight);
					optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
				}

			} else if (imageActualWidth >= screenWidth && imageActualHeight < screenHeight) {
				imageScreenWidthRatio = screenWidth / imageActualWidth;
				optimizedImageWidth = imageActualWidth * imageScreenWidthRatio - (0.1 * screenWidth);
				optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
			} else if (imageActualHeight >= screenHeight && imageActualWidth < screenWidth) {
				imageScreenHeightRatio = screenHeight / imageActualHeight;
				optimizedImageHeight = imageActualHeight * imageScreenHeightRatio - (0.1 * screenHeight);
				optimizedImageWidth = imageActualWidth * (optimizedImageHeight / imageActualHeight);
				optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);
			} else {
				var avilableImageWidth = 0.9 * screenWidth;
				var avilableImageHeight = 0.9 * screenHeight;
				if (imageActualWidth >= avilableImageWidth && imageActualHeight >= avilableImageHeight) {
					var imageAvilableWidthRatio = avilableWidth / imageActualWidth;
					imageAvilableHeightRatio = avilableHeight / imageActualHeight;
					optimizedImageWidth = avilableWidth * imageAvilableWidthRatio;
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
			if (optimizedImageWidth > (0.9 * screenWidth)) {
				optimizedImageWidth = 0.9 * screenWidth;
				optimizedImageHeight = imageActualHeight * (optimizedImageWidth / imageActualWidth);

			}

			return [optimizedImageWidth, optimizedImageHeight];

		}


		//function to optimize font size
		static optFontSize(screenWidth) {

			let optimizedFont = (screenWidth / 1280) * 120;

			if (optimizedFont < 50) {

				return 50;

			} else if (optimizedFont < 70) {

				return 70;
			} else if (optimizedFont > 120) {
				return 120;
			} else {

				return optimizedFont;
			}

		}

		/*
		 * function to load overlay image
		 * 
		 */



		static loadOverlayImages(currentImageNumber) {

			document.body.style.overflow = 'hidden';
			var image = new Image();
			const imageNumberToLoad = parseInt(currentImageNumber);

			const overlayImg = document.querySelectorAll('img[onclick="ctcOverlayViewer.loadOverlayImages(' + currentImageNumber + ');"]');
			const overlay = document.querySelector("#ctcOverlayV");
			const closeBtn = document.querySelector("#ctcOverlayClosebtnV");
			const sideImgGallery = document.querySelector("#ctcOverlayThumbGalleryContainerV");
			const overlayImgContainer = document.querySelector("#ctcOverlayImageContainerV");


			let prevImgNum = overlayImgContainer.getAttribute("data-v-overlay-img");
			let prevGalImg = document.querySelectorAll('span[onclick="ctcOverlayViewer.loadOverlayImages(' + prevImgNum + ');"]');
			let screenWidth = window.screen.width;
			let screenHeight = window.screen.height;
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;
			let activeGallery = document.querySelectorAll(".ctcActiveGalleryV");
			let totalImageCount = activeGallery[0].getElementsByTagName('img').length;

			if (imageNumberToLoad < 0 || totalImageCount < imageNumberToLoad + 1) {
				return;
			} else {

				var imageToLoad = image.src = overlayImg[0].src;
			}

			//special case when window is not in full screen
			//while window is resized little bit

			if (windowWidth !== screenWidth || screenHeight !== windowHeight) {
				screenWidth = windowWidth;
				screenHeight = windowHeight;

			}

			var imgDim = ctcOverlayViewer.getOptimizedImageSize(screenWidth, screenHeight, image.width, image.height);
			let optimizedImageWidth = Math.round(imgDim[0]);
			let optimizedImageHeight = Math.round(imgDim[1]);


			if (overlay.offsetHeight === 0) {

				ctcOverlayViewer.openCloseAnimation(['opacity', 1, 500], ctcOverlayViewer.applyStyle([
					['opacity', 1],
					['top', '0'],
					['left', '0'],
					['right', '0'],
					['bottom', '0']
				], overlay));
			} else {
				ctcOverlayViewer.applyStyle([
					['opacity', 1],
					['top', '0'],
					['left', '0'],
					['right', '0'],
					['bottom', '0'],
					['height', '100%'],
					['width', '100%']
				], overlay);
			}


			//optimize font for screen resolution
			let optimizedFontSize = ctcOverlayViewer.optFontSize(screenWidth);

			document.body.style.overflow = 'hidden';

			ctcOverlayViewer.addElemClass(['overlayContentloadingV'], closeBtn);

			image.addEventListener('load', function () {
				let containerMarginTop = Math.round(screenHeight - optimizedImageHeight) / 2;
				let navIconMargin = Math.round((optimizedImageHeight - (1.6 * optimizedFontSize)) / 2);
				let closeMarginTop = Math.round(containerMarginTop - (closeBtn.offsetHeight / 1.2));
				let galleryRightNav = document.querySelector("#ctcGalleryRightNavV");
				let galleryLeftNav = document.querySelector("#ctcGalleryLeftNavV");


				if (galleryRightNav !== null) {
					ctcOverlayViewer.removeElem([galleryRightNav]);

				}

				if (galleryLeftNav !== null) {
					ctcOverlayViewer.removeElem([galleryLeftNav]);

				}

				//script to load image and margin of close button 
				ctcOverlayViewer.removeClass(['overlayContentloadingV'], closeBtn);

				if (prevGalImg[0] !== undefined) {
					ctcOverlayViewer.removeClass(['ctcOverlayThumbGalleryActiveV'], prevGalImg[0]);
				}

				if (totalImageCount >= 2) {
					var gallerySpanHeight = 0.045 * screenWidth;

					ctcOverlayViewer.objectToArray(sideImgGallery.children).map(x => x.style.height = gallerySpanHeight + "px");

					let imageId = overlayImg[0].getAttribute("onclick").replace("ctcOverlayViewer.loadOverlayImages(", '').replace(");", '');
					var activeGallerySpan = sideImgGallery.querySelector("#ctcGalleryThumbV-" + imageId);


					if (activeGallerySpan !== null) {


						if (activeGallerySpan.getAttribute("data-gal-unloaded-v") !== null) {

							var elemStyle = [
								["display", "block"],
								["background", 'url("' + imageToLoad + '")'],
								["height", gallerySpanHeight + "px"],
								["width", gallerySpanHeight + "px"]
							];
							ctcOverlayViewer.addElemClass(['ctcOverlayThumbGalleryActiveV'],
								ctcOverlayViewer.removeElemAttr(["data-gal-unloaded-v"],
									ctcOverlayViewer.applyStyle(elemStyle, activeGallerySpan[0])));

							if ((totalImageCount * (gallerySpanHeight + 4)) < screenHeight) {
								sideImgGallery.firstChild.style.marginTop = (screenHeight - (totalImageCount * (gallerySpanHeight + 9))) / 2 + "px";
							}

						} else {
							activeGallerySpan.classList.add('ctcOverlayThumbGalleryActiveV');
							if ((totalImageCount * (gallerySpanHeight + 4)) < screenHeight) {
								sideImgGallery.firstChild.style.marginTop = (screenHeight - (totalImageCount * (gallerySpanHeight + 9))) / 2 + "px";
							}

						}


						activeGallerySpan.scrollIntoView({
							behavior: "smooth",
							block: "center"
						});

					}

					let countAndCurrent = document.querySelector("#ctcOverlayCountAndCurrentImageV");
					if (countAndCurrent === null) {
						countAndCurrent = document.createElement('div');
						countAndCurrent.id = "ctcOverlayCountAndCurrentImageV";
						countAndCurrent.className = "ctcOverlayCountAndCurrentImageV";
						overlayImgContainer.appendChild(countAndCurrent);
					}

					overlayImgContainer.setAttribute('data-v-overlay-img', imageNumberToLoad);
					let containerMarginLeft = Math.round((0.955 * screenWidth) - optimizedImageWidth) / 2;
					let style = [
						["background-image", 'url(' + imageToLoad + ')'],
						['margin-left', containerMarginLeft + "px"],
						["margin-top", containerMarginTop + "px"],
						["width", Math.round(optimizedImageWidth) + "px"],
						["height", Math.round(optimizedImageHeight) + "px"]
					];

					ctcOverlayViewer.applyStyle(style, overlayImgContainer);
					if (optimizedFontSize < 51) {
						ctcOverlayViewer.applyStyle([
							["margin-right", containerMarginLeft + "px"],
							['margin-top', closeMarginTop + "px"],
							['font-size', '30px']
						], closeBtn);
						document.querySelector('#ctcOverlayDownloadButtonV').fontSize = '30px';
					} else {
						ctcOverlayViewer.applyStyle([
							["margin-right", containerMarginLeft + "px"],
							['margin-top', closeMarginTop + "px"]
						], closeBtn)

					}

					//first add image counr and current images
					if (imageNumberToLoad - 1 >= 0 && imageNumberToLoad + 1 < totalImageCount) {

						overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryRightNavV'],
							ctcOverlayViewer.setElemAttr([
									['title', 'Next Image'],
									["onclick", "ctcOverlayViewer.loadOverlayImages(" + (imageNumberToLoad + 1) + ");"],
									['id', 'ctcGalleryRightNavV']
								],
								ctcOverlayViewer.applyStyle([
									['margin-top', navIconMargin + "px"],
									['font-size', optimizedFontSize + 'px'],
									['margin-right', document.querySelector('#ctcOverlayDownloadButtonV').offsetWidth + 'px']
								], document.createElement('span')))));

						overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryLeftNavV'],
							ctcOverlayViewer.setElemAttr([
									['title', 'Previous Image'],
									["onclick", "ctcOverlayViewer.loadOverlayImages(" + (imageNumberToLoad - 1) + ");"],
									['id', 'ctcGalleryLeftNavV']
								],
								ctcOverlayViewer.applyStyle([
									['margin-top', navIconMargin + "px"],
									['font-size', optimizedFontSize + 'px']
								], document.createElement('span')))));

						countAndCurrent.innerHTML = (imageNumberToLoad + 1) + ' of ' + totalImageCount;
					} else if (imageNumberToLoad - 1 < 0 && imageNumberToLoad + 1 < totalImageCount) {

						//add element left and right nav
						overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryRightNavV'],
							ctcOverlayViewer.setElemAttr([
									['title', 'Next Image'],
									["onclick", "ctcOverlayViewer.loadOverlayImages(" + (imageNumberToLoad + 1) + ");"],
									['id', 'ctcGalleryRightNavV']
								],
								ctcOverlayViewer.applyStyle([
									['margin-top', navIconMargin + "px"],
									['font-size', optimizedFontSize + 'px'],
									['margin-right', document.querySelector('#ctcOverlayDownloadButtonV').offsetWidth + 'px']
								], document.createElement('span')))));
						countAndCurrent.innerHTML = (imageNumberToLoad + 1) + ' of ' + totalImageCount;
					} else if (imageNumberToLoad - 1 >= 0 && imageNumberToLoad + 1 >= totalImageCount) {
						overlayImgContainer.appendChild(ctcOverlayViewer.addElemClass(['ctcGalleryLeftNavV'],
							ctcOverlayViewer.setElemAttr([
									['title', 'Previous Image'],
									["onclick", "ctcOverlayViewer.loadOverlayImages(" + (imageNumberToLoad - 1) + ");"],
									['id', 'ctcGalleryLeftNavV']
								],
								ctcOverlayViewer.applyStyle([
									['margin-top', navIconMargin + "px"],
									['font-size', optimizedFontSize + 'px']
								], document.createElement('span')))));


						document.querySelector("#ctcOverlayCountAndCurrentImageV").innerHTML = (imageNumberToLoad + 1) + ' of ' + totalImageCount;

					}

				} else {
					let countAndCurrent = document.querySelector("#ctcOverlayCountAndCurrentImageV");
					if (countAndCurrent !== null) {
						countAndCurrent.parentNode.removeChild(countAndCurrent);
					}
					//set left margin for image container
					overlayImgContainer.setAttribute('data-v-overlay-img', imageNumberToLoad);
					let containerMarginLeft = Math.round((screenWidth - optimizedImageWidth) / 2);
					ctcOverlayViewer.applyStyle([
						["background-image", "url(" + imageToLoad + ")"],
						["margin-left", containerMarginLeft + "px"],
						["margin-top", containerMarginTop + "px"],
						["width", optimizedImageWidth + "px"],
						["height", optimizedImageHeight + "px"]
					], overlayImgContainer);
					ctcOverlayViewer.applyStyle([
						["margin-right", containerMarginLeft + "px"],
						["margin-top", closeMarginTop + "px"]
					], closeBtn);
				}

				//load image title	
				let imgTitle = overlayImg[0].getAttribute("title");
				let ctcLoadedImgAltTitle = document.querySelector("#ctcLoadedImgAltTitleV");

				if (imgTitle !== null) {
					ctcLoadedImgAltTitle.innerHTML = imgTitle;
					ctcLoadedImgAltTitle.style.opacity = "1";
				} else {
					ctcLoadedImgAltTitle.style.opacity = "0";
				}
			});


			document.querySelector('#ctcOverlayDownloadButtonV').setAttribute('data-href', imageToLoad);
			sideImgGallery.style.opacity = "1";


		} //end of function loadoverlay

		//function on arrow keys press and resize
		onRequiredEventListener() {

			var ctcOverlayContainer = document.getElementById("ctcOverlayV");
			//when screen resizes
			window.addEventListener('resize', () => {
				if (ctcOverlayContainer !== null && ctcOverlayContainer.offsetHeight !== 0) {
					var overlayImgContainer = document.querySelector("#ctcOverlayImageContainerV");
					ctcOverlayViewer.loadOverlayImages(overlayImgContainer.getAttribute("data-v-overlay-img"));
				}
			});

			//on keypress do stuffs
			window.addEventListener('keydown', (event) => {
				if (ctcOverlayContainer.offsetHeight !== 0) {
					if (event.code === 'ArrowUp' || event.code === 'ArrowLeft') {
						let overlayImgContainer = document.querySelector("#ctcOverlayImageContainerV");
						ctcOverlayViewer.loadOverlayImages(parseInt(overlayImgContainer.getAttribute("data-v-overlay-img")) - 1);
						event.preventDefault();
					} else if (event.code === 'ArrowDown' || event.code == 'ArrowRight') {
						let overlayImgContainer = document.querySelector("#ctcOverlayImageContainerV");
						ctcOverlayViewer.loadOverlayImages(parseInt(overlayImgContainer.getAttribute("data-v-overlay-img")) + 1);
						event.preventDefault();
					} else if (event.code == 'Escape') {
						ctcOverlayViewer.closeOverlay();
						event.preventDefault();
					}
				}
			});

		}

	}