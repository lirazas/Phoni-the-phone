(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animation_lirazasido_atlas_1", frames: [[0,0,1286,410]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.backroundout_of_house = function() {
	this.initialize(ss["animation_lirazasido_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.updatedIphone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.5,1,1).p("AgfhOQACAFACAEQAUA6A5gDQAPgBATgGQgRAHgNAHQhEAiARA0QgmhBgwAGQAUgKANgNQAEgEAEgHQAPgWgCggQgBgFgBgFg");
	this.shape.setTransform(104.475,115.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("ABngaQgDAAgBABAhEAPQgQABgRALQgBAAAAABQAAgBABABQAUgGANgHgAgQhTQAAgEgBgEQgBgFgBgFAASBKQAFAOALAO");
	this.shape_1.setTransform(102.95,115.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(4,1,1).p("AhlAAIDLAA");
	this.shape_2.setTransform(76.475,7.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2.8,1,1).p("AlggzQgmhWAxhMQCpB3ILh3QgvBBAJBJQAHAyAfA1QntgziHBNQg0g2gXgzIKZgYACkDDQAsASAjAAIAKAAQBTgDAbhhQAEgMACgO");
	this.shape_3.setTransform(66.853,143.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(6.5,1,1).p("AHwBCIACgFIAIgZAGqBCIBCAWAEWgaIBUAaIA7ASIAtAPADzgEIAUg7IABgEAEKhNIAeALIDZBNADuAFIC3A9AkBhUIAYA5IADAEAn+gHQACgBADgBIAXgHQACgBACgBIAFgBIDFg/IAOgFAjwAAIi7A4IhBASIgFgQIgPg3AnMAdIAkgLIA2gSIAEAAIBegg");
	this.shape_4.setTransform(70.15,14.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(5.7,1,1).p("AHOkYICCAAIA/AAAHOkYQBLACA5AVQALAEAKAEQBZApAACKQAAB5hOBaQgKALgLALQhLBMhlARQgdAFgfAAQgVAAgTgCQhygNhUhTQhihgAAiJQAAiKBtgcQBVgWBmgMQAdgEAegDQAVgCAUAAQAFgBAEAAgAgggyQAACIhiBhQhiBiiLAAQghAAgdgFQgCAAgCgCQhhgRhLhKQgKgJgIgKQgYgbgQgeQgFgIgEgIQgfhBAAhMQAAhKAfgqQAEgGAFgFQAagcArgLQAFgBAGgCQBFgRBRgLQACAAACgBQAngFAqgEQCJgNBaApQBZApAACKgApTkYIAVAAICNAAIMuAA");
	this.shape_5.setTransform(70.35,54.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(2,1,1).p("ApKp4QAFgeAFgeQANhVAQisIDgAAIASAAINygGQADCzAJBUQABALABAMAGessIACASIAFAwIAFA2Am0qUIAAggIAFhBIADglIABgSIA0AAICCAAIJaAAIA4AAAJvkPQApLBheIKIxdAAQgThigPhjQhNn4Agn3ABzM3QAAArggAeQgfAfguAAQgrAAgggfQgfgeAAgrQAAgkAWgcQAEgFAFgFQAggeArAAQAuAAAfAeQAFAFAFAFQAWAcAAAkgAGqibIAAFJIAAIHIjSAAADNK1IqBAAIAAs+");
	this.shape_6.setTransform(70.6006,95.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666699").s().p("AojO8QgThigPhjQhNn4Agn3IASATQBLBKBhASIAAM+IKBAAIALAAIDSAAIAAoHIAAlJQBlgSBLhLIAVgXQApLBheIKgAhFLtIgJAKQgWAcAAAkQAAArAfAeQAgAfArAAQAuAAAfgfQAggeAAgrQAAgkgWgcIgKgKQgfgeguAAQgrAAggAegAGlrqIBCAVIhCgVIgFgwIAuAPIgugPIgCgSQBIALAHAxIAUAPIAUhHQi5hCgWgWIgDgDQADALgiAJIgegLIAeALQgNADgTgEQgOgCgRgGIAdAMICbBAIg4AAIhUgbIBUAbIpaAAIiCAAIAEgBICXgEIgPgTIgCgEIgZg5IAZA5Igsg3IAOgFIgOAFIgWgTQhFAeAZgYQg2AxhMAbIgFABIgFACIgXAHIgFACIgcAMIAUBHIAWgRIAEAQIBCgTIgFBBIiMAAQANhVAQisIDgAAIAHAJIACgCIADgCIAGgFINygGQADCzAJBUIiCAAIgYAAIgJAAgAHrrqIACgGgADusxIAUg7gAiEuIQgIAIAAALQAAAMAIAHQAIAIALAAQALAAAIgIQAIgHAAgLQAAgMgIgIQgIgHgLAAQgLAAgIAHgACgt0IjKAAgAGlrqgAGgsagAEktvg");
	this.shape_7.setTransform(70.6006,95.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AmNBmIKZgYQAHAyAfA1QntgziHBOQg0g2gXg0gAmCg7QCpB2ILh2QgvBAAJBJIqZAYQgmhWAxhLgAD3hsQAUgJANgPIAIgLQAPgWgCggIgCgKIAEAKQAUA6A6gEQAPgBATgGQgRAHgNAIQhFAiASA0QgnhAgwAFg");
	this.shape_8.setTransform(71.378,128.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F6F6F9").s().p("ACOhsIAAA2IkbCkg");
	this.shape_9.setTransform(17.4,47.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AmtGBIgEgBQhhgRhLhLIgSgTQgXgagRgeIgJgQQgfhBAAhOQAAhJAfgqIAJgKQAagcArgLIALgEQBFgRBRgLIAEgBIBQgJQCKgMBaApQBYApAACIQAACKhhBgQhiBiiMAAQgfAAgegFgAqeCWIEbikIAAg2gAFJFxQhzgNhThTQhihhAAiKQAAiIBtgcQBVgWBmgMQAdgFAdgCIAqgCIAJgBIAYAAQBLACA5AVIAUAIQBZApAACIQAAB7hNBaIgVAWQhMBMhkARQgeAEgfABQgUAAgTgCgAiBlYQgIgHAAgMQAAgKAIgJQAHgHAMAAQALAAAIAHQAHAJABALQgBALgHAHQgIAIgLAAQgMAAgHgIg");
	this.shape_10.setTransform(70.35,43.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CCCCCC").s().p("Ag/OMQgfgegBgrQABglAWgbIAJgKQAggeArgBQAuABAfAeIAKAKQAVAbAAAlQABArggAeQgfAfgugBQgrABgggfgADdLAQBUgDAbhhIAFgaIgFAaQgbBhhUADIgKAAQgjgBgsgRQAsARAjABIqBAAIAAs9IAEABQAeAEAfABQCMgBBihhQBhhhAAiJQAAiKhYgoQhagqiKANIhQAJIgEABIAAghIAEhAIAEglIABgSIA0AAICCAAIJaAAIA4AAIibhAIABgEIgBAEIgdgNQARAHANACQAUAEANgEQAhgIgCgLIADADQAWAVC5BCIgVBIIgUgPIAIgYIgIAYQgGgxhJgLIADASIAEAwIAGA2IgqADQgdACgdAEQhmAMhVAWQhtAdAACJQAACKBiBhQBTBTBzAMQATACAUAAQAfAAAegEIAAFJIgEABIAEgBIAAIGgAmAG4QAXAzA0A3QCIhPHsA0Qgfg2gHgyQgJhIAvhBQoKB3iqh3QgxBLAmBXgAFrE7QgLgOgFgNQAFANALAOgAFbEgQgSg1BFgiQAOgHAQgHQgSAGgQAAQg5AEgVg6IgDgKIgCgIIgCgKIACAKIACAIIABALQACAfgPAWIgIAMQgNAOgTAJQAvgFAnBBIAAAAgADjDxQAUgFAOgIQgOAIgUAFIgBAAIAAAAIABgBIAAABQASgMAQgBQgQABgSAMIAAgBIgBABIAAAAIABAAIAAAAgAGAqpIsuAAgAGmrfIi3g9gAmqrpIC7g3gAGmsOIg7gSgAmmsOIA1gSgAICsVIjYhPgAGwC6gAoasdIAdgLIAFgCIAXgIIAFgBIAEgBQBNgcA2gwQgZAYBFgeIAWATIArA3IADAEIAPATIiXAEIBfggIhfAgIg4ABIglAdIglAdIgQg4IAQA4IgXARgAnYs0IDFg/gAk9upIARAAIgFAFIgDACIgCACg");
	this.shape_11.setTransform(70.05,94.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF0000").s().p("ApDAeICNAAIAAAhQhRALhFARIAJg9gAHJAeICCAAIACAXQg5gVhLgCgAn3geIAlgdIAlgeIA4gBIgEABIg0AAIgBASIgkAMIAkgMIgEAmIhBASgAmuhHg");
	this.shape_12.setTransform(70.85,23.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.8,-1,146.3,193.3);


(lib.Theend = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("The End", "30px 'Times New Roman'");
	this.text.lineHeight = 35;
	this.text.parent = this;
	this.text.setTransform(-1.3,1.85,0.5814,0.5635);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1).to({scaleX:0.6002,scaleY:0.6329,x:-2.2321,y:0.6984},0).wait(1).to({scaleX:0.619,scaleY:0.7022,x:-3.1635,y:-0.453},0).wait(1).to({scaleX:0.6378,scaleY:0.7716,x:-4.0949,y:-1.6043},0).wait(1).to({scaleX:0.6566,scaleY:0.8409,x:-5.0262,y:-2.7557},0).wait(1).to({scaleX:0.6402,scaleY:0.7859,x:-4.3635,y:-1.8418},0).wait(1).to({scaleX:0.6238,scaleY:0.7308,x:-3.7008,y:-0.9279},0).wait(1).to({scaleX:0.6073,scaleY:0.6758,x:-3.038,y:-0.014},0).wait(1).to({scaleX:0.5909,scaleY:0.6207,x:-2.3753,y:0.8999},0).wait(1).to({scaleX:0.5745,scaleY:0.5657,x:-1.7126,y:1.8138},0).wait(1).to({scaleX:0.5921,scaleY:0.6077,x:-2.5786,y:1.1169},0).wait(1).to({scaleX:0.6097,scaleY:0.6496,x:-3.4447,y:0.42},0).wait(1).to({scaleX:0.6273,scaleY:0.6916,x:-4.3107,y:-0.2768},0).wait(1).to({scaleX:0.6449,scaleY:0.7336,x:-5.1767,y:-0.9737},0).wait(1).to({scaleX:0.6626,scaleY:0.7756,x:-6.0428,y:-1.6706},0).wait(1).to({scaleX:0.6522,scaleY:0.7425,x:-5.5763,y:-1.1215},0).wait(1).to({scaleX:0.6418,scaleY:0.7094,x:-5.1099,y:-0.5725},0).wait(1).to({scaleX:0.6314,scaleY:0.6763,x:-4.6435,y:-0.0234},0).wait(1).to({scaleX:0.621,scaleY:0.6433,x:-4.1771,y:0.5256},0).wait(1).to({scaleX:0.6106,scaleY:0.6102,x:-3.7106,y:1.0747},0).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.3,-4.4,71.1,31.4);


(lib.tears = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#71D1F6").s().p("AhnDfQgyhZAAh/QAAh+AyhaQAyhaAagMQAagMABBMQABBMBdCZQBdCYgyBZQgyBahHAAQhFAAgyhag");
	this.shape.setTransform(15.4241,31.3622);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#71D1F6").s().p("AhlDdQgzhZABh8QAAh6AyhaQAyhaAagMQAZgMACBMQABBMBbCYQBaCXgxBUQgxBVhFACIgCAAQhDAAgxhXg");
	this.shape_1.setTransform(14.0853,34.4635);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#71D1F6").s().p("AhjDaQgzhYABh4QABh3AyhaQAyhaAagMQAZgMABBMQACBMBYCXQBYCWgwBQQgwBQhEAEIgGAAQg/AAgwhWg");
	this.shape_2.setTransform(12.7468,37.5438);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#71D1F6").s().p("AhiDXQgzhYACh0QAAh0AyhaQAyhZAagMQAZgNACBNQABBMBWCWQBVCUguBMQgvBLhDAFIgHABQg9AAgwhUg");
	this.shape_3.setTransform(11.4169,40.6507);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#71D1F6").s().p("AhgDVQgzhXAChxQABhxAyhaQAyhZAagMQAZgNABBNQACBMBTCVQBTCUguBGQguBHhBAHIgJAAQg7AAgvhRg");
	this.shape_4.setTransform(10.0784,43.7348);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#71D1F6").s().p("AheDSQgzhXAChtQABhtAyhaQAyhaAagMQAZgMACBMQABBNBRCSQBQCUgsBCQgtBBhAAJIgLABQg5AAguhPg");
	this.shape_5.setTransform(8.7384,46.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#71D1F6").s().p("AhdDQQgyhWAChrQABhpAzhaQAxhaAagMQAagMABBMQABBMBPCTQBOCTgsA8QgrA9g/AKIgOABQg2AAguhMg");
	this.shape_6.setTransform(7.3999,49.9193);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#71D1F6").s().p("AhbDNQgzhVAChnQADhmAyhaQAyhaAagMQAZgMABBMQACBMBLCRQBMCTgrA3QgqA4g+AMQgHACgIAAQg0AAgthLg");
	this.shape_7.setTransform(6.0596,53.0415);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#71D1F6").s().p("AhZDKQgzhUAChkQADhjAyhaQAyhZAagMQAZgNACBNQABBMBJCQQBJCSgpAyQgqA0g8ANQgIACgJAAQgxAAgthJg");
	this.shape_8.setTransform(4.7213,56.1362);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#71D1F6").s().p("AhXDHQg0hUAEhgQAChfAyhaQAyhaAagMQAZgMACBMQABBMBHCQQBGCQgoAuQgoAug7AQQgJACgJAAQgwAAgshHg");
	this.shape_9.setTransform(3.3879,59.2579);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#71D1F6").s().p("AhVDEQg0hTADhdQAEhcAyhaQAyhZAagMQAZgNABBNQABBMBECOQBFCQgnApQgoAqg5ARQgKADgKAAQguAAgrhGg");
	this.shape_10.setTransform(2.0497,62.3631);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#71D1F6").s().p("AhTDCQg1hTAEhZQAEhZAyhaQAyhZAagMQAZgNABBNQACBMBBCNQBCCPgmAkQgnAlg4ATQgKADgKAAQgtAAgqhDg");
	this.shape_11.setTransform(0.7084,65.4892);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#71D1F6").s().p("AhUDCQg0hPAJhXQAIhXAuhcQAthbAagMQAZgNAFBMQAEBLA9CJQA8CKgmAlQgnAlg3AUQgLAEgKAAQgrAAgpg/g");
	this.shape_12.setTransform(2.527,69.1552);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#71D1F6").s().p("AhUDCQg0hLAOhVQANhUAoheQAphdAagMQAZgNAIBLQAIBKA3CFQA3CFgnAmQgnAlg0AUQgMAEgKAAQgpAAgog6g");
	this.shape_13.setTransform(4.3439,72.8406);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#71D1F6").s().p("AhVDCQgzhHAShTQAShSAkhgQAlhfAZgMQAZgNALBKQAMBJAyCBQAxCBgnAmQgnAmgzAUQgMAFgKAAQgoAAgng2g");
	this.shape_14.setTransform(6.1245,76.5101);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#71D1F6").s().p("AhVDCQgzhCAXhRQAWhQAghiQAghhAZgNQAZgMAPBIQAOBJAtB8QAtB9goAmQgoAngxAVQgLAFgLAAQgmAAgmgyg");
	this.shape_15.setTransform(7.9134,80.1774);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#71D1F6").s().p("AhVDCQgyg+AbhPQAbhOAchkQAbhjAZgNQAYgMATBHQARBIAoB4QAnB4gnAnQgpAngvAWQgLAFgNAAQgjAAglgtg");
	this.shape_16.setTransform(9.6746,83.8509);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#71D1F6").s().p("AhVDCQgyg5AhhNQAfhNAXhlQAWhlAagNQAYgNAVBHIA4C6QAiB0goAoQgpAngtAWQgMAGgNAAQgiAAgjgpg");
	this.shape_17.setTransform(11.4494,87.5438);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#71D1F6").s().p("AhWDCQgxg1AlhLQAlhLAShnQAShnAZgNQAYgNAZBGQAYBGAdBvQAeBwgpAoQgpAogsAWQgMAHgOAAQgfAAgjglg");
	this.shape_18.setTransform(13.2052,91.2076);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.6,0,43.5,114.3);


(lib.stink = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AGqpNQCuFGiPFZQjLHrCwBNACHmZQj8FMDyCdQC4C8jgCEAkmqJQmcFGFTFZQHfHqmgBO");
	this.shape.setTransform(58.1366,72.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(4,1,1).p("AAfopQj7GyDxDNQC5D2jgCsAFTtJQiZHBB9HaQCzKjibBqAlIteQCuGsiPHFQjLKECxBl");
	this.shape_1.setTransform(51.9976,65.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(4,1,1).p("AGqpNQCuFGiPFZQjLHrCwBNAkmqJQmcFGFTFZQHfHqmgBOACHmZQj8FMDyCdQC4C8jgCE");
	this.shape_2.setTransform(52.1366,72.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(4,1,1).p("AAfopQj7GyDxDNQC5D2jgCsAlIteQCuGsiPHFQjLKECxBlAFTtJQiZHBB9HaQCzKjibBq");
	this.shape_3.setTransform(51.9976,65.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},5).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-23.3,114.3,176.70000000000002);


(lib.startToPlay = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0033").s().p("AAVCIQglAAgHgLQgIgLAAghIAAiJIgYAAIAAgiIAYAAIAAgtIA3AAIAAAtIAeAAIAAAiIgeAAIAACJQAAAKAGADQAGAEAUAAIAAAmg");
	this.shape.setTransform(-101.025,9.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0033").s().p("AhAByIAAjiIA4AAIAAAIQAKgJAXAAQARAAALAJQAMAJAAAOIAAA/Ig3AAIAAgxQAAgKgKAAQgIAAAAAKIAAC1g");
	this.shape_1.setTransform(-114.025,11.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0033").s().p("AhABQIAAgtQAAgPALgMQALgKAhgRQATgKAAgGIAAghQAAgLgKAAQgKAAAAAbIABAOIAAAPIg1AAIAAguQAAguBBAAQA+AAAAAwIAAC0IgxAAIAAgJQgGAMgdAAQgtAAAAgkgAgJAdIAAApQAAALAJAAQAKAAAAgLIAAg6QgTAFAAAMg");
	this.shape_2.setTransform(-128.525,11.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0033").s().p("AAVCIQglAAgHgLQgIgLAAghIAAiJIgYAAIAAgiIAYAAIAAgtIA3AAIAAAtIAeAAIAAAiIgeAAIAACJQAAAKAGADQAGAEAUAAIAAAmg");
	this.shape_3.setTransform(-141.775,9.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0033").s().p("AhABGIAAgwIA3AAIAAAwQAAALAJAAQAJAAAAgWQAAgdgKgIQgsgWgJgJQgJgJAAgSIAAgfQAAgwBAAAQA/AAAAAuIAAAtIg2AAIABgbQAAgcgLAAQgJAAAAARQAAATAFAJQAEAJAuAXQATANAAAXIAAAiQAAAwhBAAQhAAAAAgug");
	this.shape_4.setTransform(-154.825,11.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.startToPlay, new cjs.Rectangle(-163.9,-15.7,71.10000000000001,45.599999999999994), null);


(lib.shining_bling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AHYARQgLAAgKABQgaABgZACQnSApAYEmQAEAxASA4AgOlmQAFgvgBg3AlQAEQg+gKhJARAnXAQQBKAAA9gMQCTgcBRheQBNhaARiWQAFGFGZgKAgQHNQgLg4gPgxQgchhgmhGQhYijiMgW");
	this.shape.setTransform(47.2,46.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF66").s().p("AiMC+QhXiiiMgXQCSgcBRheQBOhaARiWQAFGFGYgJQnSAoAZEnQgdhhgmhHg");
	this.shape_1.setTransform(50.35,45.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(0.1,1,1).p("AFsBGQgIgCgJgBQgUgDgUgCQlvgogqCPQgHAYACAdABCiqQAOgWALgaAkAgnQB3AFBSgiQBNghAshFQhLC5E8AvAkAgnQgugNg8AAAlrgyQA5AJAyACAhoDbQADgcgBgaQgCgxgPgnQgihXhngd");
	this.shape_2.setTransform(46.825,45.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF33").s().p("AiQBQQgihYhngcQB3AFBSgjQBOggArhFQhMC5E9AvQlwgogpCPQgDgygOgmg");
	this.shape_3.setTransform(49.35,45.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(0.1,1,1).p("AD+kNQAmgfAmgnAjkjxQB8BUB6gKQB3gIB1heQkOEWEnEbAjkjxQglgzhBgnAlNlHQA1AzA0AjAkODYQgfAlgbAzAlFE0QAfgvAYgtQAxhZAXhMQA0ixhShzAFOFTQgIgHgJgGQgSgSgUgQQlmkti/Dh");
	this.shape_4.setTransform(45.85,46.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF33").s().p("AkSDNQAxhZAXhMQA0ixhShyQB8BTB6gJQB3gJB1heQkOEXEnEaQlmkti/Dhg");
	this.shape_5.setTransform(46.275,47.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(0.1,1,1).p("ACZhuQAVgIAXgPAgllHQAdCGAwA1QAvA0BCgWQilBqAyGHQhGm3h6BjQgUAQgWAgAgllHQgDhAgShAQAJBHAMA5gAjEBjQAXgZATgbQAmg0Aag2QA7iAgGiMAAxHIQgCgKgCgKQgDgZgEgY");
	this.shape_6.setTransform(46.825,47.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF33").s().p("AiZASQAmg1Aag2QA7h/gGiNQAdCGAwA1QAvA1BCgXQilBqAyGIQhGm4h6Bkg");
	this.shape_7.setTransform(46.725,50.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(0.1,1,1).p("AFmgOQAwAFA3gBAgDlPQAdCTBdBPQBaBOCVARQmEAFAJGYAljgpQgxADg3ASAnMgQQA4gKAxgPQBhgdBGgmQCihYAXiLQAJg/gRhJAgPHYQgBgLgBgKQgBgagDgaQgonRkmAZAgPnXQAABKAMA+");
	this.shape_8.setTransform(47.275,47.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF33").s().p("AlkhJQBhgdBGglQCihZAXiLQAdCTBdBQQBaBOCVARQmEAFAJGYQgonSkmAZg");
	this.shape_9.setTransform(47.375,50.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.1,1,1).p("ABOkcQAUgzAJhJQgSBAgLA8QgXCOAUByQATBwA8BaQAUAdAYAaAiRjOQAxAXAnACQBbAGAshtAiRjOQgWgVgcgNAjFjtQAbATAZAMAh/GZQADgLACgJQAGgWAFgYQBimoiEh9ACaCuQini9hiFm");
	this.shape_10.setTransform(48.025,46.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF33").s().p("AiVjrQAxAXAnADQBbAFAshtQgXCOAUBzQATBvA8BaQini9hiFmQBimoiEh9g");
	this.shape_11.setTransform(48.425,49.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(0.1,1,1).p("AiFlBQBKBFBCAqQCdBhCEgyQhwBjgWB3QgXB1A8CKQAUAsAcAwAiFlBQgcgogqgoAjQmPQAmArAlAjAmZDlQAKgGAHgGQAWgNAVgQQGAkLiojyADHE2QjHlNldDTAEoijQA8gXA2g0AGYjxQhAAlgwAp");
	this.shape_12.setTransform(46.325,45.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF33").s().p("AlCDCQGAkLiojyQBJBFBCAqQCeBhCEgyQhwBjgXB3QgWB1A8CKQjHlNldDTg");
	this.shape_13.setTransform(43.65,45.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(0.1,1,1).p("ACBisQAJgZgCgdACEjjQgEAdABAaQADA0ASAoQArBbCAAeQiVgFhlAjQhhAig4BIQgRAXgNAcAnHhIQAMABAJABQAZADAaACQHMAqA0iVAhSCxQBfjAmMgyAFBApQA7ANBMgBQhIgKg/gCg");
	this.shape_14.setTransform(46.7125,47.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF33").s().p("AlghDQHMAqA0iVQAEA0ASAoQAqBaCBAeQiWgFhkAkQhiAig3BIQBfjAmNgyg");
	this.shape_15.setTransform(43.575,47.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},2).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_13},{t:this.shape_12}]},2).to({state:[{t:this.shape_15},{t:this.shape_14}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1.1,96.4,96.39999999999999);


(lib.Scene_1_מחיצת_חלון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// מחיצת_חלון
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFEC8D").ss(12.2,1,1).p("AAAdtMAAAg7Z");
	this.shape.setTransform(642.35,211.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},44).wait(91).to({_off:false},0).wait(58));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_חלון_ווילון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// חלון_ווילון
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CC99FF").ss(7.5,1,1).p("EAlgACHQAOAFAOAFEAlyACEQAGAEAHAEQE5DODrlGEguhgDbQDUDwEKhOQAWgHAVgL");
	this.shape.setTransform(645.4,263.5596);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#0C87BD").ss(2,1,1).p("EAmxgRxQBNNOInFMAX1yUQAAAIAAAHQjPRyIWJbQCwDHEBCOQEmCiGQBWEgiFgQ3QGvRAp9I/QjgDKliCLQhBAZhFAXEgwkgP/QIINqlbLdQhGCThnCM");
	this.shape_1.setTransform(647.775,117.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFEC8D").ss(12.2,1,1).p("EAhLAeWMhCVAAAAue+VIeMAA");
	this.shape_2.setTransform(634.65,210.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F6F6F9").s().p("AIKBiIBBCnI/ON6gAWFHNIAACHIzbGWgARyyCIBNDEI50LVg");
	this.shape_3.setTransform(588.9,251.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#71D1F6").s().p("EAk6AiRQj7iEAYkyQAJh3AziSQBJjPA4ipQBHjXAtiYIAOg0QAQg5AVgwQAZg6AfguIADgEIAHgJQiRgxi2hyQmTj8kfj+QjBiqiMiqQg0g/gtg/QldnqBin+QBJl9DXiDQBJgtBagQQClgdDBgOQDcgREBACQHgACF5BRQA0ALAsAZQASAKAQAMQDnCug+JtQgqGng0GOQgXCsgYCoIgcC3IgKBAQmQhVkmiiQkAiNiwjHQmBm0gBrIQAAkUA6k+Qg6E+AAEUQABLIGBG0QCwDHEACNQEmCiGQBVIgJA2QgKBEAdB0IAABHQAWAeAWAqQAjBAAnBeQAdBGAeBXQAgBaAhBqQAcBaAYBRQCSH6gSDTQgWD2maCWQi5BDisAAQjTAAjAhlgEArdAIyQCrgBCPjDIAAAAIADgFIgDAFIAAAAQiPDDirABIAAAAIgBAAQhpgBh0hKIgCgBIAAAAIgHgEIAHAEIAAAAIACABQB0BKBpABIABAAIAAAAgEAy1gQ3QoolNhNtPQBNNPIoFNgEgz6Ag5IgXgNQjAhzgRi5QgNiaC5oMIAlhpQAkhhAphtIAWg4QAhhTAhhKQBxj+BwiPQAwg+AxgpQAOgNAPgKQhOhogwhtIAAgBQBFgXBAgaQFjiLDfjJQF8lXABoNQAAlkium4QCuG4AAFkQgBINl8FXQjfDJljCLQhAAahFAXQgLgYgJgZQgUg2gNg3QgZhrgXh8QgjjAgfjpQg0mCg1l6QgCgQgBgQIgEg3QgEktEsg+QFXhIHqAeIA2ADQGiAZFUAXIA9AEQCkAMBiA1QBrA8AcBvQAGAXACAaIACBxQgCBAgIBKQgYDQhLEeQgPA6gVA4QhTDfjoEDQiSCjjOCxQhJA/hRBBQiLBvh5BOQifBmh+ArIgtAOIACADQAvB9AeC2QALBAAJBGIADAXIAsFvQAtGDAMCJQAGA8gPA5QgfCAiCBwQi/ChkcAgQg+AHg6AAQjTAAiohagEgnMAEvQA7AAA+gRIABgBIAHgCIgHACIgBABQg+ARg7AAIAAAAIAAAAQi+AAigi2QCgC2C+AAIAAAAIAAAAgEgrogIYQhFCShoCNQBoiNBFiSQCLkmAAk9QAAnak4oMQE4IMAAHaQAAE9iLEmgEAwyAAzIAAAAg");
	this.shape_4.setTransform(633.4279,229.4128);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BEBDD9").s().p("EgiVAetIhOAAQAPg5gGg8QgMiJgtmDIgslvIgDgXQgJhGgLhAQgei2gvh9QAVgGAWgLQgWALgVAGIgCgDIAtgOQB+grCfhmQB5hOCLhwQBRhBBJg/QDOiwCSijQDokDBTjfQAVg4APg6QBLkeAYjQQAIhKAChAIgChxIgBgIQgCgagGgXQgbhwhsg7Qhhg2ikgLIg+gEMAmJAAAQjXCDhJF9QhiH+FdHqQAtA/A0A/QCMCqDBCpQEfD/GTD8QC2ByCRAxIgHAJIgNgJIANAJIgDAEIgbgKIAbAKQgfAugZA6QgVAwgQA5IgOA0QgtCYhHDXQg4CphJDPQgzCSgJB3gA+ZYxIfPt6IhAiogAlqWYITZmWIAAiHgAvKDEIZ0rUIhNjEgAOi99I+MAAgEAvRAE7IAJg2IAKhBIAAEvQgdh0AKhEgEgvjAA+IAAABQAwBtBOBpQgPAKgOANQgxApgwA+gEAvCgesIAiAAIAAAWQgQgMgSgKg");
	this.shape_5.setTransform(642.225,208.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFEC8D").ss(12.2,1,1).p("Aue+VIeMAAEAhLAeWMhCVAAA");
	this.shape_6.setTransform(634.65,210.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC99FF").ss(7.5,1,1).p("EAlyACEQAGAEAHAEQE5DODrlGEAlgACHQAOAFAOAFEguhgDbQDUDwEKhOQAWgHAVgL");
	this.shape_7.setTransform(645.4,263.5596);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#0C87BD").ss(2,1,1).p("EAmxgRxQBNNOInFMAX1yUQAAAIAAAHQjPRyIWJbQCwDHEBCOQEmCiGQBWEgwkgP/QIINqlbLdQhGCThnCMEgiFgQ3QGvRAp9I/QjgDKliCLQhBAZhFAX");
	this.shape_8.setTransform(647.775,117.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},44).to({state:[{t:this.shape_4},{t:this.shape_5},{t:this.shape_3},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},91).wait(58));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.ringaffect = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(16,1,1).p("AlehJIAAhuAD4C3IBnh1AgRA4IBohm");
	this.shape.setTransform(113.075,-75.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CCCCCC").ss(16,1,1).p("Alsi7IAJCFAD2C9IB3iHAgVBEIBhiB");
	this.shape_1.setTransform(113.925,-76.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#CCCCCC").ss(16,1,1).p("Al6jBIARCcAD0DCICHiZAgZBOIBaic");
	this.shape_2.setTransform(114.775,-77.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#CCCCCC").ss(16,1,1).p("AmIjGIAZCzADyDHICXirAgdBZIBSi2");
	this.shape_3.setTransform(115.625,-78.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CCCCCC").ss(16,1,1).p("ADvDMICoi9AghBjIBLjRAmWjLIAiDJ");
	this.shape_4.setTransform(116.5,-79.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CCCCCC").ss(16,1,1).p("ADtDRIC4jPAglBuIBEjsAmkjQIAqDf");
	this.shape_5.setTransform(117.35,-80.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CCCCCC").ss(16,1,1).p("ADrDWIDIjgAgpB5IA8kHAmyjVIAzD1");
	this.shape_6.setTransform(118.2,-81.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CCCCCC").ss(16,1,1).p("AgtCEIA1khAnAjaIA6ENADpDbIDYjx");
	this.shape_7.setTransform(119.05,-82.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#CCCCCC").ss(16,1,1).p("AnOjfIBDEjAgxCOIAvk8ADnDgIDokD");
	this.shape_8.setTransform(119.9,-83.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CCCCCC").ss(16,1,1).p("AncjkIBLE6Ag1CZIAnlXADlDlID4kV");
	this.shape_9.setTransform(120.75,-84.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CCCCCC").ss(16,1,1).p("AnqjpIBUFQAg5CkIAglyADiDqIEJkn");
	this.shape_10.setTransform(121.625,-84.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CCCCCC").ss(16,1,1).p("An4juIBcFnAg9CuIAYmMADgDvIEZk4");
	this.shape_11.setTransform(122.475,-85.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CCCCCC").ss(16,1,1).p("AoGj0IBkF+AhBC5IARmnADeD0IEplL");
	this.shape_12.setTransform(123.325,-86.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CCCCCC").ss(16,1,1).p("AmnCfIhtmVAhFDHIAKnCADcD8IE5lc");
	this.shape_13.setTransform(124.175,-88.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.9,-121.2,122.6,72);


(lib.playagain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgCByIAWi0QABgKgKgBQgJgCgBAKIgWC0Ig3gHIAcjgIA2AHIgBAIQAMgIAXADQAPACAMAKQAMAKgCAPIgZDCg");
	this.shape.setTransform(59.3648,65.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgsCHIAcjgIA3AHIgdDggAgOhlIAFgpIA2AHIgFApg");
	this.shape_1.setTransform(49.475,61.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AACBvIABgIQgGALgegEQgtgGAFgjIAGgtQABgPANgJQAMgKAjgNQAUgHAAgGIAFghQABgLgJgBQgLgCgCAbIgCAPIgBAOIg1gHIAGgtQAFgtBBAIQA+AIgGAwIgXCygAgMAZIgFApQgBAKAKABQAIACABgKIAHg6QgSACgCAMg");
	this.shape_2.setTransform(38.6562,63.0081);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgTCKIg5gHIAEghIAtAGQATACADgUQgMAHgXgDQgRgCgKgKQgLgKACgOIAUihQAFglAsAGQAKACASAMIAJgIIAvAGIgcDdQgDAWgKAOQgIAJgYAAIgXgCgAgChcIgSCMQgBALAKABQAJABABgKIARiMQACgKgKgBIgCgBQgGAAgCAJg");
	this.shape_3.setTransform(24.6656,63.1399);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAYCLIgBhLIgagEIgUBJIg8gHIBQkQIBNAKIAKEbgAAGAWIARACIAChTg");
	this.shape_4.setTransform(7.325,56.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgqCMIgngFIAEgeQAWADAFgCQAGgBABgLQABgKgLhlIgOh6IA3AHIAIB6IAhh1IA1AHIhHDaQgKAhgLAGQgJADgMAAIgLAAg");
	this.shape_5.setTransform(-14.075,57.7391);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AACBvIABgIQgGALgegEQgtgGAFgjIAGgtQABgPANgJQAMgKAjgNQAUgHAAgGIAFghQABgLgJgBQgLgCgCAbIgCAPIgBAOIg1gHIAGgtQAFgtBBAIQA+AIgGAwIgXCygAgMAZIgFApQgBAKAKABQAIACABgKIAHg6QgSACgCAMg");
	this.shape_6.setTransform(-29.6938,54.3081);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgsCIIAjkVIA2AHIgjEUg");
	this.shape_7.setTransform(-39.825,50.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhTCHIAjkVIA/AIQAmAFARAMQASAMgEAeIgKBMQgDAcgRAJQgQAJgxgHIgNBngAgGABQATACACgNIAJhDQABgPgUgCg");
	this.shape_8.setTransform(-50.9128,48.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0033").s().p("Aq1O9QgPgVgOgWQgjg2gag1IgGgOIgGgLQgYg7gQhBQgQhDgJhLIAEiTIgCAAIgCAAIi6gOIgFAAIihgRIgDAAIgBAAIgBgBIgBABIgCgBIAAABIgCgBIgBAAIgDAAIgggDIgHgBIgGgBIAAABIgBgBIgEAAIgCABIgIgCIgDAAIgdgCIgJgCQgIgBgLgQQgKgQgOgbIgEgKIgCgFIgoiDIgCgLQgGgegEghIAAgEQgDgYgCgaIAAgBQgBgYABgXIABgMIABgHIABgHIABgEIABgJIAAgHIAGgbQANhCAdg5QANgaAPgVIAJgNQA1hGBNgYQAbhvA3hVQAQgaASgXQAPgTAQgRQAXgZAbgWIAKgHQAjgcAlgYIAJgGQA5gmA+gfQDOhkEMgdQEdggFpBfQA9AQBAATIBJAXQACACAEAAQBKAZBNAeIAnAPQBaAkBMAsIAzAgQCmBtBXCSQAgATAfAbIAfAeQBVBZApB6IABACIAAABIABADIAOBJIACAPIAHAmIAIA3QAAAJACAIIAAAMIABANIABACIgBAFQgBAigDAJIAAARIgBAAIAAABIgBAIQgLBKghBBIgCAHIgBACQgWAlghAiQgGAGgHAEQgxAig8ghIk/jNIgMgJQgkgdgYgcQgigmgOgoIgUiDQgBgaADgaQgngggogeQgzgmgzggQihhiiugtIlQgoQgPgCh8ARIhJAYQlUBwhmBeQgXAVgVAYIgFAFIACAGIAZAxIAeBRQAcB8gTBoIgRA1QgPAngTApIAegPQAVgKASgzIAHgTQA+iCg8iBQgcg+gng3QATgTAUgRQB0hkCcggQCbghBQgGQBQgHAaABIArABIEIANIAMABIAPABIASACIAgAHIBsAdQBcAaCBBWQAyAiAxAoQAeAYAdAaIAQCEQAEAdAHAeQALAtATAXQALAPAUAVQBYBqgVCgIgCBzIgCAcQgLB2giBgIgKAaQgZA9gmA9IgBACg");
	this.shape_9.setTransform(-0.1583,16.3313);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhZhiIA3gMIACAHQAIgLAXgGQANgDAPAFQAOAEAEAQIAtC+Ig3ANIgoiwQgDgLgJACQgJADACAKIApCwIg2ANg");
	this.shape_10.setTransform(49.375,45.7029);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AguhNIA1gNIA0DcIg2ANgAg6iBIA2gNIAIAoIg1ANg");
	this.shape_11.setTransform(38.625,45.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgxBcIgLgtQgDgOAIgOQAIgNAdgYQAQgOgBgGIgIggQgDgLgJACQgLADAHAaIAEAOIAEAOIg1AMIgKgsQgLgsBBgQQA8gOALAvIApCuIgwAMIgCgJQgDANgdAHQgJACgJAAQgbAAgGgagAgHAdIAJAoQACAKAJgCQAJgCgCgLIgNg4QgRAJADAMg");
	this.shape_12.setTransform(29.502,50.4355);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgbB0IArgLQATgEgFgUQgJAKgWAGQgQADgNgFQgOgGgDgOIgmidQgIgkArgKQAMgDAVAFIAFgKIAugLIAzDZQAFAVgFAQQgFARgtAKIg3AOgAgVhjQgKACADAKIAfCKQADAKAJgDQAJgCgCgKIggiJQgCgJgHAAIgCABg");
	this.shape_13.setTransform(15.3996,55.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhbiEIBLgSIBsEFIg7APIgbhHIgZAGIAGBMIg7ANgAgYAWIARgEIgchOg");
	this.shape_14.setTransform(1.2,55.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgCB3QAUgFAFgDQAFgEgDgKQgCgKgthbIg4htIA2gNIAxBvIgJh4IA1gNIAJDlQACAjgJAJQgKAKgTAFIgmAJg");
	this.shape_15.setTransform(-25.5893,64.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgxBcIgLgtQgDgOAIgOQAIgNAdgYQAQgOgBgGIgIggQgDgLgJACQgLADAHAaIAEAOIAEAOIg1AMIgKgsQgLgsBBgQQA8gOALAvIApCuIgwAMIgCgJQgDANgdAHQgJACgJAAQgbAAgGgagAgHAdIAJAoQACAKAJgCQAJgCgCgLIgNg4QgRAJADAMg");
	this.shape_16.setTransform(-37.548,66.2355);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag6iBIA2gNIA/EQIg2ANg");
	this.shape_17.setTransform(-49.05,65.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhTh9IA/gPQAkgJAVAFQAUAFAHAdIASBMQAGAbgMAOQgNAOgwALIAXBkIg5AOgAgQhkIAVBeQAUgFgDgOIgPhBQgDgLgLAAIgJABg");
	this.shape_18.setTransform(-61.2888,68.9574);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF0033").s().p("As/MbQgNgXgKgZQgZg6gRg4QgDgIgBgIIgEgLQgOg+gFhDQgGhFADhLIAbiRIgCAAIgCgBIi1grIgEAAIidgrIgCgBIgBABIgBgCIgBAAIgCAAIAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAIgBAAIgDgBIgfgIIgHgCIgGgCIAAABIgBgBIgEAAIgCAAIgIgDQAAAAAAAAQgBgBAAAAQAAAAgBAAQgBAAAAAAIgcgGIgIgEQgIgCgIgSQgIgRgJgdQgCgFAAgEIgBgFIgTiIIgBgLQAAgeABgiIABgEQAAgYACgbIAAgBQAEgYAFgXIACgLIADgHIABgHIACgDIADgKIABgHIAKgZQAXg/Amg0QARgXATgTIALgLQA/g9BQgLQAthpBDhMQAUgWAWgUQARgQATgOQAbgVAdgSQAHgCAFgDQAmgXApgRIAKgFQA+gcBCgVQDchBEOAOQEcAPFWCXQA6AaA9AdIBEAiQACACADACQBFAjBIArIAkAVQBSAyBEA4QAYATAWAVQCSCGA/CdQAdAZAaAfIAaAiQBFBmAVB+IAAACIABABIAAADIABBLIABAOIAAAnIgBA5QgBAKABAHIgCAMIgBANIAAACIgCAFQgGAhgEAIIgDARIgBABIAAAAIgCAIQgYBIgqA6IgEAHIgBABQgcAhglAcQgIAGgHADQg2AZg2gqIkaj9IgKgMQgfghgTggQgbgrgIgqIACiEQADgaAHgZQghgngjgkQgsgtgugoQiOh6ilhJIlFhdQgPgFh9gDIhNAMQlhA4hzBNQgbARgYAUIgGAEIABAGIARA0IARBVQAHCBgjBiIgaAyQgUAjgaAmIAggKQAXgHAZgvIALgRQBSh2gniKQgShCgeg8QAWgQAXgOQCDhPCegHQCfgHBQAGQBQAHAZAEIAqAIIEDA3IAMADIAPAEIARAEIAeANIBmAvQBXAnByBqQAsAqApAvQAbAcAYAdIgGCGQgBAeACAeQAEAuAPAaQAJARAQAXQBFB4guCaIgUBxIgHAcQgeBygwBaIgOAYQgjA3gvA3IgCACg");
	this.shape_19.setTransform(-0.7687,20.1502);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF6633").s().p("AhZhiIA3gMIACAHQAIgLAXgGQANgDAPAFQAOAEAEAQIAtC+Ig3ANIgoiwQgDgLgJACQgJADACAKIApCwIg2ANg");
	this.shape_20.setTransform(49.375,45.7029);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF6633").s().p("AguhNIA1gNIA0DcIg2ANgAg6iBIA2gNIAIAoIg1ANg");
	this.shape_21.setTransform(38.625,45.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF6633").s().p("AgxBcIgLgtQgDgOAIgOQAIgNAdgYQAQgOgBgGIgIggQgDgLgJACQgLADAHAaIAEAOIAEAOIg1AMIgKgsQgLgsBBgQQA8gOALAvIApCuIgwAMIgCgJQgDANgdAHQgJACgJAAQgbAAgGgagAgHAdIAJAoQACAKAJgCQAJgCgCgLIgNg4QgRAJADAMg");
	this.shape_22.setTransform(29.502,50.4355);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF6633").s().p("AgbB0IArgLQATgEgFgUQgJAKgWAGQgQADgNgFQgOgGgDgOIgmidQgIgkArgKQAMgDAVAFIAFgKIAugLIAzDZQAFAVgFAQQgFARgtAKIg3AOgAgVhjQgKACADAKIAfCKQADAKAJgDQAJgCgCgKIggiJQgCgJgHAAIgCABg");
	this.shape_23.setTransform(15.3996,55.725);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF6633").s().p("AhbiEIBLgSIBsEFIg7APIgbhHIgZAGIAGBMIg7ANgAgYAWIARgEIgchOg");
	this.shape_24.setTransform(1.2,55.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF6633").s().p("AgCB3QAUgFAFgDQAFgEgDgKQgCgKgthbIg4htIA2gNIAxBvIgJh4IA1gNIAJDlQACAjgJAJQgKAKgTAFIgmAJg");
	this.shape_25.setTransform(-25.5893,64.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF6633").s().p("AgxBcIgLgtQgDgOAIgOQAIgNAdgYQAQgOgBgGIgIggQgDgLgJACQgLADAHAaIAEAOIAEAOIg1AMIgKgsQgLgsBBgQQA8gOALAvIApCuIgwAMIgCgJQgDANgdAHQgJACgJAAQgbAAgGgagAgHAdIAJAoQACAKAJgCQAJgCgCgLIgNg4QgRAJADAMg");
	this.shape_26.setTransform(-37.548,66.2355);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FF6633").s().p("Ag6iBIA2gNIA/EQIg2ANg");
	this.shape_27.setTransform(-49.05,65.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FF6633").s().p("AhTh9IA/gPQAkgJAVAFQAUAFAHAdIASBMQAGAbgMAOQgNAOgwALIAXBkIg5AOgAgQhkIAVBeQAUgFgDgOIgPhBQgDgLgLAAIgJABg");
	this.shape_28.setTransform(-61.2888,68.9574);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_19},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.6,-87.6,286.9,215.6);


(lib.pink_heart = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF66FF").s().p("AnrB4QlGpXFEijQFEijBDEBQBDECCgkTQCikTECEPQEDEPlcGrQldGsg9BEQg8BEhMANIgDAAQhQAAk+pKg");
	this.shape.setTransform(82.0775,91.34);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF66FF").s().p("An3B7QlMpnFLinQFLioBFEJQBEEICkkaQClkaEJEWQEIEWlkG3QllG3g+BGQg9BFhOAOIgDAAQhTAAlFpag");
	this.shape_1.setTransform(82.0811,91.3277);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF66FF").s().p("AoCB+QlUp2FTisQFSisBHEPQBFEPCnkhQCqkiEOEdQEPEelsHCQltHDhABHQg+BHhQAPIgDAAQhUAAlNpqg");
	this.shape_2.setTransform(82.0847,91.3261);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF66FF").s().p("AoNCBQlcqGFaiwQFaixBIEWQBHEWCrkpQCtkoEVEkQEUEll0HNQl1HOhBBKQhABJhRAOIgEABQhVAAlUp6g");
	this.shape_3.setTransform(82.0715,91.3138);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF66FF").s().p("AoYCEQlkqWFii0QFhi1BKEdQBIEcCvkwQCxkvEaErQEaEsl8HZQl8HZhDBLQhBBLhTAPIgEABQhXAAlbqKg");
	this.shape_4.setTransform(82.0688,91.3254);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF66FF").s().p("AokCHQlqqmFpi4QFoi6BLEkQBLEkCyk4QC0k3EhEzQEgEzmEHkQmFHlhEBNQhCBNhVAPIgEAAQhZAAljqZg");
	this.shape_5.setTransform(82.0786,91.313);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF66FF").s().p("AovCLQlyq2Fwi+QFxi9BMEqQBMErC2k/QC4k+EmE6QEmE6mMHvQmNHxhEBPQhFBOhWAQIgEAAQhbAAlqqog");
	this.shape_6.setTransform(82.0759,91.3244);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF66FF").s().p("Ao6COQl6rGF4jCQF4jBBOExQBNExC6lGQC8lGEsFBQEsFCmUH7QmVH7hGBRQhGBQhYAQIgEABQhdAAlxq4g");
	this.shape_7.setTransform(82.0858,91.3121);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF66FF").s().p("ApFCRQmCrWGAjGQF/jGBPE4QBPE4C+lNQC/lNEyFIQEyFJmcIGQmdIHhHBTQhHBShaAQIgEABQhfAAl4rIg");
	this.shape_8.setTransform(82.083,91.3237);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF66FF").s().p("ApRCUQmIrmGGjKQGHjKBRE/QBQE+DClUQDDlUE4FPQE3FQmkISQmkIShJBUQhJBUhcARIgEAAQhgAAmArXg");
	this.shape_9.setTransform(82.0699,91.3113);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF66FF").s().p("ApcCXQmQr1GOjPQGOjPBTFGQBSFGDElcQDHlcE+FXQE+FXmsIdQmtIehKBWQhKBVheASIgEAAQhiAAmHrng");
	this.shape_10.setTransform(82.0734,91.3098);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF66FF").s().p("ApnCbQmYsGGWjTQGVjTBUFNQBUFMDIljQDLljFEFeQFDFem0IpQm0IphMBYQhLBXhgASIgEAAQhkAAmOr2g");
	this.shape_11.setTransform(82.077,91.2975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF66FF").s().p("ApVCVQmMrrGKjMQGKjLBRFBQBRFBDDlXQDElXE7FSQE6FSmnIWQmoIWhKBVQhJBVhcARIgEAAQhiAAmCrdg");
	this.shape_12.setTransform(82.0764,91.295);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF66FF").s().p("ApDCQQmArRF+jEQF+jFBPE2QBPE2C8lLQC/lLExFGQExFGmbIDQmbIEhHBSQhHBShaAQIgEAAQheAAl3rDg");
	this.shape_13.setTransform(82.0944,91.29);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF66FF").s().p("AoxCLQl0q3Fyi+QFyi9BMEqQBNErC2k/QC5k/EoE7QEnE6mOHwQmOHxhFBPQhFBPhXAQIgDAAQhcAAlrqpg");
	this.shape_14.setTransform(82.1083,91.3115);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF66FF").s().p("AofCGQloqdFmi2QFmi3BKEgQBKEfCxkzQCzkyEeEuQEdEvmBHdQmBHehDBMQhCBMhVAPIgDAAQhZAAlfqPg");
	this.shape_15.setTransform(82.1032,91.2971);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF66FF").s().p("AoNCBQlcqDFaivQFaiwBIEVQBHEUCrknQCtknEVEjQEUEjl0HKQl1HMhBBJQhABJhRAOIgEAAQhVAAlUp1g");
	this.shape_16.setTransform(82.1212,91.2921);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF66FF").s().p("An7B7QlQpoFOioQFPioBFEJQBFEJClkbQCnkbELEXQELEXloG4QloG5g+BGQg+BFhPAOIgDAAQhTAAlIpcg");
	this.shape_17.setTransform(82.1207,91.2897);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF66FF").s().p("AoHB/QlYp6FWisQFXiuBGERQBHEQCpkjQCrkiEREeQEREflwHFQlwHFhABIQhABHhQAPIgDAAQhVAAlQptg");
	this.shape_18.setTransform(82.1197,91.2904);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF66FF").s().p("AoTCCQlgqLFeixQFfiyBIEYQBIEYCtkrQCvkrEYEnQEXEml4HRQl5HShCBKQhBBKhSAOIgEAAQhWABlYp/g");
	this.shape_19.setTransform(82.1355,91.2818);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF66FF").s().p("AofCFQloqcFmi2QFmi3BKEfQBKEgCxkzQCzkzEeEuQEeEvmBHeQmCHehDBMQhCBLhUAQIgEAAQhYAAlgqQg");
	this.shape_20.setTransform(82.1263,91.3065);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF66FF").s().p("AorCJQlwquFui7QFui7BMEnQBLEnC1k7QC3k7EkE2QElE3mKHqQmKHrhFBOQhEBNhVAQIgEAAQhbAAlnqhg");
	this.shape_21.setTransform(82.1421,91.2979);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF66FF").s().p("Ao3CNQl4q/F2jAQF2jBBNEvQBOEuC4lDQC7lCErE+QEqE+mSH3QmSH3hGBQQhGBPhYAQIgEAAQhcAAlvqxg");
	this.shape_22.setTransform(82.1348,91.2986);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF66FF").s().p("ApECQQmArQF+jFQF/jFBOE2QBPE2C9lLQC/lLExFGQExFGmbIDQmbIEhIBSQhHBShZAQIgEAAQhfAAl3rDg");
	this.shape_23.setTransform(82.1506,91.29);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF66FF").s().p("ApPCTQmIriGGjJQGGjKBQE9QBRE+DBlTQDClTE3FOQE4FOmjIQQmkIQhJBUQhJBThbARIgEABQhhAAl+rVg");
	this.shape_24.setTransform(82.1414,91.3147);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF66FF").s().p("ApcCXQmQr0GOjOQGOjPBSFFQBTFFDElbQDHlaE9FVQE+FWmrIcQmtIdhKBWQhKBWheARIgEAAQhiAAmHrlg");
	this.shape_25.setTransform(82.1572,91.3061);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF66FF").s().p("ApoCaQmYsFGWjTQGWjTBUFMQBUFNDIljQDLljFEFeQFEFem0IoQm1IqhMBYQhMBXhfARIgEABQhkAAmPr3g");
	this.shape_26.setTransform(82.1563,91.3068);
	this.shape_26._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_26}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(26).to({_off:false},0).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,164.3,182.6);


(lib.phone_sad_mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AvdGDQhQh7BBiiIANgeQA6h8COiVQDFjPDshSIhNEYIGegzIgNAvIAYAGIABAAIFIBYIBalTQDXBYCpC1QCICRA7B1IAOAeQA6CGgvBjQhcDBk3jLQkpjCkQgdIgcgDQg2gEg3AHQjmAcjmDYQibCRhyAAQhhAAhDhog");
	this.shape.setTransform(103.4124,49.0675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ah9GjQgIhFhtgpQhtgqiZBXQiZBYjHhAQjHhABBijIANgdQA6h9COiUQDFjPDshSIhNEYIGegzIgNAuIAXAHIABAAIFJBYIBalUQDXBZCpC0QCICQA7B3QAIAPgEAvQgDAwilBLQilBKithaQithZjfCPQiVBgg0AAQgZAAgDgWg");
	this.shape_1.setTransform(102.0388,44.1308);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ArSGTQkyhqAPhRQAQhSAHgPQA6h8COiVQDFjPDshSIhNEYIGegzIgNAvIAYAGIABAAIFIBYIBalTQDdBYCABSQB/BSAdAXQAdAYA4C1QA5C2isA8QisA9h9idQh9icjZAsQjaAtgOgBQg2gEg3AHQjmAcgtClQgcBmh9AAQhQAAh3gpg");
	this.shape_2.setTransform(103.3072,44.3774);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape}]},2).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,206.8,98.2);


(lib.phone_happy_mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AgTBYIAJivIAeABg");
	this.shape.setTransform(90.875,52.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AAAAAIFKANAlJgMIEqAM");
	this.shape_1.setTransform(92.925,44.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AADBPIgBAAIgTgFIAKgmIljAqIBCjlIEpAMIgICvIAoiuIFKAMIhNEWg");
	this.shape_2.setTransform(89.6,57.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AmqKCQiMg4iFhcQgngbgjgfQhWhNg/hmQhZiRiIjlQhlirAgiiQALg5Acg3QBqjXD4CzQA5AoA2AjQC2B2CUAyIhDDlIFkgpIgKAmIAUAFIABAAIEZBIIBOkWQGogDBzgiQBygiCegRQCegSgZB9QgZB9htEZQgQAogRAlQhhDXh1BBQiKBMjEA9QjFA8kqAYQhZAIhLAAQivAAhigngAhUlYIAgABIgpCwg");
	this.shape_3.setTransform(98.211,78.4211);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AC9iEIgLAoIgKAoIg5DFIAAABIgUgFIkXhMIAojS");
	this.shape_4.setTransform(107.6625,58);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(0.1,1,1).p("ACiBLIApiyIAAAAIghgBIgICzIlsAqIBEjp");
	this.shape_5.setTransform(72.5,53.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AC7CAIBWASIkXhMIAojTIAAAAIFSANIAAABIgLAnIgSA+IAHgVIg5DFIAAABIgUgFIAUAFIgBAEgAkviaIEwAMIgHCzIltArg");
	this.shape_6.setTransform(89.4,57.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AlYKoQg2gLgpgQQhkgohhg6QgqgZgogdQgogcgkggQg0gvgsg4QgdgmgagqQhJh2hnisIg2hcQhmivAjilQAMg7Adg3QBUilCqBHQAzAWA7AqQA6ApA3AjQB8BPBsAxQA0AbAxAOIhEDqIFtgqIAJi0IAgABIAAAAIgpCzIApizIgoDTIEXBNIhXgSIBpAbIACgFIAAAAIA5jHIAahRQEBAAB8gNQBIgIAggLQA6gWB+gRQAygHA6gGQBqgLAtAcQAtAbgNBBQgVBmhLDJIgqBvQgRApgRAlQg9CDhEBMQgsAygxAbQhjA2iAAvQg3AUg8ASQijAxjmAZQg3AHg6AEQhZAHhMAAQhrAAhPgOg");
	this.shape_7.setTransform(98.1624,78.4572);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(0.1,1,1).p("AClBMIAri1IgigCIgJC3Il0AsIAghvIADgJQASg7ARg8");
	this.shape_8.setTransform(71.9,53.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AEXCTIkOhIIgDgBIgDgBIgEgBIAojSIAAgBIFSANIAAAAIAAABIgCAGQgPAlgGAkIgGAWIAFgPIACgGIgCAIIgLAnIgiB0IgKAiIAAABgAlYgXIADgKIAjh3IE3AMIgIC3Il1Arg");
	this.shape_9.setTransform(88.825,56.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AlkK0Qg2gLgrgRQhmgphjg8QgqgZgqgeQgogcgkghQg1gwgtg6QgegngagrQhLh4hqiwIg3heQhmizAmipIAAAAQANg8Aeg3QBYikCtBLQA1AWA8ArQA7AqA4AkQB/BQBuAxQAzAdAxALIgjB2IgCAIIgBADIggBuIF1grIAJi4IAhABIgqC3IAqi3IABAAIAAAAIgpDTIAFACIADABIADAAIEMBJIAUAFQAFgOAFgUIAhh1IAKgcIACgMIACgIIgCAHIABgHQAGgkAPglIACgGIAAgBIAHAAQETgBB8gOQBJgHAigMQA8gWCAgSQAzgHA8gGQBsgJAqAfQAsAcgOBCQgVBphNDNQgUA1gYA8QgRApgRAnQg/CGhGBLQgvAzgyAbQhlA3iDAvQg4AUg+ATQinAyjrAZQg4AGg7AFQhXAHhLAAQhyAAhTgQg");
	this.shape_10.setTransform(98.1301,78.5093);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(0.1,1,1).p("ACyBPIAJgtQANhDANhDIgjAAIAACzImGArIAghuIACgHIAlh+");
	this.shape_11.setTransform(71.4,52.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AEcCXIgagHIhLgUIipguIgDgBIgCAAIgFgCIAFgaIAJgxIAaiHIAAAAIFSAMIAAACQgOAegLA5IgDANIACgJIAFgMIgFARIgIAVQgZBIgUBYIAAAAgAldgVIACgHIAlh/IE/AUIAAC0ImGAqg");
	this.shape_12.setTransform(88.3,56.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AlwLBQg3gMgsgRQhogrhlg8QgrgbgqgeQgpgdglgiQg2gxgug7QgegogbgsQhNh7hsizIg3hgQhoi3ApitQAPg9Afg4QBaijCzBOQA1AYA9ArQA8ArA6AkQCCBSBxAyQAwAeAxAJIglB/IgCAGIAAABIggBtIGGgqIAAi1IAkAAIgaCIIgKAtIAAAEIgFAaIAFACIADAAIADABICoAuIBLAUIAaAHIATAFIAAAAQAThYAahJIAIgVIAEgRIgEAMIABgEQALg5AOgeQEtgJB9gOQBJgJAkgMQA/gWCCgRQA1gIA7gFQBvgJApAjQAqAdgOBDQgXBshODQIgtBzQgSArgSAnQhBCIhJBMQgvAzg0AcQhoA3iGAwQg5AVg/ATQirAyjwAZQg5AGg7AFQhYAGhLAAQh3AAhWgQg");
	this.shape_13.setTransform(98.1082,78.5276);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(0.1,1,1).p("AC3BgIAjjIIguAAIALDIIgLAWQABALADgGQAAgBABgBQACgHAEgSImQAbIAfhpIAGgTIAkh7");
	this.shape_14.setTransform(70.8,52.3602);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAEBbIgEgBIgOgFIABgCQADgHADgSImQAbIAfhpIAFgUIAlh7IE9AVIAKDIIAijIIF9AGQgWAvgQAwIgPAtQgOAwgUA1IgSAtIgBAEIgEAKg");
	this.shape_15.setTransform(89.85,56.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Al7LNQg5gMgsgSQhrgshmg+QgtgbgrgfQgpgegmgiQg3gzgug8QgegogdgtQhOh+hui3Ig5hiQhoi7AsixQAPg/Ahg3QBeijC2BTQA3AZA9ArQA+ArA8AmQCEBSDSBZIgkB7IgFARIgBADIgeBpIGQgbIgLAWIACAHIAAAAIAAAAIACgCIAAAAIACADIANADIAEABIEkBIIABAAIAEgKIABgDIASgtQAUg1AOgwIAOguQARgxAWguQEXgCB9gPQBJgJAngMQBBgWCEgSQA2gHA8gFQBygJAmAnQApAegOBFQgZBuhPDTIguB2QgTAsgSAnQhDCLhMBNQgwAzg2AcQhqA4iJAxQg6AVhBATQivAyj0AaQg7AGg8AFQhWAGhJAAQh/AAhZgSgAhiiIIgCgHIALgWQgEASgCAHIgBACIgCACIAAAAIAAAAgAhZilIgLjJIAuAAIgjDJIAAAAg");
	this.shape_16.setTransform(98.0876,78.5635);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(0.1,1,1).p("ACwBRIAtjBIgjgBIgKDCIhnAMABIBdIklAiIAfhpIAEgPIAniF");
	this.shape_17.setTransform(70.15,51.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAdBdIgCAAIgugLIAMgqIhnAMIgCAAIklAiIAehnIAFgPIAniHIFMANIgIDCIAsjAIFxANIgdBnIAAABIg6DLg");
	this.shape_18.setTransform(88.6,55.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AmHLZQg6gMgtgTQhtgthog/QgugcgrggQgrgegmgjQg4g0gvg+QgfgpgcguQhRiBhwi6QgdgxgdgzQhpi/Avi0QARhBAig3QBgiiC7BWQA4AaA/AsQA/AsA8AmQCIBUB2AzIBcAlIgnCGIgEAOIAAABIgfBoIEmghIABgBIBngMIAKjDIAjACIgtDBIgMAqIAwAMIABAAIEhBKIA6jMIAAgBIAdhnQE5gBB+gQQBJgKApgMQBDgWCHgSQA3gIA9gFQB0gHAlAqQAnAfgPBGQgZBxhSDXQgWA6gZA+QgTAsgTApQhFCNhOBNQgyA0g3AcQhtA5iLAxQg8AVhCAUQizAzj5AaQg9AGg9AEQhWAHhKAAQiCAAhcgUg");
	this.shape_19.setTransform(98.0561,78.602);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(0.1,1,1).p("ADJBSIAZjEIgkgBIALDFImqAvIBLkB");
	this.shape_20.setTransform(69.55,51.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAHBUIAGgjIAhjDIFwAOIAAAAIAAACIgDAIQgTAwgPAyQgbBbgiBfgAlSihIFTANIAMDFImrAvg");
	this.shape_21.setTransform(88.4014,54.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AmTLmQg6gNgvgTQhuguhrhBQgugcgtghQgqgfgogkQg4g1gwg/QgfgqgegvQhSiEhzi9Qgdgygdg1QhrjCAzi4IAAgBQAShBAjg4QBkihC/BaQA5AbA/AsQBBAtA+AnQCKBVB5AzIBaAkIhMECIGsgvIgMjGIAkABIgYDFIAYjFIF4AOIAAABIlvgOIghDEIgGAjIE0BOQAiheAbhdQAPgyATgwIhOESIABAAIBQkaIAAgCIABAAQFFgCB+gRQBJgKAsgNQBFgWCJgSQA5gIA9gEQB2gHAkAtQAmAhgQBHQgbB0hTDaQgWA8gaA/QgTAtgUApQhHCQhRBOQgzAzg5AdQhvA6iOAyQg9AVhEATQi3A0j+AaQg+AGg+AFQhUAFhIAAQiKAAhggUg");
	this.shape_22.setTransform(98.0249,78.6335);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(0.1,1,1).p("ADTBLIAUi/IglgBIAPDKADQBZIm2ArIBNkH");
	this.shape_23.setTransform(68.975,50.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("ACoB7IiHgjIgEgBIgEgBIgLgDIgBAAIAEgYIm2ArIBNkGIFbANIAPDKIACgKIAgi+IABgCIFxAOIgBACIgBABQgVAzgPA2IgdBfQgPAtgRAuIibgmg");
	this.shape_24.setTransform(88.075,53.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AmfLyQg7gNgwgUQhwgvhthDQgvgcgtgiQgsgggogkQg5g3gxhAQgggrgegwQhTiGh2jBQgegzgdg2QhrjGA1i8QAThDAlg4QBmihDEBfQA6AcBBAsQBCAuA/AnQCNBXB7AzIBYAjIhNEHIG3gqIgEAXIABABIAAAAIALACIADABIAFACICGAjICaAmQARguAPguQAQgtAOgvQAQg3AWg1IgCAAIABgCIADAAIgBACQFUgEB+gRQBJgLAvgNQBHgWCKgSQA7gIA+gEQB5gGAhAwQAlAigRBJQgcB3hUDdQgXA9gbBAQgUAugUApQhJCThTBOQg1Azg7AeQhxA7iRAyQg+AVhFAUQi7A0kDAbQg/AGg/AEQhUAGhIAAQiPAAhjgWgAhgmMIAlABIgUC/IAUi/IANAAIghC/IgBALg");
	this.shape_25.setTransform(98.0155,78.6552);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(0.1,1,1).p("AC7BVIAwjLIglgCIgLDNImlAxIAchgIAJgiQACgEACgFQAThAAThA");
	this.shape_26.setTransform(68.375,50.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUBXIAMgtImnAxIAdhfIAJgiIAEgKIAliAIFiANIgKDNIAvjLIGIAOQgWA2gFAqIAAAAIhBDkg");
	this.shape_27.setTransform(88,54.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AmqL/Qg8gOgxgVQhzgvhvhEQgwgegugiQgsghgoglQg7g4gxhCQgggrgfgxQhWiJh3jFQgfgzgdg3QhtjKA5jAIAAAAQAUhFAng4QBoigDIBjQA8AdBBAtQBEAuBAAoQCQBYB+A0QAwAbAmAHIgmCAIgDAKIgKAgIAAACIgcBgIGmgxIALjOIAlACIgwDMIgMAtIFnBaIBBjlIABAAQAEgqAXg2QFggCB+gSQBKgLAxgOQBJgWCMgSQA9gIA+gEQB7gFAgAzQAjAkgRBKQgdB5hWDhQgYA/gbBAQgUAvgVAqQhMCWhVBOQg2Azg8AfQh0A7iUAzQhAAWhGAUQi/A0kIAbQhAAGhAAFQhSAFhHAAQiWAAhmgXg");
	this.shape_28.setTransform(97.9605,78.6903);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AAYhjIgvDCIAAAF");
	this.shape_29.setTransform(89.35,47.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(0.1,1,1).p("ADwh4IAAAAIgmgCIgKDEAC+BXImtAxIAcheIAHgXQADgLADgKQAUhDAUhC");
	this.shape_30.setTransform(67.8,49.775);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgQBXIAKgpImtAxIAchdIAGgXIAHgWIAniFIFpAOIgJDDIAujCIABAAIGIAOQgNApgGAaIgHAYIgBAFIAAAAIhBDkgAgEAmIABgFg");
	this.shape_31.setTransform(87.425,53.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Am2MMQg9gPgygVQh1gxhwhFQgxgegvgjQgtgigpgmQg7g5gyhDQghgsgfgyQhYiMh6jIQgfg1geg3QhtjPA8jDIAAgBQAVhFAog4QBsigDMBmQA9AfBCAtQBFAvBBAoQCTBaCAA0IBUAiIgnCFIgHAWIgHAWIAAABIgbBeIGtgxIgKApIFoBaIBBjlIAAAAIABgGIADgDIAEgUQAGgaANgpIAIAAQFugDB9gSQBKgLA0gOQBLgXCOgSQA+gIA/gEQB+gEAdA3QAiAlgRBLQgeB8hYDlQgZA/gbBCQgVAvgWArQhNCZhYBOQg3A0g+AfQh3A7iWA0QhBAWhIAUQjCA1kOAbQhBAGhBAFQhSAFhIAAQibAAhogYgAEAhqIABAAIAFgVgAhimbIAlACIgwDCg");
	this.shape_32.setTransform(97.9468,78.6975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(0.1,1,1).p("AGbhsIBAAAAgjBZIAxjUIgmgBIgLDVIm3AyIAbhbIAKgkQACgGACgGQAUhEAVhG");
	this.shape_33.setTransform(90.2625,49.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgJBXIA7j4IAAAAIGJAOIAAABIAAABIgCAEIgBADIgDAHIgVBRIAAAAIhBDjgAmfAJIAKgjIAEgLIApiLIFwAOIgLDUIm3Ayg");
	this.shape_34.setTransform(87.05,53.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AnCMYQg9gPg0gWQh3gyhzhHQgxgegwgkQgtgigqgnQg8g6gzhFQghgtgggzQhZiOh9jMQggg2geg4QhujTA/jHIAAAAQAXhHApg4QBuifDRBqQA+AfBDAuQBGAwBDApQCWBaCDA1IBRAhIgpCLIgDALIgLAjIAAABIgbBbIG3gyIAMjVIAmABIgyDUIAyjUIAFAAIg9D5IFoBaIBBjlIAAAAIAVhRIADgGIABgEIACgDIAAgBIBBAAQFFgDB+gUQBKgLA2gOQBNgXCRgTQA/gIBAgDQCAgDAcA6QAgAmgSBMQgfCAhaDoQgZBAgcBDQgVAwgWAsQhQCbhaBPQg5AzhAAgQh4A8iaA1QhCAWhJAUQjHA2kSAbQhCAGhCAFQhQAFhGAAQiiAAhtgag");
	this.shape_35.setTransform(97.9135,78.7215);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(0.1,1,1).p("AGthtIA4AAAglBaIAyjWIgmgCIgMDYIm/AzIAahYIAOgxIAriQ");
	this.shape_36.setTransform(90.225,48.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgEBXIA7j4IAAAAIGJAPIAAAAIgbBgIgBAAIhBDjgAmlARIAPgxIAriQIF2AOIgLDYIm/Azg");
	this.shape_37.setTransform(86.475,52.375);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AnNMlQg/gQg0gWQh5gzh1hJQgzgfgwgkQgugjgrgoQg9g7gzhGQgiguggg0QhciRh+jPQghg3geg6QhvjWBCjLQAYhJAqg4QByieDVBuQA/AgBEAvQBHAwBEApQCZBcCFA2IBQAfIgsCRIgOAwIAAABIgaBYIHAgzIALjZIAoACIgzDXIAzjXIAEAAIg8D5IFnBaIBBjlIABAAIAahgIATABIAAAAIA5AAIAAAAQFOgDB/gVQBKgMA5gOQBPgXCTgTQBBgIBAgDQCDgCAaA9QAfAogTBNQghCChbDsQgZBCgdBDQgWAxgWAtQhSCdhdBQQg6AzhBAgQh7A+idA1QhDAWhLAVQjKA2kXAbQhEAHhDAEQhRAFhHAAQimAAhugbg");
	this.shape_38.setTransform(97.8805,78.7442);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(0.1,1,1).p("ADKBbIA0jaIgogBIgMDbInHA1IAahXIALgmQACgHABgGQAXhKAWhL");
	this.shape_39.setTransform(66.025,48.25);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("rgba(67,67,67,0.263)").ss(0.1,1,1).p("Aiyi1IGmAQIhkFbImDhhIANgw");
	this.shape_40.setTransform(109.325,53.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgWBdIANgwInHA0IAZhWIALgmIAEgMIAsiWIF+APIgLDbIAzjaIGnAQIhjFbg");
	this.shape_41.setTransform(87.2,52.875);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AnZMxQhAgQg1gXQh7g0h3hKQg0gggxglQgvgkgrgpQg+g8g0hHQgigvghg1QhdiTiBjTQgig4geg7QhwjaBFjPIAAAAQAZhKAsg4QB0ieDaByQBAAiBFAvQBJAxBFApQCcBeCIA2QAzAeAaAAIgtCWIgEANIgLAlIAAABIgZBWIHIg0IALjcIAoABIgzDbIgOAwIGEBhIBklcQGUgDB/gWQBKgNA7gOQBRgXCWgTQBCgIBBgDQCFgCAYBBQAeApgUBPQghCFhdDvQgaBDgeBEQgWAygXAtQhUCghfBQQg8A0hDAhQh9A+igA1QhEAXhNAVQjNA2kcAcQhGAGhEAEQhQAFhHAAQirAAhxgcg");
	this.shape_42.setTransform(97.8593,78.752);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("rgba(72,72,72,0.282)").ss(0.1,1,1).p("Ai1i4IGuAQIhUEkIgSA9ImLhjIAOgw");
	this.shape_43.setTransform(109.525,53.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(0.1,1,1).p("ADNBdIA1jeIgogBIgNDfIhSAJAB4BmIl6AsIAZhVIAJgdIA1ix");
	this.shape_44.setTransform(65.45,47.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgWBfIANgxIhSAJIgDABIl7ArIAZhUIAIgdIA1ixIGFAOIgLDfIA0jdIGvAPIhUEkIgRA9g");
	this.shape_45.setTransform(87,52.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AnlM+QhAgRg3gXQh9g2h5hLQg0ghgyglQgwglgrgpQg/g+g1hJQgjgvgig2QheiWiEjXQgig5geg7QhxjeBIjTIAAAAQAahMAtg4QB4idDdB2QBCAjBGAvQBKAyBGAqQCgBfCKA2QBIAkACgGIg1CyIgJAdIABAAIgZBVIF7gsIACAAIBTgJIAMjgIApABIg1DfIgOAwIGLBiIASg9IAAAAIA8jRQASgmAGgtQGhgDB/gXQBLgNA9gPQBTgXCYgTQBEgIBBgCQCHgBAXBEQAcAqgUBQQgjCHheDzQgbBFgeBEQgXAzgYAuQhWCjhhBQQg9A0hFAhQiAA/iiA2QhFAXhOAVQjSA3khAcQhHAGhFAFQhQAEhGAAQixAAh0gdg");
	this.shape_46.setTransform(97.8156,78.7781);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("rgba(78,78,78,0.306)").ss(0.1,1,1).p("Ai5i7IG2AQIgUBHIgwCmIgIAcIgJAdIgSBBImShkIAOgx");
	this.shape_47.setTransform(109.725,52.825);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(0.1,1,1).p("ADSBfIA1jiIgpgCIgMDkInYA1IAYhRIAMgpQACgHACgGQAYhQAYhQ");
	this.shape_48.setTransform(64.85,47.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgXBgIAOgxInZA1IAZhRIALgoIAFgNIAvihIGMAPIgLDjIA1jiIG3AQIgVBHIgwCmIgIAcIgIAdIgTBBg");
	this.shape_49.setTransform(86.8,52.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AnwNKQhBgRg4gYQiAg2h7hNQg1ghgygmQgxgmgsgqQhAg/g1hKQgjgwgjg3QhhiZiFjaQgjg6gfg9QhyjiBLjWIABAAQAbhNAug4QB7idDiB6QBDAkBGAvQBMAzBIArQCiBgCMA3IBJAdIgwCgIgEAOIgNAoIABABIgYBRIHYg2IAMjkIAqACIg2DiIgOAxIGSBkIAThBIABAAIAHgcIAIgcIAwioIAVhGQGtgDCAgYQBLgNBAgQQBVgXCagTQBFgIBCgCQCKAAAVBHQAaAsgUBRQgkCKhgD2QgbBHgfBFQgXA0gZAuQhYCmhkBQQg+A0hGAiQiDBAilA2QhHAYhPAVQjWA3kmAcQhIAHhGAEQhPAEhGAAQi2AAh3gfg");
	this.shape_50.setTransform(97.784,78.7816);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("rgba(83,83,83,0.325)").ss(0.1,1,1).p("Ai8i+IG+ARQgJAdgIAdQgcBggbBfQgCAGgBAFIgDAIIgHAaIgVBGImZhmIAOgy");
	this.shape_51.setTransform(109.925,52.425);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(0.1,1,1).p("ADVBgIA3jlIgrgBIgMDmIhOAJACFBpImQAtIAYhPIAIgbIAIgcQAZhSAZhU");
	this.shape_52.setTransform(64.275,46.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgXBiIAOgzIhOAJIgCABImRAtIAYhPIAIgbIAIgcIAximIGTAPIgLDmIA2jkIG+AQIgRA7Ig3C+IgDALIgDAIIgHAaIgUBGg");
	this.shape_53.setTransform(86.6,51.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("An8NXQhCgSg5gYQiCg4h9hOQg2gigzgnQgxgmgtgrQhBhAg2hLQgkgygjg3QhiiciIjdQgkg8gfg9QhyjmBOjaQAchPAwg4QB+icDmB+QBEAlBIAwQBNAzBJAsQClBhCPA3IBGAcIgyCmIgIAcIgJAcIABAAIgYBPIGRgtIACAAIBOgJIAMjoIArACIg3DmIgOAyIGZBlIAUhGIABAAIAHgZIACgJIADgLIA4i/IAQg7QG7gECAgYQBLgOBDgPQBXgXCbgUQBIgIBCgCQCMABATBLQAZAsgVBTQglCNhiD6QgcBHgfBGQgYA1gZAvQhaCohmBRQhAA1hIAiQiFBAioA3QhIAYhQAVQjaA4krAcQhJAHhHAEQhOAEhFAAQi9AAh6ggg");
	this.shape_54.setTransform(97.7689,78.7908);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("rgba(89,89,89,0.349)").ss(0.1,1,1).p("Ai/jBIHFARIhVEnIgWBLImghoIAOgy");
	this.shape_55.setTransform(110.125,52.025);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(0.1,1,1).p("ADZBiIA3jpIgrgCIgMDrInoA3IAWhMIANgsIA4i5");
	this.shape_56.setTransform(63.675,46.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgYBjIAOgzInoA4IAWhMIANgrIA3i6IGaAPIgMDqIA3joIHGAQIhVEoIgWBKg");
	this.shape_57.setTransform(86.4,51.175);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AoINjQhDgSg6gZQiDg5h/hPQg3gjg0gnQgygngtgsQhChBg3hNQgkgygkg5QhkifiLjgQgkg9gfg+Qh0jqBRjeIABAAQAdhQAxg4QCBibDrCBQBFAmBIAxQBPA0BKAsQCoBiCRA4IBEAbIg4C6IgNArIABABIgXBMIHpg3IANjrIArABIg4DqIgOAyIGgBoIAWhLIAAAAIBAjdQAPgbAGgwQHIgECAgZQBMgOBFgRQBZgXCdgTQBJgJBDgBQCPACARBOQAYAugWBTQgmCQhkD+QgcBIggBHQgYA2gaAwQhcCrhpBRQhBA0hKAjQiHBBirA4QhJAYhSAVQjeA5kwAcQhKAHhIAEQhPAEhFAAQjBAAh9gig");
	this.shape_58.setTransform(97.7316,78.8007);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("rgba(94,94,94,0.369)").ss(0.1,1,1).p("AjCjEIHNARQgJAggKAgIgBAEQgdBkgdBjQgBAEgBADIgGAWIgXBQImohpIAPg0");
	this.shape_59.setTransform(110.325,51.625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(0.1,1,1).p("ADdBjIA4jsIgsgCIgMDuIhJAJAi4CRIhcAKIAWhJIARg8QAbhYAbhZACOBsIgBAAIk+AkIgBAA");
	this.shape_60.setTransform(63.1,45.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgZBlIAPg0IhIAJIgGAAIgCAAIk+AkIgBAAIgHABIhbAKIAWhJIARg7IA1ixIGhAPIgMDuIA4jsIHOAQIgSBAIgCAFIg6DHIgBAHIgHAWIgXBPg");
	this.shape_61.setTransform(86.2,50.75);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AoUNwQhEgTg7gZQiFg6iBhRQg4gjg1gpQgzgngugtQhChCg4hPQgkgyglg6QhmihiNjlQglg9gfg/Qh0juBUjiIAAAAQAfhRAyg4QCDibDwCFQBGAnBJAxQBQA1BMAtQCrBjCUA5IBBAaIg1CxIgSA7IABABIgWBKIBbgLIAHAAIABAAIE+gkIACAAIAGgBIBIgJIANjvIAsACIg5DtIgPA0IGoBpIAXhQIAAAAIAGgWIACgHIA6jIIABgEIAThAQHUgECBgaQBLgPBIgQQBbgXCggUQBKgJBDgBQCSADAPBRQAXAvgXBVQgnCThlEBQgdBKghBIQgZA2gZAxQhfCthrBSQhDA0hLAkQiJBBiuA5QhLAYhUAWQjhA5k1AcQhMAHhJAEQhMAEhEAAQjJAAiAgjg");
	this.shape_62.setTransform(97.7217,78.8144);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("rgba(100,100,100,0.392)").ss(0.1,1,1).p("AjGjHIHVARQgFASgFASIgFARIhDDlIgEAQIgZBUImuhqIAPg1");
	this.shape_63.setTransform(110.525,51.175);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(0.1,1,1).p("ADgBkIA6jwIgtgBIgNDxIn5A6IAWhIIANguQACgHADgIQAbhaAbhc");
	this.shape_64.setTransform(62.5,45.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgZBmIAPg0In5A5IAVhHIANgtIAFgQIA2i2IGoAPIgMDyIA4jwIHWARIgKAjIgFASIhCDkIgFAQIgZBUg");
	this.shape_65.setTransform(86,50.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AofN9QhFgUg8gaQiIg6iDhTQg5gkg1gpQgzgogvguQhEhDg4hQQglg0glg6QhoikiPjoQgmg/gfhAQh2jyBXjlIABAAQAghTAzg4QCHiaDzCJQBIAoBKAyQBRA1BNAtQCuBmCXA4QAtAbASgBIg3C3IgFAPIgOAtIABABIgVBHIH5g5IANjzIAtACIg6DxIgPA0IGvBqIAYhUIABAAIAEgQIBCjlIAFgSIALgjQHhgECBgbICWggQBdgXCigUQBMgJBDAAQCUADAOBUQAVAxgXBWQgpCWhmEEQgeBMghBIQgZA4gbAxQhgCwhuBSQhEA0hNAkQiMBDiwA5QhMAYhVAWQjmA6k5AcQhOAHhKAEQhMAEhEAAQjOAAiCgkg");
	this.shape_66.setTransform(97.6813,78.8055);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("rgba(105,105,105,0.412)").ss(0.1,1,1).p("AjJjKIHdASQgIAbgIAcIgCAGQggBwghBuQgBAEgBADIgCAIIgaBZIm2hsIAQg1");
	this.shape_67.setTransform(110.725,50.775);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(0.1,1,1).p("ADkBmIA6j0IgtgBIgND1IoBA6IAUhFIAHgXIBEjj");
	this.shape_68.setTransform(61.925,44.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgZBnIAPg0IoCA6IAVhFIAHgYIBDjjIGvAQIgMD2IA5j0IHeARIgQA4IgCAGIhADeIgCAHIgDAIIgZBYg");
	this.shape_69.setTransform(85.8,49.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AorOKQhGgUg9gbQiKg8iFhUQg6gkg2gqQg0gpgvgvQhFhEg5hRQglg1gmg7QhqiniRjsQgng/gfhBQh3j2BbjpIAAAAQAhhUA1g5QCJiZD4CNQBJApBLAyQBTA3BOAtQCxBnCZA5IA9AYIhEDkIgIAXIABAAIgVBFIICg6IANj2IAuACIg7D0IgPA1IG2BsIAahZIAAAAIACgHIACgIIBBjeIABgHIAQg3QHvgECBgcICZghQBfgXCkgUQBNgJBEAAQCXAEALBYQAUAygYBXQgpCZhpEIQgeBMghBKQgaA4gcAyQhiCyhwBTQhGA1hOAkQiPBDizA6QhNAZhXAWQjpA6k+AcQhPAHhLAFQhMAEhDAAQjUAAiFgmg");
	this.shape_70.setTransform(97.6578,78.8253);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("rgba(111,111,111,0.435)").ss(0.1,1,1).p("AjMjNIHkASQgjB6gjB4QgDAIgBAHQgCAFgBAFIgKAhIgbBdIm9huIAQg2");
	this.shape_71.setTransform(110.95,50.375);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(0.1,1,1).p("ADoBoIA7j4IgugCIgND6IhBAHACeBwIlUAmIgBAAIhrANIAUhDIAKglQACgGACgGQADgIACgIQAdhgAdhh");
	this.shape_72.setTransform(61.325,44.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgZBpIAPg2IhBAIIgIABIlWAmIAAAAIhsAMIAUhCIALglIADgLIAFgQIA6jCIG2AQIgMD5IA6j3IHmASIhHDzIgEANIgDALIgKAgIgbBeg");
	this.shape_73.setTransform(85.6,49.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("Ao3OWQhGgUg/gbQiMg9iHhWQg6glg3gqQg1gqgwgwQhFhFg6hTQgmg1gmg9QhsipiUjvQgnhBgghCQh3j6BdjsIABgBQAihVA2g4QCNiZD8CRQBKAqBMAzQBUA3BPAuQC0BoCcA5QArAaAPgCIg6DBIgFARIgEAMIgLAkIABAAIgUBDIBrgMIABAAIFVgnIAJgBIBBgHIANj6IAuACIg7D4IgQA2IG9BtIAbhdIABgBIAJgfIADgLIAEgOIBGj0QAzAIA8gBQGNgLCBgdICbghQBigYCmgUQBPgJBEAAQCZAFAKBbQASA0gYBYQgrCchqELQgeBOgjBKQgaA5gcAzQhlC1hyBTQhHA1hQAlQiRBEi2A6QhOAZhZAWQjtA7lDAdQhQAHhMAEQhMAEhDAAQjZAAiIgog");
	this.shape_74.setTransform(97.6378,78.8185);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("rgba(116,116,116,0.455)").ss(0.1,1,1).p("AjQjQIHsASQgHAZgHAaIgCAFQgaBcgbBbQgEAPgFAQIgJAfIgdBiInEhwIAQg2");
	this.shape_75.setTransform(111.15,49.975);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(0.1,1,1).p("ADrBpIA9j7IgwgCIgND9IoSA8IAThAIAOgwIAFgPIAGgWIAZhTIAehh");
	this.shape_76.setTransform(60.75,43.75);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgaBqIAPg2IoSA8IAThAIAOgwIAEgOIAHgWIAZhUIAdhhIG9AQIgND9IA8j7IHtASIgPAzIgBAGIg1C2IgJAfIgKAgIgcBhg");
	this.shape_77.setTransform(85.4,49.05);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("ApDOjQhHgVhAgcQiOg+iJhXQg7glg4gsQg1gqgxgwQhGhHg7hUQgmg2gng+QhuisiWjyQgohCgfhDQh5j+BhjwIAAgBQAjhXA4g4QCPiYEBCVQBLArBNAzQBVA4BRAvQC3BpDWBQIgdBiIgaBUIgGAVIgFAQIgOAvIABAAIgTBAIISg8IAOj9IAvACIg9D7IgPA3IHDBvIAdhhIABgBIAIgfIAJgeIA1i4IACgFIAPg0QIIgFCCgcICegjQBjgXCogUQBRgKBFABQCbAFAIBfQARA0gYBaQgtCfhrEOQggBQgiBLQgbA6gcAzQhoC4h1BTQhIA1hRAlQiTBFi6A7QhPAZhaAXQjxA7lIAdQhSAHhNAEQhJAEhCAAQjgAAiMgpg");
	this.shape_78.setTransform(97.6275,78.8199);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("rgba(122,122,122,0.478)").ss(0.1,1,1).p("AjTjTIH0ASQgEAPgFAPQgBAGgCAFIhHD0IgFARIgeBnInLhxIAQg3");
	this.shape_79.setTransform(111.35,49.55);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(0.1,1,1).p("ADvBrIA9j/IgvgBIgOEAIoaA8IASg9IAKgiQAFgRAFgRQAfhmAfhm");
	this.shape_80.setTransform(60.15,43.225);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgbBsIARg3IocA8IATg9IAKgiIAKgiIA9jMIHEARIgMEAIA8j/IH0ASIgIAeIgDAMIhIDzIgEARIgfBng");
	this.shape_81.setTransform(85.2,48.625);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("ApPOwQhIgWhBgcQiQg/iLhZQg8gmg5gsQg2grgxgxQhHhIg8hVQgmg3gog/QhviviZj2QgohDgghDQh5kCBjj0IAAgBQAlhYA5g4QCSiYEFCZQBMAsBOA0QBXA4BSAvQC6BrCgA6IA2AWIg9DNIgKAiIgLAiIABAAIgTA9IIbg8IAOkBIAvABIg9EAIgQA3IHLBxIAehnIABAAIAEgRIBHj0IAEgLIAIgfQIWgFCCgdICggkQBmgXCqgUQBSgKBGABQCdAGAGBiQAQA2gZBbQgtChhuETQggBQgjBMQgcA7gcA0QhpC6h4BUQhJA1hUAmQiVBFi8A8QhRAahbAWQj1A8lNAdQhSAHhPAEQhKAEhDAAQjkAAiOgqg");
	this.shape_82.setTransform(97.6059,78.819);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("rgba(128,128,128,0.502)").ss(0.1,1,1).p("AjWjWIH7ASQgGAWgGAWQgCAFgBAGIhCDgIgHAZIggBrInShzIARg4");
	this.shape_83.setTransform(111.55,49.15);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(0.1,1,1).p("ADzBsIA+kCIgwgCIgOEEIojA+IASg7IAKgkQAFgRAGgSQAghnAfhq");
	this.shape_84.setTransform(59.575,42.75);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgbBuIARg5IokA+IASg7IAKgjIAKgiIBAjSIHKARIgMEDIA9kCIH8ATIgMArIgEALIhBDhIgIAYIgfBrg");
	this.shape_85.setTransform(85,48.225);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("ApaO9QhJgWhCgdQiShBiOhZQg9gng5gtQg3gsgxgyQhJhJg8hXQgng3gohAQhxiyibj5QgphEghhFQh6kGBnj3IAAgBQAmhaA6g4QCViXEKCdQBNAuBPAzQBYA5BTAwQC9BsCjA7IA0AVIg/DSIgLAjIgLAjIABAAIgSA7IIkg+IAOkEIAwABIg+EDIgRA5IHSByIAfhrIABgBIAHgXIBCjiIADgLIAMgrQIjgGCCgeICjgkQBogYCsgUQBUgKBGACQCgAHAEBlQAPA3gaBcQgvCkhuEWQghBSgkBNQgcA7gdA1QhsC9h6BUQhKA1hVAnQiYBGi/A8QhSAahdAXQj5A8lSAdQhTAIhQAEQhJADhBAAQjsAAiQgrg");
	this.shape_86.setTransform(97.5946,78.8242);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("rgba(133,133,133,0.522)").ss(0.1,1,1).p("AjZjZIIDATIgPA1AEaiPIhADZIgKAgIggBwInZh0IAQg5");
	this.shape_87.setTransform(111.75,48.725);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#000000").ss(0.1,1,1).p("AD2BuIBAkGIgxgCIgPEIIg3AGAC5B1InuA3IARg4IAHgYIAHgXIAqiKIAEgPQAOgrANgs");
	this.shape_88.setTransform(58.975,42.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgbBvIAQg5Ig3AHIgGABInvA3IARg4IAHgYIAHgXIAqiLIAEgOIAbhXIHSARIgOEHIA/kFIIEASIgQA2IAAACIhADYIgKAhIggBvg");
	this.shape_89.setTransform(84.775,47.775);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("ApmPKQhKgXhDgdQiVhCiPhbQg+gng5guQg4gsgzgzQhJhLg9hYQgng4gphBQhzi0idj9QgqhFghhGQh7kKBqj7IABgBQAmhbA8g4QCYiXEOChQBOAvBQA0QBaA6BUAwQDABtDXBQIgbBXIgEAOIgqCMIgHAXIgHAXIAAAAIgRA5IHvg4IAGAAIA3gHIAPkIIAxACIhAEGIgQA5IHZB0IAghvIABgBIAJggIBAjZIAAgCIAQg2QIvgFCDggQBMgSBagSQBpgYCvgVQBVgKBGACQCjAIADBpQAMA4gaBeQgwCnhwEZQghBTglBOQgcA8geA1QhuDAh8BVQhMA1hXAnQiaBHjCA9QhTAaheAWQj9A9lXAeQhUAHhRAEQhJADhCAAQjwAAiTgsg");
	this.shape_90.setTransform(97.5746,78.7937);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("rgba(139,139,139,0.545)").ss(0.1,1,1).p("AjcjcIILATIhYEsIgCAFIgiB1Ingh2IARg6");
	this.shape_91.setTransform(111.95,48.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(0.1,1,1).p("AD6BvIBAkJIgxgCIgPELIozA/IAQg1IADgLIABgEIACgFIA3i4QAOgtAOgt");
	this.shape_92.setTransform(58.375,41.725);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgcBxIARg6Io0A/IAQg1IADgLIABgEIACgFIA3i4IAchbIHZASIgOELIA/kKIIMATIhXEsIgCAFIgiB1g");
	this.shape_93.setTransform(84.575,47.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("ApyPXQhLgYhEgeQiXhCiRhdQg/gog6guQg5gtgzg0QhKhMg+hZQgng5gqhCQh1i3ifkBQgrhFghhHQh7kOBsj/IABgBQAohcA9g5QCbiWESClQBQAwBQA0QBbA7BWAxQDDBuDXBPIgbBbIg4C5IgCAFIgBADIgDALIAAAAIgQA2II0g/IAPkMIAxABIhAELIgRA6IHhB1IAih1IAAAAIACgFIBXktICCgBQG6gECEghQBMgSBcgTQBsgYCwgVQBXgKBHADQClAIABBsQALA6gbBfQgwCphyEdQgiBVglBOQgeA9geA2QhvDDh/BVQhOA1hYAoQidBHjFA+QhUAahgAXQkAA9lcAeQhWAHhSAEQhKAEhCAAQj0AAiVgug");
	this.shape_94.setTransform(97.5596,78.7879);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("rgba(144,144,144,0.565)").ss(0.1,1,1).p("AjgjfIITATIhVEkIgFAPIgjB5Inoh3IARg7");
	this.shape_95.setTransform(112.15,47.9);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(0.1,1,1).p("AD+BxIBBkNIgygCIgPEPIo8BAIAPgzIAHgXIA4i4QAPgvAOgw");
	this.shape_96.setTransform(57.8,41.225);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgcByIARg6Io9BAIAQgzIAGgXIA4i4IAdhfIHgASIgOEPIBAkNIIUATIhWEjIgEAQIgkB5g");
	this.shape_97.setTransform(84.375,46.925);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("Ap+PkQhMgYhFgfQiZhEiTheQhAgog7gwQg5gtg0g1QhLhNg/haQgog7gqhCQh2i6iikEQgshHgghHQh9kSBwkDIAAgBQApheA/g4QCdiWEXCpQBRAxBSA1QBcA7BXAyQDFBvDYBPIgdBeIg3C5IgIAXIABAAIgQAzII9hAIAPkPIAyABIhBEOIgRA7IHnB3IAkh5IAAgBIAEgOIBWklICHAAQHCgGCEggQBMgUBfgTQBtgYCzgUQBYgLBIADQCnAJgBBwQAKA6gbBhQgyCsh0EhQgjBVglBQQgeA+gfA2QhxDFiCBWQhPA1haAoQifBIjHA/QhWAahhAXQkFA+lgAeQhXAIhTAEQhIADhCAAQj7AAiYgvg");
	this.shape_98.setTransform(97.5619,78.7835);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("rgba(150,150,150,0.588)").ss(0.1,1,1).p("AjjjiIIaATQgnCHgnCFQgCAFgBAFIgJAfIglB9Inuh5IARg8");
	this.shape_99.setTransform(112.375,47.5);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(0.1,1,1).p("AECByIBBkQIgygCIgPESIpFBBIAPgxIAMgnQACgHACgGQAYhPAYhPQAPgxAPgx");
	this.shape_100.setTransform(57.2,40.725);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgcB0IARg8IpFBCIAOgxIAMgoIAEgNIAwieIAehiIHnASIgOESIBBkQIIbATIhOEMIgDAKIgKAfIgkB9g");
	this.shape_101.setTransform(84.175,46.5);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AqKPwQhNgYhGgfQibhFiVhgQhBgpg8gwQg6gug0g2QhMhOg/hcQgpg7grhDQh4i9ikkHQgshIghhJQh+kWBzkGIAAgBQAqhgBAg4QChiVEbCtQBSAyBTA1QBdA8BZAyQDIBxDYBOIgeBjIgwCeIgEANIgMAoIABAAIgPAxIJFhBIAPkUIAzACIhCESIgRA7IHuB5IAlh9IABgCIAIgdIADgJIBOkOQA9AHBVgCQHEgLCEghQBNgUBhgTQBwgZC0gUQBagLBIADQCqALgDByQAJA8gcBiQgzCvh1EkQgkBXgmBQQgeA/gfA3Qh0DIiEBWQhQA1hcApQihBJjLA/QhXAbhiAXQkJA+lmAfQhYAHhUAEQhHADhCAAQkAAAibgxg");
	this.shape_102.setTransform(97.5532,78.7669);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("rgba(155,155,155,0.608)").ss(0.1,1,1).p("AjmjlIIiAUQgrCQgqCQIgGAVIgmCCIn2h7IASg8");
	this.shape_103.setTransform(112.575,47.1);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(0.1,1,1).p("AEFB0IBDkUIg0gCIgPEWIpMBCIAOgvIAHgZIA0isIAFgRQAQgzAQgz");
	this.shape_104.setTransform(56.625,40.225);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgdB1IASg8IpOBCIAOguIAIgZIA0isIAFgRIAfhmIHuASIgOEWIBCkUIIjAUIhVEhIgGAUIgmCCg");
	this.shape_105.setTransform(83.975,46.075);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AqWP9QhOgZhHggQidhGiXhhQhCgpg8gxQg7gvg1g3QhNhPhAhdQgpg8gshEQh6jAimkLQgthJghhJQh/kaB2kLIABAAQArhhBBg4QCkiVEfCxICnBpQBfA9BZAyQDMByDYBOIgfBmIgFARIg0CtIgIAZIAAAAIgOAuIJOhCIAPkXIA0ACIhDEVIgSA8IH2B7IAmiCIABgBIAFgTIBVkiICiABQHBgICEgiQBNgUBjgUQBygYC3gVQBbgLBJAEQCtALgFB2QAHA9gdBjQg0Cyh3EnQgkBZgmBRQgfA/ggA4Qh2DLiGBWQhSA2hdApQikBJjOBAQhYAbhkAXQkMA/lrAfQhZAHhVAEQhHADhBAAQkHAAidgyg");
	this.shape_106.setTransform(97.5546,78.7739);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("rgba(161,161,161,0.631)").ss(0.1,1,1).p("AjqjoIIqAUQgnCIgoCGQgCAFgBAFIgCAHIgHAXIgoCHIn8h8IARg9");
	this.shape_107.setTransform(112.775,46.65);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(0.1,1,1).p("AEJB1IBEkYIg1gBIgPEZIpVBDIANgsIAEgMQACgGACgGQAahWAahVQADgLAEgLQAQg1AQg1");
	this.shape_108.setTransform(56.025,39.725);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgdB3IARg9IpVBDIANgsIAEgMIADgNIA0iqIAHgXIAghpIH1ATIgPEZIBDkYIIrAUIhPEOIgDAKIgCAHIgHAYIgoCGg");
	this.shape_109.setTransform(83.775,45.65);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AqhQKQhPgZhJghQifhGiZhjQhDgqg9gyQg7gwg1g3QhPhQhAhfQgqg9gshFQh8jCiokPQguhKgihKQh/keB5kOIAAgBQAthiBCg5QCniUEkC1ICpBrQBgA9BbAzQDOB0DZBNIggBqIgHAWIg0CsIgEAMIgEAMIAAAAIgNAsIJWhDIAPkaIA1ABIhEEZIgSA9IH9B8IAniGIABgCIAGgWIACgHIADgKIBQkPICWgBQHagFCEgkQBOgUBlgUQB0gZC5gVQBdgKBJAEQCvALgGB5QAFA/gdBkQg1C1h5ErQgkBagnBSQggBAghA4Qh3DOiJBXQhTA1hfAqQinBKjQBBQhZAbhlAXQkRBAlvAeQhbAIhWAEQhIADhAAAQkMAAifg0g");
	this.shape_110.setTransform(97.548,78.7472);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("rgba(166,166,166,0.651)").ss(0.1,1,1).p("AjtjrIIyAUIhWEiIgGAWIgpCLIoEh+IASg9");
	this.shape_111.setTransform(112.975,46.25);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(0.1,1,1).p("AEMB3IBGkcIg2gCgAjgi5IgoCGIg1CrIgHAZIgNApIJdhD");
	this.shape_112.setTransform(55.45,39.225);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgeB5IASg+IpeBDIANgpIAHgZIA1irIAoiGIH8ASIgPEeIBEkcIIzAUIhWEjIgGAVIgpCLg");
	this.shape_113.setTransform(83.575,45.225);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AquQXQhPgahKghQihhIichkQhDgrg+gyQg8gxg2g4QhPhRhChgQgpg+gthGQh+jFirkSQguhLgihMQiAkhB8kSIAAgBQAuhkBEg4QCpiUEoC5ICrBsQBiA+BcA0QDSB1DYBNIgoCGIg1CsIgIAZIABAAIgNApIJehDIAQkfIA1ACIhFEdIgSA+IIEB9IApiLIABgCIAFgTIBWkkICcgBQHhgFCFgkQBNgWBogUQB2gYC7gVQBegLBKAEQCyAMgJB9QAFBAgeBlQg3C4h6EuQglBcgoBSQggBCghA4Qh6DQiLBYQhUA1hhArQipBLjTBBQhbAbhmAYQkVBAl0AfQhcAHhXAEQhFADhAAAQkTAAijg1g");
	this.shape_114.setTransform(97.56,78.744);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("rgba(172,172,172,0.675)").ss(0.1,1,1).p("AjwjuII5AUQgrCSgqCSQgCAFgCAFIgDAKIgqCRIoLiAIASg+");
	this.shape_115.setTransform(113.175,45.85);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(0.1,1,1).p("AERB4IBFkfIg2gCIgPEhIpmBFIAMgnIALglIAEgMQAWhKAXhKQABgEACgFQAThCAVhC");
	this.shape_116.setTransform(54.85,38.725);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgeB6IASg+IpmBEIALgnIALglIAEgMIAtiTIADgKIAoiDIIDATIgPEhIBFkfII6ATIhVElIgEAJIgDALIgqCRg");
	this.shape_117.setTransform(83.375,44.8);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("Aq6QkQhQgbhLghQijhJiehmQhEgrg/gzQg8gyg3g5QhQhShChiQgqg+guhHQiAjIitkWQgvhMgihMQiBkmB/kVIABgBQAuhlBGg5QCsiTEsC9ICtBuQBjA/BeA0QDUB2DZBMIgoCEIgDAJIgtCVIgEAMIgLAlIAAAAIgLAnIJmhFIAQkiIA2ACIhGEgIgSA/IILB/IAqiQIABgBIACgKIADgKIBWklQBGAGBbgHQHpgFCFglQBOgWBrgVQB4gYC9gVQBfgLBLAEQC0AOgKB/QADBCgfBmQg4C7h7EyQgmBcgoBUQghBCghA5Qh9DTiNBYQhWA1hiArQirBMjWBCQhcAchpAXQkYBBl5AfQheAIhYADQhGADhBAAQkWAAilg2g");
	this.shape_118.setTransform(97.5823,78.73);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("rgba(177,177,177,0.694)").ss(0.1,1,1).p("AjzjxIJBAUQgrCTgrCSQgBACgBADQgBACAAABIgEAMIgsCWIoSiBIAThA");
	this.shape_119.setTransform(113.375,45.45);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(0.1,1,1).p("AEUB6IBHkjIg3gCIgQElIgjAEAitCsIitATIALgkIAHgZIA1isQABgCAAgDQAWhIAWhHADrB+ImWAu");
	this.shape_120.setTransform(54.275,38.225);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgfB8IAThAIgjAEIgGABImXAtIgCAAIitAUIALgkIAIgZIA0isIACgFIAriQIIKAUIgPEkIBGkiIJCAUIhXElIgBAFIgBADIgEAMIgsCWg");
	this.shape_121.setTransform(83.175,44.375);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("ArGQxQhSgchMgiQilhKifhnQhGgsg/g0Qg9gyg4g5QhRhUhDhjQgqg/gvhIQiBjLivkZQgwhNgihNQiCkqCCkaIAAAAQAwhnBHg4QCviTExDBICvBvQBkBABfA1QDYB3DZBMIgsCPIgBAFIg1CuIgIAYIABAAIgLAkICsgTIADAAIGWgtIAGgBIAjgEIAQkmIA3ACIhHEkIgSA/IISCBIAsiVIAAgBIAEgLIABgEIABgFIBWklICngBQHwgHCGglQBNgWBugVQB6gZC/gVQBhgLBLAFQC3AOgNCDQACBCgfBoQg5C+h9E1QgnBegoBUQgiBDgiA6Qh+DWiQBYQhXA2hkArQiuBMjZBDQhdAchpAYQkdBBl+AfQhfAIhZAEQhEADg/AAQkeAAiog4g");
	this.shape_122.setTransform(97.6151,78.72);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("rgba(183,183,183,0.718)").ss(0.1,1,1).p("Aj3j0IJJAVIhXEmIgGAUIgtCaIoZiDIAThA");
	this.shape_123.setTransform(113.575,45.025);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(0.1,1,1).p("AEYB7IBHkmIg3gCIgQEoIp2BGIAKghIAHgZIBklI");
	this.shape_124.setTransform(53.675,37.7);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgfB9IAThAIp3BGIAKghIAHgZIBklIIIRAUIgPEoIBGkmIJKAUIhXEmIgGAVIgtCag");
	this.shape_125.setTransform(82.975,43.95);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("ArSQ+QhSgchOgjQinhLiihoQhGgthAg0Qg+gzg4g7QhShVhDhkQgrhAgvhJQiEjNixkdQgxhOgihOQiDkuCFkdIABgBQAxhoBIg4QCyiSE1DEICxBxQBmBABgA2QDaB5DaBLIhkFIIgIAaIAAAAIgKAhIJ3hGIAQkqIA4ACIhIEoIgTBAIIZCDIAtiaIABgBIAGgUIBXknQBCAHBpgIQH4gGCGgnQBOgWBwgVQB8gZDBgWQBjgLBMAFQC5APgOCHQAABEgfBpQg7DAh/E5QgnBfgpBVQgiBEgiA7QiBDYiTBYQhYA2hlAsQiwBNjcBDQhfAdhrAYQkgBBmDAgQhgAIhaADQhFADg/AAQkjAAiqg5g");
	this.shape_126.setTransform(97.6491,78.6963);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#000000").ss(0.1,1,1).p("AEbB9IBJkqIg5gCIgQEsIgeADAD7CBIpeBDIAJgfIADgLIBrld");
	this.shape_127.setTransform(53.1,37.225);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("rgba(188,188,188,0.737)").ss(0.1,1,1).p("Aj6j3IJRAVIiMHaIohiEIAThB");
	this.shape_128.setTransform(113.775,44.6);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AggB/IAThBIgeADIgCABIpfBDIAJgfIAEgLIBqldIIYAUIgQEsIBIkqIJSAVIiMHag");
	this.shape_129.setTransform(82.775,43.525);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("ArfRLQhTgdhOgjQiqhMijhqQhHgthBg2Qg/gzg4g7QhThXhFhlQgrhBgwhKQiFjQi0kgQgxhQgjhPQiEkyCJkgIAAgBQAzhpBJg5QC1iRE6DIICzByQBnBCBhA2QDeB6DZBLIhqFeIgEALIAAAAIgJAeIJfhDIACAAIAegEIARktIA4ACIhJErIgTBBIIhCEICMnbQBaAPBhgJQH1gNCHgoQBOgWBygWQB+gZDDgWQBlgLBMAGQC7AQgPCJQgCBFggBrQg7DDiBE8QgnBhgqBWQgiBEgkA8QiCDbiVBYQhaA2hnAtQizBOjeBDQhgAdhsAYQklBCmIAgQhhAIhbAEQhFACg+AAQkpAAitg6g");
	this.shape_130.setTransform(97.6895,78.6881);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("rgba(194,194,194,0.761)").ss(0.1,1,1).p("Aj+j6IJZAVIhXEoIgHAWIgwCiIoniFIAThD");
	this.shape_131.setTransform(114,44.2);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(0.1,1,1).p("AEfB+IBKktIg6gCgAjvjFIgwCcQgeBigeBkIgBADIgDAKIgJAcIKHhI");
	this.shape_132.setTransform(52.5,36.725);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AggCBIAThDIqHBIIAIgcIADgKIABgDIA8jFIAwidIIfAUIgQEvIBJktIJZAVIhXEoIgHAWIgwCig");
	this.shape_133.setTransform(82.575,43.1);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("ArrRXQhUgdhQgjQirhOimhrQhIguhBg2QhAg0g5g8QhUhYhFhnIhciMQiHjTi2kkQgyhQgjhQQiFk2CLkkIABgBQAzhrBLg5QC4iQE+DMIC2B0QBoBCBjA2QDgB8DaBKIgwCdIg8DGIgBADIgDAKIAAAAIgJAdIKIhIIAQkxIA5ACIhJEvIgTBCIInCFIAwiiIABgCIAGgUIBXkpQBdAOB2gHQHtgPBpgfQBpggB1gWQCAgZDFgVQBmgMBNAGQC+ARgSCNQgCBGghBsQg8DGiDFAQgoBhgqBXQgjBGgkA8QiFDdiXBZQhbA3hpAtQi1BOjhBEQhhAdhuAZQkoBCmNAgQhjAIhcAEQhEACg/AAQkuAAivg8g");
	this.shape_134.setTransform(97.7223,78.6621);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("rgba(200,200,200,0.784)").ss(0.1,1,1).p("AkAj9IJgAWQgsCUgsCUQgCAFgBAFIgDALIgyCoIouiHIAThD");
	this.shape_135.setTransform(114.2,43.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(0.1,1,1).p("AEjCAIBKkxIg6gDIgQE0IqPBJIAIgaIByl3");
	this.shape_136.setTransform(51.925,36.225);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AggCCIAThDIqQBJIAIgaIByl2IImAUIgQEzIBKkxIJhAWIhYEpIgDAJIgDALIgyCog");
	this.shape_137.setTransform(82.375,42.675);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("Ar4RlQhVgehQgkQiuhPinhsQhJgvhCg3QhBg1g5g9QhVhYhGhpQgshCgxhMQiJjVi5koQgyhRgjhRQiGk6COkoIABgBQA0hsBMg5QC8iQFCDRIC3B1QBqBDBkA2QDjB9DaBKQglBUgQBbIg9DJIAAAAIgIAaIKQhJIARk1IA6ADIhLEyIgTBCIIuCIIAyioIAAgBIADgKIADgKIBYkqQBgANBogGQICgPCHgpQBPgYB3gWQCCgZDHgWQBogLBNAGQDBARgUCRQgEBHghBtQg+DJiEFDQgoBkgsBXQgjBGgkA9QiHDgiaBaQhcA2hrAuQi3BPjlBFQhiAdhvAZQksBDmSAgQhkAIhdADQhGADhAAAQkxAAixg9g");
	this.shape_138.setTransform(97.7677,78.6429);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#000000").ss(0.1,1,1).p("AEkCCIBOk1IAAgBIg7gCIgTE4InJAyIgBAAIjLAXIAHgXIAIgaIA2ixAkrgbIA2iv");
	this.shape_139.setTransform(51.325,35.7);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("rgba(205,205,205,0.804)").ss(0.1,1,1).p("AkEkAIJoAWIiSHrIo1iJIARhD");
	this.shape_140.setTransform(114.4,43.375);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AghCEIARhEInKAzIAAAAIjLAWIAHgWIAHgaIA2ixIABgEIA2iwIItAVIgTE3IBNk0IAAgBIJpAWIiRHsg");
	this.shape_141.setTransform(82.175,42.25);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AsERxQhWgehSglQivhPiqhuQhKgwhDg3QhBg2g6g9QhWhahGhqIhfiQQiKjYi7krQg0hTgjhSQiHk9CSksIABgBQA1huBOg4QC+iQFGDVQBeA9BcA5QBrBEBlA3QDnB+DaBKIg2CvIgBAEIg2CyIgIAaIAAAAIgHAXIDMgXIAAAAIHKgyIATk5IA7ACIAAABIhOE2IgRBDII1CJICSntQBjAMBkgGQIQgOCHgqQBPgYB6gXQCEgZDKgWQBpgLBNAGQDDASgVCUQgFBJgiBuQg/DMiGFHQgpBkgsBYQgjBIglA9QiJDjidBaQheA2hsAuQi5BRjoBFQhjAdhxAZQkwBEmWAgQhmAIheAEQhDACg/AAQk4AAi1g/g");
	this.shape_142.setTransform(97.8034,78.6321);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("rgba(211,211,211,0.827)").ss(0.1,1,1).p("AkHkDIJwAWIhbEwIgFAQIg0CxIo9iLIAUhE");
	this.shape_143.setTransform(114.6,42.975);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(0.1,1,1).p("AEqCDIBNk5Ig8gCIgRE7IqgBKIAHgUIADgKQAAgCABgCQAfhmAfhlIA0it");
	this.shape_144.setTransform(50.75,35.2);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AghCFIAUhEIqhBKIAGgUIAEgKIABgEIA+jLIA0itII0AVIgQE7IBLk5IJxAWIhbEwIgEARIg1Cxg");
	this.shape_145.setTransform(81.975,41.825);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AsQR/QhXgfhTgmQixhRishvQhLgwhDg4QhCg2g7g/QhXhbhHhrIhgiSQiMjbi9kuQg0hUgkhTQiHlBCUkwIABgBQA3hvBOg5QDCiOFLDXQBfA/BcA6QBtBEBmA4QDpB/DbBKIg1CtIg+DLIgBAEIgDAKIAAAAIgGAUIKghKIARk8IA8ACIhNE6IgUBEII9CLIA0ixIABgCIAEgOIBakxQBnAJBfgKQIfgICHgrQBPgYB8gXQCGgaDMgVQBrgMBOAHQDFATgXCXQgGBKgjBwQhADOiHFKQgqBmgsBZQglBJglA9QiLDmifBaQhfA3huAuQi8BRjqBGQhlAehyAZQk0BEmcAgQhnAJhfADQhDACg/AAQk+AAi2g/g");
	this.shape_146.setTransform(97.8378,78.5999);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000000").ss(0.1,1,1).p("AEuCEIBNk8Ig8gCIgRE+InTA0AioC4IjSAYIB/mfII6AV");
	this.shape_147.setTransform(50.15,34.725);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("rgba(216,216,216,0.847)").ss(0.1,1,1).p("AkLkGIJ4AWIiVH3IlJhQIgQgEIjrg4IAGgTQAHgZAHgZ");
	this.shape_148.setTransform(114.8,42.55);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("ADZDCIgQgDIgBAAIjqg5IAGgTIAPgxIBMk8IJ4AVIiVH3gAo3kSII6AVIgQE/InUAzIgDABIjSAXg");
	this.shape_149.setTransform(81.775,41.4);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AsdSLQhXgfhUgmQi0hSiuhwQhLgxhFg5QhCg3g8hAQhXhchIhsIhhiUQiOjejAkxQg0hVgkhUQiJlGCYkzIABgBQA4hwBQg5QDEiOFPDcQBgA/BeA7QBuBFBnA4QDtCBDbBJIh/GfIDSgXIADgBIHUgzIARlAIA8ADIhNE9IgPAyIgGATIDqA4IARAEIFJBQICVn4QBqAJBhgKQIngICHgrQBPgZB/gYQCIgZDOgWQBsgMBPAHQDIAUgZCbQgIBLgjBxQhBDRiJFOQgrBngtBaQgkBJgnA/QiNDoihBaQhgA3hwAvQi/BSjsBGQhmAfh0AZQk4BEmgAhQhoAIhgAEQhDACg+AAQlEAAi6hCgAA4iwgAAni0IABAAIAQAEg");
	this.shape_150.setTransform(97.8742,78.5852);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(0.1,1,1).p("AExCGIBPlAIg9gCIgSFCInWA0AinC6IjYAYIAFgPIBDjbIA5i5");
	this.shape_151.setTransform(49.575,34.225);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("rgba(222,222,222,0.871)").ss(0.1,1,1).p("AlcA3IgVBFIJLCOICXn8Ip/gX");
	this.shape_152.setTransform(115,42.15);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgiCIIAUhGInXA0IgCABIjYAYIAFgQIBDjbQAjhaAWhfIJBAVIgRFCIBOk/IKAAWIiXH9g");
	this.shape_153.setTransform(81.575,40.975);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AspSYQhZgfhVgnQi2hTivhyQhNgyhFg5QhDg4g8hAQhZhehJhuIhhiVQiQjgjCk2Qg2hVgjhVQiKlKCbk3IABgBQA5hyBRg5QDHiNFUDgQBhBABfA7QBvBGBpA5QDvCCDbBIIg4C5IgEAJIhADTIABAAIgFAQIDXgYIADAAIHXg1IASlDIA8ADIhOFAIgVBGIJLCOICXn+QBtAIBjgJQIvgICIgsQBPgaCBgXQCKgaDQgWQBugMBPAIQDLAUgbCeQgKBNgjByQhDDUiKFRQgrBpguBaQglBKgnBAQiPDqikBbQhiA3hxAwQjBBSjwBHQhnAfh1AZQk7BFmmAhQhpAIhhAEQhDACg+AAQlJAAi8hDgAsanUgAriqNQgWBfgiBagAriqNIAAAAg");
	this.shape_154.setTransform(97.9215,78.555);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(0.1,1,1).p("AE1CKIBPlEIg9gCIgSFGInWA0AimC+IjdAZIADgNIADgIIBwmY");
	this.shape_155.setTransform(48.975,33.475);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("rgba(227,227,227,0.89)").ss(0.1,1,1).p("AkRkMIKHAXIiZICIpSiPIAVhH");
	this.shape_156.setTransform(115.2,41.725);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgjCMIAVhHInXA0IgFABIjdAYIADgMIADgIIA/jNIAxjLIJUAaIgRFFIBOlDIKIAXIiZICg");
	this.shape_157.setTransform(81.375,40.325);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("As2SlQhZgghWgnQi4hUiyh0QhNgyhGg6QhEg5g9hBQhZhehKhvIhjiYQiRjjjFk5Qg2hWgkhWQiKlOCdk7IABgBQA7hzBSg5QDKiNFYDkQBjBCBfA7QBxBGBqA6QDyCEDQBDIhwGZIgDAIIABAAIgEAMIDdgYIAFgBIHXg0IASlGIA9ACIhPFEIgVBHIJSCPICZoDQBwAGBlgIQI3gHCIgtQBPgaCEgYQCMgaDSgWQBwgMBPAIQDNAVgcChQgLBOgkBzQhEDXiMFVQgsBqguBbQgmBLgnBAQiRDuinBbQhjA3hzAwQjDBTjzBIQhoAfh3AZQk/BGmrAhQhqAIhiAEQhBACg8AAQlRAAjAhFgAtnj/gAr3qYIgxDLIg/DOgAr3qYIAAAAg");
	this.shape_158.setTransform(97.9587,78.5412);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#000000").ss(0.1,1,1).p("AEvCKIBalIIg+gDgAkFjWIg/DPIhEDeIK3hN");
	this.shape_159.setTransform(48.4,33.2);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("rgba(233,233,233,0.914)").ss(0.1,1,1).p("AkUkPIKOAXIiaIIIpaiRIABgBIAKhF");
	this.shape_160.setTransform(115.4,41.325);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgjCLIAAgBIALhFIq4BNIBEjeIBAjPIJPAVIgbFLIBZlIIKQAXIibIIgAgpCJIARhEIgLBFg");
	this.shape_161.setTransform(81.175,40.125);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AtCSyQhaghhYgnQi6hVi0h2QhOgyhGg7QhFg6g9hBQhbhghKhxIhkiZQiUjmjGk8Qg3hYgkhXQiMlRChk/IABgBQA8h0BUg5QDMiNFdDoQBkBDBgA7QByBIBrA6QD2CFDbBHQgjBkgbBnIgBAEIhEDfIK3hNIAdlMIA+ADIhbFJIgQBEIAGABIgBABIJaCRICaoJQBzAFBngHQI+gHCJguQBQgbCGgYQCOgaDUgWQBxgMBRAIQDPAWgeCkQgNBQglB0QhEDaiOFYQgsBsgvBcQgmBLgoBBQiUDwioBcQhlA3h0AxQjGBUj2BIQhpAfh4AaQlEBGmvAhQhsAIhjAEQhDACg9AAQlUAAjBhGg");
	this.shape_162.setTransform(98.0019,78.5157);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(0.1,1,1).p("AE9CKIBRlKIg/gDIgSFNIrKBQIADgJICDmq");
	this.shape_163.setTransform(47.8,32.7);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("rgba(238,238,238,0.933)").ss(0.1,1,1).p("AkYkSIKXAXIidIOIpgiTIAVhI");
	this.shape_164.setTransform(115.625,40.925);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgjCMIAVhIIrKBQIACgJICDmpIJWAVIgRFNIBQlKIKXAXIicIPg");
	this.shape_165.setTransform(80.975,39.7);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AtOS/QhbghhZgoQi8hXi2h3QhPgzhHg7QhFg7g/hCQhbhhhLhyIhlibQiVjpjJlAQg4hYgkhYQiMlWCjlCIABgBQA9h2BVg4QDQiNFhDsQBlBEBhA8QB0BIBsA7QD4CGDcBGQgjBogdBpIhDDaIABAAIgDAIILKhPIATlOIA+ADIhRFLIgVBIIJgCUICdoQQB2AEBpgGQJGgHCJgvQBPgbCJgZQCRgZDWgXQBygMBRAIQDSAXggCoQgOBRglB1QhGDdiQFcQgsBsgwBdQgnBNgoBBQiWDzirBcQhmA3h2AyQjIBUj4BJQhrAgh6AaQlHBGm0AhQhuAJhkADQhAADg8AAQlcAAjEhIg");
	this.shape_166.setTransform(98.033,78.5003);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(0.1,1,1).p("AFACMIBSlOIg/gDIgTFRIgFAAIrMBQIABgGICFmx");
	this.shape_167.setTransform(47.225,32.225);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("rgba(244,244,244,0.957)").ss(0.1,1,1).p("AltA5IgVBIIAAABIBuAZICYAmIAMACIFVBTICdoPIABgFIqegX");
	this.shape_168.setTransform(115.825,40.5);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("ADuDPIgLgCIgBAAIiZglIhFgSIgCAAIgmgJIgDAAIAUhHIAFgBIgWBIIAWhIIBRlOIKfAYIgCAFIidIOgArfCQICFmxIJdAWIgRFQIgFABIrOBPg");
	this.shape_169.setTransform(80.775,39.275);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AtbTMQhcgihZgpQi/hXi3h4QhQg0hIg8QhGg7g/hEQhchihMhzIhmidQiXjrjMlDQg4hagkhZQiOlZCnlHIABAAQA+h4BXg5QDSiLFmDvQBmBFBiA9QB1BIBuA8QD7CHDXBFIg9DXIhDDdIAAAAIgCAFILOhPIgUBHIADABIAAAAIBuAaICYAlIALADIFWBSICdoPQB7gDBrgEQJOgICJgvQBQgcCLgZQCTgaDYgWQB0gNBRAJQDVAYgiCrQgQBSglB3QhIDfiRFgQgtBtgwBeQgnBOgpBCQiYD1iuBdQhnA3h4AyQjKBVj8BKQhsAfh7AaQlLBHm5AiQhvAIhlAEQhBACg8AAQlgAAjHhJgAA1i6IABAAIAKADgAhjjfgAjRj5IAAAAIAnAIIACAAIBFASgAjRj5gAipqTIBAACIhSFPg");
	this.shape_170.setTransform(98.0894,78.4533);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").ss(0.1,1,1).p("AFECOIBTlTIhAgCIgTFVInhA0AijDDIh5ANIh6AOIAEgKIA/jRIBFjg");
	this.shape_171.setTransform(46.625,31.7);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("rgba(249,249,249,0.976)").ss(0.1,1,1).p("AkekYIKmAYIgEAMIh9GhIgfBsIgDAAIlOhSIgSgEIglgJAikC5IiwgqIgJgCIgqgKIAAAAIAWhJ");
	this.shape_172.setTransform(116.025,40.075);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AD4DUIgRgEIgBAAIglgJIgEgBIixgrIgHgCIgBAAIgpgJIAAgBIAWhJIBSlSIKnAYIgEAMIh9GhIgiBsgArmCMIA/jPIBFjhIJlAWIgSFUIniA1IgGABIh5ANIh5ALgAgPBGg");
	this.shape_173.setTransform(80.625,38.825);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AtnTZQhdgihbgpQjAhZi6h5QhRg1hJg9QhGg8hAhEQhdhjhMh1IhnifQiajtjNlHQg5hbglhaQiOldCqlKIABgBQA/h5BYg5QDWiLFpD0QBnBGBkA9QB2BJBvA8QD+CJDaBFIhBDbIgCAHIg/DQIgDAIIB5gMIh6APIAEgLIgEALIB6gPIB5gMIAGgBIHig1IATlVIBAACIhTFTIgWBJIAAABIAqAJIAJACICvArIAEABIAlAJIABAAIARAEIgSgEIASAEIFPBRIAihsIgfBtIgDgBIADABIAfhtIB9miIADgJIDrgEQJVgJCJgwQBQgcCOgZQCVgaDagXQB2gMBSAJQDWAZgkCuQgQBTgnB4QhIDiiTFjQguBwgwBeQgoBOgqBDQiZD4iwBdQhpA4h5AyQjOBWj+BKQhtAgh8AaQlQBIm+AiQhwAIhmAEQhAACg8AAQlmAAjJhLgAihjwgAiqjyIABAAIAIACg");
	this.shape_174.setTransform(98.1221,78.4428);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#000000").ss(0.1,1,1).p("AgpCtIATlZIBAADg");
	this.shape_175.setTransform(83,28.25);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#FFFFFF").ss(0.1,1,1).p("AAAABIKuAYAqtgXIJtAW");
	this.shape_176.setTransform(87.25,11.2);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AAHCbIgCAAIgqgKIAWhKIrjBRICKnAIJrAXIgSFYIBTlWIKvAYIiiIgg");
	this.shape_177.setTransform(80.375,38.425);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("At0TmQkjhskVi1QkVi1i5kaQi4kakbnCQkanCDbmkQDbmkIFFeQIEFdGOB9IiKHBILjhRIgWBKIArAKIACAAIJJCOICiogQMzgCCjg6QCjg6GwgsQGxgtg0D1QgzD0jkIlQjjIlkdCWQkdCVmZB2QmYB3pqAuQi5AOicAAQlrAAjMhMgAiuqhIBBADIhUFWg");
	this.shape_178.setTransform(98.1542,78.3999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23}]},1).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},1).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39}]},1).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43}]},1).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},1).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51}]},1).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]},1).to({state:[{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]},1).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67}]},1).to({state:[{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},1).to({state:[{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83}]},1).to({state:[{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87}]},1).to({state:[{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91}]},1).to({state:[{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95}]},1).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99}]},1).to({state:[{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103}]},1).to({state:[{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107}]},1).to({state:[{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111}]},1).to({state:[{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115}]},1).to({state:[{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119}]},1).to({state:[{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123}]},1).to({state:[{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127}]},1).to({state:[{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131}]},1).to({state:[{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135}]},1).to({state:[{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139}]},1).to({state:[{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143}]},1).to({state:[{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147}]},1).to({state:[{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151}]},1).to({state:[{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155}]},1).to({state:[{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159}]},1).to({state:[{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163}]},1).to({state:[{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167}]},1).to({state:[{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171}]},1).to({state:[{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175}]},1).to({state:[]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.9,-54.6,508.20000000000005,266);


(lib.eyeblack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("AAegVQAAAIgLAGQgKAHgOAAQgOAAgLgHQgKgGAAgIQAAgJAKgGQALgGAOAAQAOAAAKAGQALAGAAAJgAApAeQAAAGgEADQgDAEgGAAQgFAAgEgEQgEgDAAgGQAAgFAEgEQAEgEAFAAQAGAAADAEQAEAEAAAFg");
	this.shape.setTransform(10.675,15.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AATAnQgEgDAAgGQAAgFAEgEQAEgEAFAAQAGAAADAEQAEAEAAAFQAAAGgEADQgDAEgGAAQgFAAgEgEgAgegHQgKgGAAgIQAAgJAKgGQALgGAOAAQAOAAAKAGQALAGAAAJQAAAIgLAGQgKAHgOAAQgOAAgLgHg");
	this.shape_1.setTransform(10.675,15.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhZCrQglhHAAhkQAAhjAlhIQAmhGAzAAQA1AAAlBGQAlBIgBBjQABBkglBHQglBHg1AAQgzAAgmhHgAAAg+QgDAFAAAFQAAAFADAEQADAEAFAAQAGAAADgEQAEgEAAgFQAAgFgEgFQgDgDgGAAQgFAAgDADgAgyh4QgKAHAAAJQAAAIAKAGQALAGAOAAQAPAAAKgGQAKgGAAgIQAAgJgKgHQgKgFgPgBQgOABgLAFg");
	this.shape_2.setTransform(12.65,24.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhZCrQglhGAAhlQAAhjAlhHQAmhHAzAAQA1AAAkBHQAmBHgBBjQABBlgmBGQgkBHg1AAQgzAAgmhHgAAAg9QgEAEABAFQgBAGAEADQADAEAFAAQAGAAADgEQAEgDABgGQgBgFgEgEQgDgEgGAAQgFAAgDAEgAgxh4QgLAHAAAJQAAAIALAGQAKAGAOAAQAPAAAKgGQAKgGAAgIQAAgJgKgHQgKgFgPAAQgOAAgKAFg");
	this.shape_3.setTransform(13.65,23.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhZCrQgkhGgBhlQABhkAkhGQAlhHA0AAQA1AAAkBHQAlBGAABkQAABlglBGQgkBHg1AAQg0AAglhHgAAAg+QgDAEAAAGQAAAFADAEQADAEAFAAQAGAAADgEQAFgEAAgFQAAgGgFgEQgDgDgGAAQgFAAgDADgAgxh3QgLAGAAAIQAAAJALAGQAKAHAPAAQAOAAAKgHQAKgGAAgJQAAgIgKgGQgKgHgOABQgPgBgKAHg");
	this.shape_4.setTransform(13.85,25.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhZCrQglhGABhlQgBhkAlhGQAmhHAzAAQA1AAAkBHQAmBGgBBkQABBlgmBGQgkBHg1AAQgzAAgmhHgAAAg+QgDAEAAAGQAAAFADAEQADAEAFAAQAGAAAEgEQADgEAAgFQAAgGgDgEQgEgDgGAAQgFAAgDADgAgyh3QgKAGAAAIQAAAJAKAGQALAHAOAAQAPAAAKgHQAKgGAAgJQAAgIgKgGQgKgHgPABQgOgBgLAHg");
	this.shape_5.setTransform(14,26.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhYCrQglhHAAhkQAAhkAlhHQAkhGA0AAQA1AAAlBGQAkBHABBkQgBBkgkBHQglBHg1AAQg0AAgkhHgAAAg+QgDAEgBAGQABAFADAEQADAEAGAAQAFAAAEgEQAEgEAAgFQAAgGgEgEQgEgDgFAAQgGAAgDADgAgxh3QgLAGAAAIQAAAJALAGQAKAHAPAAQAOAAAKgHQAKgGAAgJQAAgIgKgGQgKgHgOAAQgPAAgKAHg");
	this.shape_6.setTransform(13.6,26.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(0.1,1,1).p("AgWgEQAAAAgBgBQgBAAgBgBQgLgGAAgIQAAgJALgGQAKgGAPAAQAJAAAJADAAZAqQgBgBgBgBQgDgDAAgGQAAgFADgEQAFgEAFAAQABAAACAB");
	this.shape_7.setTransform(11.05,17.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAXAqIgCgCQgDgDAAgGQAAgFADgEQAEgEAFAAIAEABIABABQAEAEAAAFQAAAGgEADQgDAEgGAAIgDAAgAgZgEIgBAAIgBgCQgLgGAAgIQAAgJALgGQAKgGAPAAQAJAAAJADIABABQAKAGAAAJQAAAIgKAGQgKAHgOAAQgKAAgIgDg");
	this.shape_8.setTransform(11.3,17.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhYCrQgmhHAAhkQAAhkAmhHQAkhGA0AAQA1AAAkBGQAmBHAABkQAABkgmBHQgkBHg1AAQg0AAgkhHgAAAg+QgDAFgBAFQABAGADADQACADADABIADAAQAGAAADgEQAFgDAAgGQAAgFgFgFIgBgBQgDgCgFAAQgFAAgDADgAgxh3QgLAGAAAIQAAAJALAGIAGADIABAAQAIAEAKAAQAOgBAKgGQAKgGAAgJQAAgIgKgGIgBgBQgKgFgNgBQgPAAgKAHg");
	this.shape_9.setTransform(13.05,25.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{x:10.675,y:15.875}},{t:this.shape,p:{x:10.675,y:15.875}}]}).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:11.675,y:15.625}},{t:this.shape,p:{x:11.675,y:15.625}}]},1).to({state:[{t:this.shape_4},{t:this.shape_1,p:{x:11.875,y:16.825}},{t:this.shape,p:{x:11.875,y:16.825}}]},1).to({state:[{t:this.shape_5},{t:this.shape_1,p:{x:12.025,y:17.725}},{t:this.shape,p:{x:12.025,y:17.725}}]},1).to({state:[{t:this.shape_6},{t:this.shape_1,p:{x:11.625,y:17.825}},{t:this.shape,p:{x:11.625,y:17.825}}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_2},{t:this.shape_1,p:{x:10.675,y:15.875}},{t:this.shape,p:{x:10.675,y:15.875}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.2,26.7,50.6);


(lib.eybrowesphone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(9.7,1,1).p("AhKhRQB+AlAXB+");
	this.shape.setTransform(7.5,8.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(9.7,1,1).p("AhKhRQB9AkAYB/");
	this.shape_1.setTransform(8.8,6.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(9.7,1,1).p("AhKhRQB+AkAXB/");
	this.shape_2.setTransform(9.5,5.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(9.7,1,1).p("AhKhRQB9AlAYB+");
	this.shape_3.setTransform(11,2.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:7.5,y:8.2}}]}).to({state:[{t:this.shape,p:{x:8.1,y:7.4}}]},3).to({state:[{t:this.shape_1,p:{x:8.8,y:6.25}}]},5).to({state:[{t:this.shape_2,p:{x:9.5,y:5.3}}]},4).to({state:[{t:this.shape_2,p:{x:10.45,y:3.9}}]},4).to({state:[{t:this.shape_3,p:{x:11,y:2.45}}]},4).to({state:[{t:this.shape_3,p:{x:11.8,y:1.2}}]},3).to({state:[{t:this.shape_1,p:{x:12.6,y:-1.45}}]},3).to({state:[{t:this.shape,p:{x:13.45,y:-2.6}}]},5).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.8,-15.6,30.6,36.9);


(lib.body_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#535353").s().p("AgFAVIgBgBIAAgBIAAAAIACgFIACgGIACgJIABgDIACgKIAAAAIACgFIAAAAIAAgBIABAAIAAAAIABAAIAAABIgBAFIAAABIgDAMQgCAGgDAKIgBAFIgBABIgBAAIAAAAg");
	this.shape.setTransform(149.4211,65.3545);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#303030").s().p("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");
	this.shape_1.setTransform(139.0275,108.6826);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#663300").s().p("AgEAKIADgHQABgHAGgIIgBACIAAAAIgKAXIABgDg");
	this.shape_2.setTransform(5.1375,56.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("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");
	this.shape_3.setTransform(138.9888,135.9189);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ACpEVQgwgcgUg/QgWg/AWhcIABgIIAAAAQABABAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIgBgBQAEgLABgGIADgLIAAgBIACgBQABAAAAAAQABgBAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIgDgCQAfhAAYgjQAYglBAAOQBAAPAYBGQAJAcAEAdQAEArgIAwIgDAAQAAABgBAAQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABAAIACACIgHA4QgJA1g9AxQgnAegiAAQgTAAgRgJgAkTCbQgzgPgXhNQgKgggCgjQgCgjAGgoIACAAQAAAAABAAQAAAAAAAAQABgBAAAAQABAAAAgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBgBIgCgBIAEgQQAVhdAzg3IAEgDQAPgPAPgKQBAgQArAnQArAmAFAgQADAfgDBRIgDABQgBAAAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABAAQAAABABAAIgDAOIgCAAQgBAAAAABQgBAAAAAAQAAABgBAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABAAIAAABIgCANQgDANgEAMQgVBKgtAvQgoAqgoAAQgMAAgMgEgABugEIAAAAIgBACIgCAJIADgLg");
	this.shape_4.setTransform(138.4867,65.4261);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0033").s().p("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");
	this.shape_5.setTransform(138.975,109.1903);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.5,278,219.7);


(lib.blink = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiHBCQhcgDAxgsQAxgrAqgVQArgVA0AAQA2AAApAVQAqAVAnAgQAmAghPAMQhPALg2ADQgbABgnAAIhPgBg");
	this.shape.setTransform(23.2879,7.7977);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("AiThbQAAACAAACQADC8AzBgQA0BgAfAiQAeAhAHAFQAaATAeAMQAiAQAfAFAiPgVQAAADABADIABAHIgCgNIgBgLQABAKgBgaAiThbIADArIADAoAiThbQAAgBAAAAQgBi8BXiI");
	this.shape_1.setTransform(7.411,58.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,1,1).p("AgykUQBRCAAQCKQAJBCgMBIIgDAOQgEAPgBgCQgKAqgGASIgDALAAMEVQALgmACgNQAKgvABgY");
	this.shape_2.setTransform(50.9754,44.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgUHuQgegEgigQQgagMgcgSIgCgBQgHgFgggiQgfgigzhgQg0hggCi7IAAgFIAAAFIAAgGIAAABIAAgBQgCi8BYiHQAjhHAwgfQBOgzAogDQAogEBBAQQBAAPA1BDQA1BDgfgKQBWBwAMCaQADAlgBAoQgBAfgEAfIgDANQgEAPgBgCQgKArgFARIgEALIAIAAIABAAQAHArgpBXQgpBXgSARIgxArQgeAchMAZQgUAHgWAAQgLAAgMgCgAEXDSIANgzIgNAzgAk3A3IAAAHIABAGIgCgnQABAZgCgKgAk4AdIgDgrgAE6hNQgQiKhSiAQBSCAAQCKgAk3A+IAAgHIABANg");
	this.shape_3.setTransform(24.2691,50.9645);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AitASQA0gyAngSQAngRA0AAQA1AAAnAUQAnAUAoAiQAoAkhRAKQhRAKg1ACIiNADIgGAAQhRAAAygyg");
	this.shape_4.setTransform(23.2992,7.903);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgUHuQgegEgigQQgagMgcgSIgCgBQgHgFgggiQgfgigzhgQg0hggCi7IAAgFIAAgBQgCi8BYiHQAjhHAwgfQBOgzAogDQAogEBBAQQBAAPA1BDQA1BDgfgKQBSCAAQCKQADAlgBAoQgBAfgEAfIgDANQgEAPgBgCQgKArgFARIgEALIAIAAIABAAQAHArgpBXQgpBXgSARIgxArQgeAchMAZQgUAHgWAAQgLAAgMgCgAEXDSIANgzIgNAzgAk3A3IAAAHIABAGIgCgnQABAZgCgKgAk4AdIgDgrgAk3A+IAAgHIABANgAk7gPIAAABIAAAFIAAgGgAk7gOIAAAAgADYlXQBWBwAMCaQgQiKhSiAgADYlXIAAAAg");
	this.shape_5.setTransform(24.2691,50.9645);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},4).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5},{t:this.shape_2},{t:this.shape_1}]},2).to({state:[{t:this.shape}]},2).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.3,1.1,65.4,100.30000000000001);


(lib.personMouth2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("AE0iEQAAB3hkBsQhjBth2AAQh3AAhXhZQhXhagEh/QgFiAA8AiQA8AhBmA1QBmA2CThiQCUhhAAB3g");
	this.shape.setTransform(15.7342,-47.8904);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(6,1,1).p("AFNjWQAFCDg/B3Qg+B4hIA0QhHA0hkANQhlANhDhQQhDhRgkhMQgjhLAEiMQAEiMA9ApQA9ApBkB3QBkB2CmizQCoi0AFCEg");
	this.shape_1.setTransform(17.4773,-40.3271);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(6,1,1).p("AE0iEQAAB3hkBsQhjBth2AAQh3AAhXhZQhXhagEh/QgFiAA8AiQA8AhBmA1QBmA2CThiQCUhhAAB3g");
	this.shape_2.setTransform(15.7342,-47.8904);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.8,-71.3,72.7,61.5);


(lib.personArm = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(6,1,1).p("ADYgwQiNB0kigW");
	this.shape.setTransform(21.6,4.9485);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(6,1,1).p("AjWA0QEjAPCKh3");
	this.shape_1.setTransform(21.7,4.4383);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(6,1,1).p("AjUA5QEjAJCGh7");
	this.shape_2.setTransform(21.775,3.9274);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(6,1,1).p("AjTA+QEjACCEh9");
	this.shape_3.setTransform(21.875,3.4766);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(6,1,1).p("AjSBDQEkgFCBiA");
	this.shape_4.setTransform(21.95,3.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(6,1,1).p("ADRhHQh+CEkjAL");
	this.shape_5.setTransform(22.05,2.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-7.6,49.2,20.5);


(lib.person_mouth = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3.8,1,1).p("ADsBhQg0BShyAoQhyAnhagbQhagbgfh+Qgfh+BNiHQBMiIAnC0QAnCzCCgjQCCghApAWQAqAVg0BSg");
	this.shape.setTransform(40.0412,38.7252);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3.8,1,1).p("Aj/BOQgfh+BNiIQBMiIAoCxQApCvCBggQCCghApAYQAoAWg0BTQg0BThzApQhyAnhagaQhagcgeh/g");
	this.shape_1.setTransform(39.9417,38.8524);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3.8,1,1).p("AkABPQgfh+BNiJQBNiIAqCuQApCsCBgfQCBghAoAaQAoAYg0BUQg1BUhzApQhyAohagbQhagcgeh/g");
	this.shape_2.setTransform(39.82,38.9971);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3.8,1,1).p("AkBBPQgeh/BNiIQBNiJArCqQAqCpCAgeQCBgfAoAbQAoAag2BVQg1BVhzAqQhyAohagbQhagdgeh/g");
	this.shape_3.setTransform(39.7082,39.1165);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(3.8,1,1).p("AkBBPQgeh/BNiJQBOiIAsCmQArCmCAgdQCAgeAoAdQAmAbg1BWQg2BXhzApQhzAphagbQhagdgdiAg");
	this.shape_4.setTransform(39.597,39.2524);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(3.8,1,1).p("AkCBQQgdh/BNiKQBOiJAtCkQAtCiB/gcQCAgcAmAeQAnAdg2BXQg3BXhzArQhzAphagcQhagdgdiAg");
	this.shape_5.setTransform(39.4814,39.3822);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(3.8,1,1).p("AkDBQQgdh/BOiKQBOiJAuCgQAuCgB/gcQB/gcAmAgQAmAfg3BYQg3BYhzArQh0AqhZgcQhagegdiAg");
	this.shape_6.setTransform(39.3834,39.5235);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3.8,1,1).p("AkEBRQgciABOiKQBOiKAvCdQAwCdB+gbQB/gaAlAhQAlAhg3BZQg3BZh0AsQh0AqhagdQhagegciAg");
	this.shape_7.setTransform(39.2627,39.6483);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(3.8,1,1).p("AkEBRQgciABOiKQBPiLAwCaQAwCZB+gZQB+gZAlAjQAlAig4BaQg4Bah0AsQh0ArhZgdQhbgegbiBg");
	this.shape_8.setTransform(39.1429,39.78);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(3.8,1,1).p("AkFBSQgciBBPiKQBPiLAxCWQAyCWB9gYQB+gYAkAlQAkAkg4BbQg4Bbh1AsQh0AshageQhagegbiBg");
	this.shape_9.setTransform(39.0325,39.8966);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(3.8,1,1).p("AkGBSQgbiBBPiLQBPiLAyCTQAzCTB9gXQB9gXAkAmQAkAng5BbQg5Bch1AtQh0AshageQhagegbiCg");
	this.shape_10.setTransform(38.9357,40.0183);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(3.8,1,1).p("AkHBSQgaiBBPiLQBPiLA0CPQA0CQB8gWQB9gWAjAoQAjAog5BcQg6Beh1AtQh0AshageQhagfgbiCg");
	this.shape_11.setTransform(38.8079,40.1594);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3.8,1,1).p("AkHBTQgaiCBPiLQBPiMA1CNQA2CMB7gVQB9gVAiAqQAjAqg6BdQg6Beh2AuQh0AthagfQhagfgaiCg");
	this.shape_12.setTransform(38.6965,40.266);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(3.8,1,1).p("AkIBTQgaiCBPiMQBQiLA2CJQA2CIB8gTQB8gUAiArQAiAsg7BeQg7Bfh1AvQh1AthagfQhagfgZiDg");
	this.shape_13.setTransform(38.6011,40.4091);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(3.8,1,1).p("AkJBUQgZiCBPiNQBQiMA4CGQA3CGB7gTQB7gTAiAtQAhAug7BfQg7Bgh2AvQh0AuhagfQhbgggZiDg");
	this.shape_14.setTransform(38.4822,40.5158);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(3.8,1,1).p("AkKBUQgZiCBQiNQBQiMA5CCQA5CDB6gSQB7gRAhAuQAhAvg8BgQg8Bih2AvQh1AuhagfQhagggZiEg");
	this.shape_15.setTransform(38.366,40.6314);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(3.8,1,1).p("AkKBUQgZiCBQiNQBQiNA6B/QA6B/B6gQQB6gRAhAxQAgAwg8BiQg9Bih2AwQh1AvhaggQhaghgYiEg");
	this.shape_16.setTransform(38.2603,40.7583);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(3.8,1,1).p("AkLBVQgYiDBQiNQBQiNA7B8QA8B7B5gPQB6gPAgAyQAfAyg8BiQg9Bkh3AwQh1AvhaggQhbghgXiEg");
	this.shape_17.setTransform(38.1623,40.8734);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(3.8,1,1).p("AkMBWQgXiDBQiOQBRiNA8B4QA8B5B5gOQB6gPAfA0QAfA0g9BjQg+Bkh2AxQh2AwhaghQhaghgYiEg");
	this.shape_18.setTransform(38.043,40.985);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(3.8,1,1).p("AkNBWQgXiDBRiOQBRiOA9B1QA+B1B4gNQB5gNAfA1QAeA2g+BkQg9Bmh3AxQh2AwhaghQhbghgXiFg");
	this.shape_19.setTransform(37.9223,41.1079);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(3.8,1,1).p("AkNBXQgXiEBRiOQBRiOA+BxQA/ByB4gMQB4gMAfA3QAeA4g/BlQg+Bmh3AyQh2AxhaghQhbgigWiFg");
	this.shape_20.setTransform(37.8322,41.218);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(3.8,1,1).p("AkOBXQgXiEBSiOQBRiPBABvQBABuB3gKQB4gLAdA4QAeA5g/BnQg/Bnh3AyQh2AxhbghQhagigWiGg");
	this.shape_21.setTransform(37.7046,41.3259);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(3.8,1,1).p("AkPBYQgWiEBSiPQBRiPBBBrQBBBsB3gKQB4gKAdA6QAdA7hABnQg/Bph4AyQh2AyhagiQhbgigWiGg");
	this.shape_22.setTransform(37.5958,41.4437);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(3.8,1,1).p("AkQBZQgViFBSiPQBRiPBDBoQBBBoB3gJQB3gJAdA8QAcA9hABoQhABph4AzQh2AzhbgiQhagjgWiGg");
	this.shape_23.setTransform(37.4966,41.5446);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(3.8,1,1).p("AkQBaQgViGBRiPQBTiQBDBlQBCBlB3gIQB2gHAcA9QAcA+hABqQhBBqh4A0Qh3AyhagiQhbgjgUiGg");
	this.shape_24.setTransform(37.3837,41.6479);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(3.8,1,1).p("AkRBaQgViGBSiQQBTiPBEBhQBEBhB2gGQB2gGAbA/QAcA/hBBrQhCBrh4A0Qh3A0hagjQhbgkgUiGg");
	this.shape_25.setTransform(37.2788,41.7608);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(3.8,1,1).p("AkSBbQgUiGBSiQQBTiQBFBeQBFBeB2gFQB1gGAbBBQAbBChCBrQhCBth4A0Qh3A0hagjQhbgkgUiHg");
	this.shape_26.setTransform(37.1615,41.8477);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(3.8,1,1).p("AkTBbQgUiGBTiRQBTiQBGBbQBGBbB2gEQB1gFAaBDQAaBDhCBsQhCBuh5A1Qh3A0hbgjQhaglgUiHg");
	this.shape_27.setTransform(37.0574,41.9577);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(3.8,1,1).p("AkUBcQgTiGBTiRQBTiRBIBXQBHBYB1gDQB0gDAaBEQAaBEhDBuQhDBuh5A2Qh4A1hagkQhbglgTiHg");
	this.shape_28.setTransform(36.953,42.0566);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(3.8,1,1).p("AkUBdQgTiHBTiRQBTiRBJBUQBJBUB0gCQB0gCAZBGQAZBGhDBuQhDBwh5A2Qh4A1hbgkQhaglgTiHg");
	this.shape_29.setTransform(36.8359,42.1584);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(3.8,1,1).p("AkVBdQgSiHBTiRQBTiSBLBRQBJBRB0gBQBzgBAZBIQAZBIhEBvQhEBxh6A2Qh3A2hbgkQhbglgSiJg");
	this.shape_30.setTransform(36.7256,42.2507);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(3.8,1,1).p("AkWBeQgSiHBUiSQBTiRBMBNQBLBOBzAAQBzAAAYBJQAYBKhEBwQhFByh6A3Qh4A2haglQhbglgSiJg");
	this.shape_31.setTransform(36.6284,42.3407);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(3.8,1,1).p("AkXBfQgRiHBTiTQBUiSBNBKQBMBLBzABQByACAYBKQAXBMhFBxQhFBzh6A3Qh4A3haglQhbgmgSiJg");
	this.shape_32.setTransform(36.5219,42.4245);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(3.8,1,1).p("AkXBgQgRiIBUiTQBUiSBOBHQBNBHByADQByACAXBMQAXBNhGBzQhFB0h6A3Qh5A3haglQhbgmgRiJg");
	this.shape_33.setTransform(36.3929,42.5102);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(3.8,1,1).p("AkYBhQgRiJBUiTQBUiSBPBDQBPBEBxAEQByADAWBOQAXBPhGBzQhGB1h7A4Qh4A4hbglQhbgngQiJg");
	this.shape_34.setTransform(36.3056,42.6125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(3.8,1,1).p("AkZBiQgRiJBViTQBUiTBRBAQBPBBBxAFQBxAEAWBQQAWBQhGB1QhHB1h7A5Qh5A4hagmQhbgmgQiKg");
	this.shape_35.setTransform(36.2018,42.6846);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(3.8,1,1).p("AkaBiQgPiIBUiUQBViTBRA9QBRA9BxAGQBwAFAVBSQAWBShHB1QhIB3h6A5Qh5A5hbgmQhbgngQiLg");
	this.shape_36.setTransform(36.0797,42.7696);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(3.8,1,1).p("AkbBkQgPiKBViUQBViTBTA5QBRA6BxAIQBwAGAUBTQAVBUhIB2QhHB4h7A6Qh6A5hagmQhbgogQiKg");
	this.shape_37.setTransform(35.974,42.8406);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(3.8,1,1).p("AkbBkQgPiJBViVQBViTBUA2QBTA3BwAIQBvAIAUBUQAUBWhIB3QhIB5h7A6Qh6A6hagnQhbgogPiLg");
	this.shape_38.setTransform(35.8799,42.9145);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(3.8,1,1).p("AkcBmQgPiKBWiVQBViUBVAzQBUAzBwAKQBvAJATBWQAUBXhJB4QhJB6h7A7Qh6A6hbgnQhbgogOiLg");
	this.shape_39.setTransform(35.7765,42.9942);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(3.8,1,1).p("AkdBmQgOiKBViVQBWiVBWAwQBWAwBuALQBvAKATBYQATBYhJB6QhKB7h7A7Qh6A7hbgoQhbgogOiMg");
	this.shape_40.setTransform(35.6559,43.0572);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(3.8,1,1).p("AkeBnQgOiKBWiVQBWiVBXAsQBXAtBuALQBuAMATBaQASBahJB6QhLB8h7A8Qh6A7hbgoQhbgpgOiMg");
	this.shape_41.setTransform(35.563,43.1214);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(3.8,1,1).p("AkfBpQgNiLBWiWQBWiVBZApQBXAqBuAMQBuANASBbQASBchLB7QhKB9h8A8Qh7A8hbgoQhbgpgNiMg");
	this.shape_42.setTransform(35.4586,43.1748);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(3.8,1,1).p("AkfBqQgNiLBWiWQBXiWBZAmQBZAmBuAOQBtANARBeQARBdhLB8QhLB/h8A8Qh6A8hbgoQhbgqgNiMg");
	this.shape_43.setTransform(35.3362,43.236);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(3.8,1,1).p("AkgBrQgMiLBWiXQBXiWBbAjQBaAjBtAPQBsAOARBfQARBfhMB+QhMB/h8A9Qh7A8hbgpQhbgpgMiNg");
	this.shape_44.setTransform(35.2331,43.2805);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(3.8,1,1).p("AkhBsQgMiLBXiXQBXiWBcAfQBbAgBsAPQBsAQARBhQAQBghMB/QhMCAh9A9Qh7A+hbgqQhbgqgMiNg");
	this.shape_45.setTransform(35.1491,43.3456);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(3.8,1,1).p("AkiBtQgLiMBXiXQBXiWBdAcQBdAcBrARQBsARAPBiQAQBihMCAQhNCBh9A+Qh7A+hbgqQhbgqgMiOg");
	this.shape_46.setTransform(35.0212,43.3914);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(3.8,1,1).p("AkjBvQgLiNBXiXQBYiXBeAZQBeAZBrASQBrASAPBkQAQBkhOCAQhNCCh9A/Qh7A+hbgqQhcgrgLiNg");
	this.shape_47.setTransform(34.9174,43.4294);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(3.8,1,1).p("AkjBwQgLiNBXiYQBYiXBfAVQBfAWBrAUQBrATAOBlQAPBmhOCBQhOCEh9A+Qh8A/hbgqQhbgrgKiOg");
	this.shape_48.setTransform(34.8278,43.4528);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").ss(3.8,1,1).p("AkkBxQgKiMBXiZQBYiXBhASQBgATBqAUQBqAUAOBnQAOBnhOCDQhPCEh9BAQh8A/hbgrQhbgrgKiPg");
	this.shape_49.setTransform(34.7124,43.4855);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(3.8,1,1).p("AklBzQgKiOBYiYQBYiYBiAPQBhAPBqAWQBpAVAOBpQANBphOCDQhPCGh+A/Qh8BAhbgrQhbgrgKiPg");
	this.shape_50.setTransform(34.6025,43.5137);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(3.8,1,1).p("AkmB0QgJiNBYiZQBYiYBjALQBjAMBpAXQBpAWANBrQANBqhPCFQhQCGh+BAQh8BBhbgsQhcgrgJiQg");
	this.shape_51.setTransform(34.5001,43.5357);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(3.8,1,1).p("AkmB2QgJiOBYiZQBYiZBlAIQBjAJBpAYQBpAXAMBsQANBshQCGQhQCHh/BBQh8BBhbgsQhbgsgJiPg");
	this.shape_52.setTransform(34.3991,43.5561);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").ss(3.8,1,1).p("AknB4QgJiOBZiaQBYiZBmAFQBlAGBoAYQBoAZAMBuQAMBuhRCGQhQCJh/BBQh8BBhbgsQhcgsgIiQg");
	this.shape_53.setTransform(34.2906,43.5406);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(3.8,1,1).p("AkoB5QgIiOBZiaQBYiZBnABQBmADBoAaQBoAZALBwQALBvhRCIQhRCJh/BCQh8BChcgtQhbgsgIiRg");
	this.shape_54.setTransform(34.1885,43.5457);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(3.8,1,1).p("AkpB7QgIiPBZiaQBaiZBngCQBogBBnAbQBnAbAKBxQALBxhRCJQhSCKh/BCQh9BChbgsQhbgtgIiRg");
	this.shape_55.setTransform(34.0828,43.5443);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(3.8,1,1).p("AkqB9QgHiPBZibQBaiaBpgFQBogEBnAcQBmAcAKBzQALBzhSCJQhTCMh/BCQh9BDhbgtQhcgtgHiRg");
	this.shape_56.setTransform(33.9841,43.5113);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(3.8,1,1).p("AkrB/QgGiPBZibQBaiaBqgJQBpgHBnAdQBmAdAJB0QAKB1hTCKQhSCNiABDQh9BDhbgtQhcgugHiRg");
	this.shape_57.setTransform(33.8816,43.464);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(3.8,1,1).p("AksCCQgGiQBaibQBaibBrgLQBrgLBmAeQBlAeAJB2QAJB2hTCMQhTCOiABDQh9BEhcguQhbgugHiRg");
	this.shape_58.setTransform(33.7549,43.3953);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").ss(3.8,1,1).p("AksCEQgGiQBaibQBaibBsgPQBsgOBmAfQBlAgAIB3QAJB4hUCNQhUCOiABEQh9BEhcgtQhbgvgGiSg");
	this.shape_59.setTransform(33.675,43.2966);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(3.8,1,1).p("AktCHQgGiRBaicQBbibBtgSQBugSBkAhQBlAgAIB6QAIB5hUCOQhVCQiABEQh+BFhbguQhcgvgFiSg");
	this.shape_60.setTransform(33.5689,43.2178);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(3.8,1,1).p("AkuCJQgFiQBbidQBaibBvgWQBugUBlAhQBkAiAHB7QAIB7hVCPQhVCQiABFQh+BFhcguQhbgvgGiTg");
	this.shape_61.setTransform(33.4463,43.1219);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(3.8,1,1).p("AkvCMQgEiRBaicQBbicBwgZQBwgYBkAiQBjAjAHB9QAHB9hVCPQhWCSiABFQh/BGhbgvQhcgvgFiTg");
	this.shape_62.setTransform(33.3467,43.0147);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(3.8,1,1).p("AkwCPQgEiSBbicQBbidBxgcQBxgbBjAkQBjAjAGB/QAHB+hWCRQhWCTiBBGQh+BGhcgvQhcgwgEiTg");
	this.shape_63.setTransform(33.2644,42.9235);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(3.8,1,1).p("AkwCSQgEiSBbidQBbicBzggQBygfBjAlQBiAlAFCAQAHCAhXCSQhXCUiABGQh/BHhcgwQhbgwgEiTg");
	this.shape_64.setTransform(33.1412,42.7994);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").ss(3.8,1,1).p("AkxCVQgDiTBbidQBbidB0gjQBzghBiAmQBiAmAFCBQAGCChXCTQhXCViBBGQh/BHhcgvQhcgxgDiTg");
	this.shape_65.setTransform(33.0367,42.6922);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(3.8,1,1).p("AkyCXQgDiTBbidQBcidB1gmQB0glBiAnQBhAnAFCDQAFCEhYCUQhYCViBBIQh/BHhcgwQhbgxgDiUg");
	this.shape_66.setTransform(32.9588,42.5884);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").ss(3.8,1,1).p("AkzCaQgDiTBcieQBcidB2gqQB1goBiAoQBhAoAECFQAECFhYCVQhYCXiCBIQh/BIhcgxQhcgxgCiUg");
	this.shape_67.setTransform(32.8576,42.4635);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(3.8,1,1).p("Ak0CdQgCiUBcieQBcidB4gtQB2gsBhApQBhAqADCGQAECHhZCWQhZCYiBBIQiABJhcgxQhbgygDiUg");
	this.shape_68.setTransform(32.7315,42.3519);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(3.8,1,1).p("Ak1CgQgBiUBcieQBcieB5gwQB4gvBgAqQBgArADCIQADCIhZCXQhaCZiCBJQh/BJhcgxQhcgygCiVg");
	this.shape_69.setTransform(32.6311,42.2499);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").ss(3.8,1,1).p("Ak2CjQgBiVBcieQBdieB6g0QB5gyBgArQBfAsACCKQADCKhaCYQhaCaiCBJQiABJhcgxQhbgygCiVg");
	this.shape_70.setTransform(32.5529,42.1091);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").ss(3.8,1,1).p("Ak2ClQgBiUBdifQBdifB6g3QB6g1BgAtQBfAsABCMQADCMhbCYQhaCbiDBKQiABKhbgyQhcgygBiWg");
	this.shape_71.setTransform(32.4282,42.0011);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(3.8,1,1).p("Ak3CpQAAiWBcifQBeifB7g6QB8g5BfAuQBeAuABCNQACCOhbCaQhbCciDBKQiABKhcgyQhcgyAAiWg");
	this.shape_72.setTransform(32.3262,41.8768);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").ss(3.8,1,1).p("Ak4CrQAAiVBdifQBdigB9g9QB9g8BeAvQBeAuABCPQABCPhcCbQhbCdiDBLQiBBLhbgyQhcgzAAiXg");
	this.shape_73.setTransform(32.2505,41.7678);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(3.8,1,1).p("Ak5CuQABiVBdigQBeigB9hAQB/hABeAwQBdAwAACRQABCRhcCcQhdCdiCBMQiBBLhcgzQhcgzAAiXg");
	this.shape_74.setTransform(32.1254,41.6449);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").ss(3.8,1,1).p("Ak6CxQACiWBdigQBeigB+hEQCAhDBeAyQBdAxgBCSQAACShcCdQhdCfiDBMQiCBMhbgzQhcg0AAiXg");
	this.shape_75.setTransform(32.0254,41.5224);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(3.8,1,1).p("Ak7C0QACiWBeigQBeihB/hHQCBhGBdAyQBdAzgBCTQgBCUhdCeQhdCgiDBMQiCBNhcgzQhcg0ABiYg");
	this.shape_76.setTransform(31.925,41.3868);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(3.8,1,1).p("Ak7C3QACiXBdigQBfihCBhLQCChJBcA0QBcAzgCCVQgBCWhdCfQheChiDBNQiCBNhcg0Qhcg0ACiYg");
	this.shape_77.setTransform(31.8259,41.2829);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(3.8,1,1).p("ADeB+QhfCiiDBNQiCBNhcg0Qhcg0ACiYQACiXBeihQBfihCChOQCDhNBcA1QBcA0gDCXQgBCYheCgg");
	this.shape_78.setTransform(31.7262,41.1507);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-1.9,70.30000000000001,86.10000000000001);


(lib.noki_hand = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1.3,1,1).p("AhWiXQACAAABADQAEAHAEARQAIAeAJA9QBQjAgWDfQDIgni2B1QCwAwjyAdQAAAAgCAAIgzhEIgCgEQABiXAHg2QACgTADgG");
	this.shape.setTransform(68.2368,15.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AlZDaQAAgKA7gZQA6gYApgfQBGg2BMgzQCIiiCNiMIA5g5IAzBEIACAAQgaAngbAlIgEAGQgeAogfAnQirDTjPCSIgsAeQgnAZgoAYIgIAFIgEABIgCABg");
	this.shape_1.setTransform(28.775,57.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgyCZIgzhEIgCgEQABiXAHg1QACgTADgHIADgCIABAAIADADQAEAHAEASQAIAdAJA+QBQjBgWDfQDIgni2B1QCwAwjyAdIgCAAg");
	this.shape_2.setTransform(68.2368,15.2875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.noki_hand, new cjs.Rectangle(-5.8,-0.9,85.5,92), null);


(lib.heartsTrash = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D61414").s().p("AA6UBQgRgEgQgHIgJgBQi4gth0hyQAAgFgCgCIhEg1QgFAAgEgCQgGgDgFgFQAAgFgBgFQgLgggmgIQAAgFgCgDQgmglgogjQgFAAgCgCQgIgIgFgKQAAgFgCgDQgagrgqgdQAAgFgCgEQgLgcgbgNQAAgFgCgDQg/hNg3hVQAAgFgBgFQgQgrghgbQAAgFgBgEQgLgngcgWQAAgFgCgEQgIgQgKgPIAAgKQgCgmgcgMIAAgKIAAgUQAAgFgCgEQitltAFohQASgqgHhEIgBgKQAfg9ARhKIAAgBQgDgHAEgHIAIgNIADgQQACgIAEgKQABgGAEgEIAAAAIgBgDQAQABgFgWIgBgJIAAgKIAAgKQAQABgFgVIgBgKQAggXAQgmQACgEAAgFQAjgeAhggQACgDAAgFQA1glAxgpQADgCAFAAQAjgKAhgOQACgBAAgFQAtAFASgWQACgDAFAAICMAAIAKAAQAfAZAxAFIAKAAQASARAfAIQABAAAAAFQAOAaAbAMQAEACAFAAQASASAPAUQACACAFAAQAMAhAVAZQACACAFAAQAJAfATAVQACADAAAFQACAmAVAUQACACAFAAQBgDvArEjIAAAKQgGBbAjgGQABAAAAgFQAegQAJgjIABgJIAAgKQASgMAKgTQACgEAAgFQAkgdAWgqQACgEAAgFQBOhcBahRQACgCAAgFQAfgJARgXQACgDAAgFQBcg1Bag3QADgCAFAAQBlgxCLgQIAAgFIA8AAIAKAAQAwAWAsAaQADACAFAAQA1AvAHBdIAAAKIAADIIAAAKIAAALIgFAeQgHBbgcBEIAAAeIAAAKIgFABQgFBFgeAoIAAAUIAAAKIgBAJQgiCQhBB0QgFAAAAABQgGAcgTAfIAAAKQgFAAgBACQgKAVgOAkIAAABQAAAFgCAEQhVC4hnCnQgFAAgBACQgXAngMArQgHAPgGAIQgGAIAAAFQADAFgYAeIgzA+IAHgHIgGAJQgNAWgGAdIgBAKQgGAcgXAMQgEACgFALQgFAJgLAOQgNAPgPAPQgEAEgCAFQgKAWgOAUIgPAUIgdAnIgUAZIgRATQgPAQgPALQgQAKgJAIIgUARIgUANIgVAMQgTAKgMAEIgCAAQgeAYglAPQAAgFgRgEgAovHBQAAABAFAAQBCA7AhBcQABAEAAAFQAxALAKAxIABAKQAbAIAkAoQACACAFAAQCrC1C7CbQAUAXATAJIBIA5IAEgOQAJgdARgWQgGgLAJgWQAKgWAAgEIADgMIAEgTQE3pJEFptQBPi8AdjhQAFAAAAgBQANhCgSgrQgFAAgDgCQgTgPgrAHIgKAAQgjAAgZAUQAAAFgBABIhjAiQgFAAgKAGQgKAHgjAHIAAAKQimBniECMQiDCJg1DUQglCTg8B4QgFAAgEABQigArgBikIABgKQAKiCgVhZIAAgKIAAhQIABgKQAHg/gSglIgBgKQgljxg+jbIAAgKQgPiWhphaIgJgBQhYgVhdAWQAAAFgCACQiWB1g/DKIAAADQgBASACAJIAAAGIACABQACACAAAFQggIeCxF5IgFAAQBaBjAZB4g");
	this.shape.setTransform(1244.143,-176);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D61414").s().p("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gBACIAAAAQADADAAAEIABAMIABAKIAEAJQABAGgDACIAAABQACAwAPAqIgCAHQgQAmAHAdQhTFEjECzIgDAFIgDAMIgBAGQgZABgHAWIgCAFIgTAPIgDAFQgaAIgPATQgCADAAADQgfAJgTAWQgCACgBAEQg5Ang/AgQgCABAAADQgYACgNANQgDADgBADQglAIgcAUIgDAEQgGAFgHACQgCABgEgBQgmANgjAOQgDABAAADQgggDgOARQgCACAAADIgLADIgHgBIg+ARQgBAAAAAAQgBAAAAABQAAAAgBABQAAAAAAABQhWAhhwAAQghAAgjgDgA6f50IAEACQgMCLAgCAQBvGpCaGcIABANIAAAIQAAACAEAPQAEAOgHAGQALARACATIABAJIBDgSQARgCATgJQCvg0CkhGQAFAAACAAQAjgQAXABIACgFQAQgbAoADIADgFQApgwA+gUQABAAABABQAAAAABAAQAAAAABAAQAAAAAAgBQAmhCBZgnIgFgBQDJi6A9lHQABgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAIABgBIACgDQADgGACgKIAAgCQgTiFhkhmQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQhHgghJgHIgHgCQhjAggjBUIgCAHQhUB0hECHIgDAFQgTATgEAnIgCAFIgNAwIgBAFQgeAxgNBQIgCAFQgaBih5g8IgHgDQgehUgGhgQgJiIhShtQhThvh1hhIACgGQgcgMgHgFQgGgGgEgCIhJgpQAAAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAgBQgSgRgbgIIgIgCQghgNgSAEQgDABgEgBQgUAVgBAqg");
	this.shape_1.setTransform(1164.2524,-231.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D61414").s().p("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");
	this.shape_2.setTransform(1164.2524,-333.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D61414").s().p("EASzA43QgRgDgQgIIgJgBQi5gsh0hzQAAgEgCgCIhEg1QgFAAgEgCQgGgEgFgEQAAgGgBgEQgLghgmgIQAAgEgCgDQgmglgogkQgFABgCgDQgIgHgFgLQAAgEgCgEQgagrgqgdQAAgFgCgEQgLgbgbgNQAAgGgCgCQg/hNg3hVQAAgGgBgEQgQgrghgbQAAgFgBgFQgLgmgcgXQAAgEgCgFQgIgPgKgPIAAgLQgCglgcgMIAAgKIAAgUQAAgGgCgDQitluAFoiQASgqgHhEIgBgKQAfg9ARhKIAAgBQgDgGAEgIIAIgMIADgQQACgIAEgKQABgHAEgEIAAAAIgBgCQAQAAgFgVIgBgKIAAgKIAAgKQAQABgFgVIgBgJQAggXAQgnQACgEAAgFQAjgdAhghQACgDAAgFQA1glAxgoQADgDAFAAQAjgJAhgOQACgCAAgFQAtAFASgWQACgDAFABICMAAIAKAAQAfAYAxAFIAKAAQASARAfAIQABAAAAAFQAOAbAbAMQAEACAFAAQASARAPAUQACACAFAAQAMAhAVAZQACACAFAAQAJAfATAWQACACAAAGQACAlAVAUQACACAFAAQBgDwAsEiIAAAKQgGBbAjgFQABAAAAgGQAegPAJgjIABgJIAAgLQASgLAKgUQACgEAAgFQAkgdAWgqQACgEAAgFQBOhcBahQQACgDAAgFQAfgJARgWQACgEAAgEQBcg1Bag3QADgCAFgBQBlgxCLgQIAAgEIA8AAIAKAAQAwAVAsAaQADACAFAAQA1AwAHBdIAAAKIAADHIAAAKIAAALIgFAeQgHBcgcBDIAAAfIAAAKIgFAAQgFBGgeAnIAAAUIAAAKIgBAKQgiCRhBBzQgFAAAAACQgGAcgTAeIAAAKQgFAAgBACQgKAWgOAkIAAABQAAAFgCAEQhVC4hnCnQgFAAgBABQgXAngMAsQgHAOgGAJQgGAHAAAFQADAFgYAeIgzA+IAHgHIgGAKQgNAVgGAeIgBAJQgGAdgXALQgEADgFAKQgFAKgLANIgbAfQgFADgCAGQgKAVgOAUIgPAVIgdAmIgUAaIgRATQgPAQgPAKQgQAKgJAJIgUAQIgUAOIgVAMQgTAJgMAEIgCABQgeAXglAPQAAgEgRgFgEAJJAr3QAAABAFAAQBCA8AhBbQABAFAAAFQAxALAKAxIABAKQAbAHAkAoQACADAFgBQCrC2C8CbQAUAWATAJIBIA5IAEgNQAJgdARgXQgGgLAKgVIAKgaIACgNIAEgTQE3pIEFpvQBPi7AdjiQAFAAAAgBQANhCgSgrQgFAAgDgCQgTgPgrAIIgKAAQgjAAgZATQAAAFgBABIhjAjQgFgBgJAHQgKAGgkAIIAAAKQimBniECLQiDCKg1DUQglCUg9B3QgFAAgEACQigAqgBikIABgKQAKiDgVhYIAAgLIAAhPIABgLQAHg+gSgmIgBgKQgljxg+jbIAAgKQgPiVhphbIgJgBQhYgUhdAVQAAAGgCABQiVB2hADKIAAADQgBARACAKIAAAGIACABQACACAAAEQggIfCxF6IgFAAQBaBiAZB4gAvhXUIgHgCQgOABgPgCQgOgBAAADQgbgRgUgUIgCgCQgKgEgNgKIgPgLIgNgNIgOgNQgGgHgKgJQgLgLgJgMIgLgPIgMgTIgRgdIgIgPQgJgPgEgPQgBgEgDgDIgRgYQgHgKgCgHQgDgHgDgCQgQgMgBgSIACgGQgBgTgHgPIgDgHIAEAFIgegvQgOgYACgCQABgCgEgGIgHgRQgCgcgLgcIgGgCQg3h6gnh+QgBgDAAgDIABgBIgKgnIgFgCIACgGQgLgWAAgSIgDgBQgihTgEhdIABgGIABgFIAEgNQgSgeAGgqIgDgBIACgGIAEgSQgLguAJg4IAAgSIACgHIABgFIAgh3IACgGQAVg1AxgSIAHABQAngEAqgEIAIADIAwALIgBADQBsAoBJAyIAHADQA+A1BBAyQgBADACADQAJAQAYANQAAAAgBABQAAAAABABQAAAAAAABQAAABABAAQA7BDAvBIQgBADABACQAMAeAXAYQgBADABADQAFAOANALIgBAGIgCAFQADAXAVAQQAAABgBAAQAAABAAAAQAAABAAAAQABAAAAAAQAaALAKg3IACgGQBRiiByh6IAHABQATgIAIgWQABgDACgBQATgJALgQQAEABACgBQAVgKAPgRQAEABACgBQAQgIAQgIIAIACQAYgCAPgMIABgDQAaACARgHIAIACQApAIAcgIIAIADIBvAdQAFABABACQALASBWAnQAFABABACQAhAjAlAhQgBADABACIAsA0IABAEQAGAaAWAVIgCAFQgIAMANADIgCAGIgBAGIgCAGQgIALANACIgBAC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");
	this.shape_3.setTransform(1129.625,-415.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D61414").s().p("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");
	this.shape_4.setTransform(1129.625,-483.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},6).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4}]},6).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(908.6,-915.2,442.1,868.2);


(lib.flywing = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(0.1,1,1).p("AgFgbIAFAQQATgFgLgiAAAgLIAHAAQgOAiAGAcAgSgsQgCATAPgCQAEAzgQAbAAHgLQASgFgBAaQAMARgRAYAgjgVQANAhgMAcAAjgpQAFApgQAK");
	this.shape.setTransform(-12.9797,-56.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AANAzQAKgOAAgLQAAgJgFgGQAMgIAAgYIgCgUIACAUQAAAYgMAIIAAgBQAAgVgMAAIAAAAIgBAAIgFAAQgJAZAAAVQAAAJABAHIgPAAIgPAAQgCgDgBgIQAGgNAAgPQAAgPgHgSQAHASAAAPQAAAPgGANIAAgCIgDgkQgBgMADgLQADgIAEgFQAEgHAGgDQgBARALAAIABAAIAAAAIABAAIABAAIABAAIgBAAIgBAAIgBAAIAAAAIgBAAQgLAAABgRQAKgGAOgBIADABQAEAMAAAJQAAAPgMADIgFgQIAAATQAAAmgMAVQAMgVAAgmIAAgTIAFAQQAMgDAAgPQAAgJgEgMQAOABAMAIIAHAGQAQAQgJATQgKARgGAQQgFALgHAHgAAAgLIgGAAgAANAzIgVAAQgBgHAAgJQAAgVAJgZIAFAAIABAAIAAAAQAMAAAAAVIAAABQAFAGAAAJQAAALgKAOgAASALIAAAAgAACgyIAAAAg");
	this.shape_1.setTransform(-12.3342,-56.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#666666").ss(0.1,1,1).p("AgXglQAGAkARgMQARgCgVBGAAAgmQgQAHAQASAAAgmIAPALQADA1gQAbAgbgbQAdA+gTATAASAuIAAAAQAAABgBABQAAABAAAAAAPgbIANAJAAAgmQASAFgHgVAgMgxQAPADgDAI");
	this.shape_2.setTransform(-11.7375,-57.4875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AgHA4IgEAAIgEgBQAIgHAAgPQgBgWgSgkIAFgKIAAAAIAAABIAAABQAEAYAKAAIAAAAIAAAAQAEAAADgCIAAAAIAAAAIAAgBIABAAQAQAAgRA8IgCAEIAAADIgBABIABgBIAAgDIACgEQARg8gQAAIgBAAQgGgJAAgGQAAgGAHgEQgHAEAAAGQAAAGAGAJIAAABIAAAAIAAAAQgDACgEAAIAAAAIAAAAQgKAAgEgYIAAgBIAAgBIAAAAIABgEQADgGAGgDQAGgIAHABQAJAAABADQALAGADALQAEALgBAIIgMgJIgQgMIAFABIABAAIABAAQAJAAgEgPIgBgBIABABQAEAPgJAAIgBAAIgBAAIgFgBIABgCQAAgGgNgDQANADAAAGIgBACIAQAMIAAAPQAAAqgOAXQAOgXAAgqIAAgPIAMAJQAAAOgEAPQgGAYABAKIAAAAIgBADIgBAAIgPAFIgGABIgCAAIgCAAgAgPA3QgJgFACgCIgCgOIgDgaQgDgSAEgPQASAkABAWQAAAPgIAHIAAAAgAgTA2IAAgBIAEACIgEgBgAASAyIABAAIgBAAIAAAAIAAAAgAASAyIAAAAgAgagZIAAAAgAARgZgAgVgjIAAAAgAABglgAABglIAAAAgAABglgAABglIAAAAg");
	this.shape_3.setTransform(-11.8717,-57.6273);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#666666").ss(0.1,1,1).p("AgFghQACAfgCAZQgCAXgFASAgjgYQAHAYAAAXQAAAVgGATAgFghIAFAYIAHAAQgFAQgCAQQgDAVAAAUAAYAVQABAAABACQAHARgIAYAAAgJQATgHgKgvAgSg4QgCAbAPgEAAHgJQASgIgBAmAAjg1QAFA7gQAP");
	this.shape_4.setTransform(-10.9297,-58.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AATBAQAEgMAAgLQAAgKgEgIIgBgDQAMgKAAgjIgCgcIACAcQAAAjgMAKIAAgBQAAgdgMgBIgBAAIAAAAIgEABIgBAAIABAAIAEgBIAAAAIABAAQAMABAAAdIAAABIABADQAEAIAAAKQAAALgEAMIgcAAIAAgFQAAgSADgSQACgQAEgRIgGAAQAMgEAAgWQAAgLgEgQQAEAQAAALQAAAWgMAEIgFgXIgBABIAAAAIgCAAIAAAAIgBAAQgKgBAAgSIAAgFIAAAFQAAASAKABIABAAIAAAAIACAAIAAAAIABgBIABAbIgCAdQgBAXgFASIgWAAIgBgBQAGgUAAgUQAAgXgHgYQAHAYAAAXQAAAUgGAUIAAgFIgCgjIgBgOQgBgSADgPQADgLAFgIQADgJAGgEQAFgFAFgCIARAAIAKAAQAJAEAHAGIAHAJQAQAXgJAZIgHATIgJAdIgEAMgAgSBAQAFgSABgXIACgdIgBgbIAFAXIAGAAQgEARgCAQQgDASAAASIAAAFgAASAUIAAAAgAgLghg");
	this.shape_5.setTransform(-10.2842,-58.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#666666").ss(0.1,1,1).p("AgXglQAGAkARgMQARgCgVBGAAAgmQgQAHAQASAAAgmIAPALQADA1gQAbAgbgbQAdA+gTATAASAuIAAAAQAAABgBABQAAABAAAAAgMgxQAPADgDAIQASAFgHgVAAPgbIANAJ");
	this.shape_6.setTransform(-11.7375,-57.4875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCCCC").s().p("AgHA4IgEAAIgEgBQAIgHAAgPQgBgWgSgkIAFgKIABgEQADgGAGgDQAGgIAHABQAJAAABADQALAGADALQAEALgBAIIgMgJIAAAPQAAAqgOAXQAOgXAAgqIAAgPIAMAJQAAAOgEAPQgGAYABAKIAAAAIgBADIgBAAIgPAFIgGABIgCAAIgCAAgAgDA4IABgBIAAgDIACgEQARg8gQAAIgBAAIABAAQAQAAgRA8IgCAEIAAADIgBABgAgHgJQAEAAADgCIAAAAIAAAAIAAgBQgGgJAAgGQAAgGAHgEQgHAEAAAGQAAAGAGAJIAAABIAAAAIAAAAQgDACgEAAIAAAAIAAAAQgKAAgEgYIAAgBIAAgBIAAAAIAAAAIAAABIAAABQAEAYAKAAIAAAAIAAAAgAARgZIgQgMgAAIgkQAJAAgEgPIgBgBIABABQAEAPgJAAIgBAAIgBAAIgFgBIABgCQAAgGgNgDQANADAAAGIgBACIAFABIABAAIABAAgAgPA3QgJgFACgCIgCgOIgDgaQgDgSAEgPQASAkABAWQAAAPgIAHIAAAAgAgTA2IAAgBIAEACIgEgBgAASAyIABAAIgBAAIAAAAIAAAAgAASAyIAAAAgAgagZIAAAAgAARgZg");
	this.shape_7.setTransform(-11.8717,-57.6273);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},4).to({state:[{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_7},{t:this.shape_6}]},4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.6,-65.7,11.900000000000002,15.400000000000006);


(lib.flower = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#006600").ss(2,1,1).p("AAgj9Qh6ExByDK");
	this.shape.setTransform(20.5283,66.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF99").s().p("AglAtQgSgSABgaQgBgYASgSQAQgSAWAAIADACIAEADIAJACIAIAGQAHACAGAAIACgBIABABIACAAIABABIAAAJQAMAPgBATQgJAIgDAMQgCAJAAAIIgCACIgFAFQgKAAgHAEIgJAHIgHAAIgCAAIgHgBIgGAGQgNgEgKgLg");
	this.shape_1.setTransform(27.75,28.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF33CC").s().p("AA7EGQgcgOgXguQgVguADgrQACgZAJgOIAEgFIAEAAIAGAAIACAAIAGAAIAJgHQAIgEAJAAIAGgFIACgCQgBgIACgJQADgMAKgIQAAgTgMgPIAAgJIAAgCIgDAAIgGABIgBAAIgBgBIgCABIgGgCIAAAAIgIgGIgJgCIgEgDIgCgCQgFgHgEgKIgCABQgNAIgSgEQgBAIgEAHQgKARgWAEQAOAQAAATQAAANgIALQAPAHAHANQAHAMgCAPQgBARgOATIgMAPQgWAbggAVQgnAagPgWQgNgVghgNQghgNAMgeQAGgQAPgOQgOgHgBgNQgCgagWgcQgWgaAZgUQATgPAhgEQgUgRAIgRQALgXgFgjQgGgjAfgFQAUgDAaAKQADgGAFgEQAVgPANghQAMghAeAMQAdAMAZAsIADAGQAKgVARADQAZAFAhgOQAfgPANAdQAMAcgLAtQAbgRAOAQQAQAUAiAJQAiAJgJAfQgIAfgpAeIgNAJQAlAJgEAYQgFAZAOAhQAPAggdANQgeANgxgOIgPgEIAIANQAXArgWANQgWANgOAgQgKAXgRAAQgIAAgJgEg");
	this.shape_2.setTransform(26.9646,26.6025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower, new cjs.Rectangle(1,0,52,93.4), null);


(lib.cloud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ap4JBQwNFMHItwQowptUzg4QHroXI1KYQW8GH1AIGQicHxmaAAQlCAAnik2g");
	this.shape.setTransform(138.0412,88.721);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({x:141.9912,y:87.321},0).wait(1).to({x:145.9412,y:85.921},0).wait(1).to({x:149.8912,y:84.471},0).wait(1).to({x:153.8412,y:83.071},0).wait(1).to({x:157.8412,y:81.671},0).wait(1).to({x:161.7912,y:80.271},0).wait(1).to({x:165.7412,y:78.821},0).wait(1).to({x:169.6912,y:77.421},0).wait(1).to({x:173.6412,y:76.021},0).wait(1).to({x:175.3412,y:77.721},0).wait(1).to({x:177.0412,y:79.421},0).wait(1).to({x:178.7412,y:81.121},0).wait(1).to({x:180.3912,y:82.821},0).wait(1).to({x:182.0912,y:84.521},0).wait(1).to({x:183.7912,y:86.221},0).wait(1).to({x:185.4912,y:87.871},0).wait(1).to({x:187.1912,y:89.571},0).wait(1).to({x:188.8912,y:91.271},0).wait(1).to({x:190.5412,y:92.971},0).wait(1).to({x:192.2412,y:94.671},0).wait(1).to({x:193.9412,y:96.371},0).wait(1).to({x:189.9412},0).wait(1).to({x:185.9912},0).wait(1).to({x:181.9912},0).wait(1).to({x:177.9912},0).wait(1).to({x:174.0412},0).wait(1).to({x:170.0412},0).wait(1).to({x:163.6412,y:94.821},0).wait(1).to({x:157.2412,y:93.321},0).wait(1).to({x:150.8412,y:91.771},0).wait(1).to({x:144.4412,y:90.271},0).wait(1).to({x:138.0412,y:88.721},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-12.7,332,197.79999999999998);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_כפתור_התחלה_סוף = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// כפתור_התחלה_סוף
	this.start = new lib.startToPlay();
	this.start.name = "start";
	this.start.setTransform(629.8,165.7,3.1899,2.614,0,0,0,-128.4,7.2);
	new cjs.ButtonHelper(this.start, 0, 1, 1);

	this.replay = new lib.playagain();
	this.replay.name = "replay";
	this.replay.setTransform(1241.65,289.5,0.1709,0.1608,0,0,0,14.9,18.9);
	new cjs.ButtonHelper(this.replay, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},1).to({state:[{t:this.replay}]},794).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_הסוף = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// הסוף
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#535353").s().p("AAzAKIAAgBIgBAAIgBAAIgBgBIAAgBIgBAAIgBABIgBABIgBAAIgCgBIgBAAIAAAAIgDgBIgDAAIgDAAIgEABQgEAAgEgCIgCgCIgDABIgCgBIgTgEIAAAAIgRgCIgBAAIAAgBIABgBIAAAAIAQACIABAAIACAAIgDgBQgLgEgJABIgCAAIgNADQgFABgGgFIAAAAIAAgBIABgBIABAAIAAABQAEADAFgBIAEgBIAKgCIABAAIALABIAKACIAUAHIABAAIAAABIABAAIAAAAIABgBIABAAQAFAAAEACIAJACIAFAAIABgCIABAAIABAAIAAABIABAAIAEgBIACABIAAAAIABABIACABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABIgBAAIgBAAg");
	this.shape.setTransform(928.7393,351.2375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#303030").s().p("AE0IaIgBABIgBAAIACgBgAFSHbIAHgKQgUAlgZAeQAVgdARgcgAGJFoIADgKIgCALIgDAKIAAABQgLAxgZAvQAXgwAPg8gAnBFJIgBgBIABABQAAAAAAAAQAAABABAAQAAABAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAABAAQAAAAABAAIAAgBIADgBIABgFQAIAeAMAbQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAAAIgEgBIAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAIgBADQgMgcgJgegAnEE9IABABIACACIgBABIgBABgAm7E+IABgCIAAgBIABAGIgCgDgAKEEfQgPAVgRAKQASgOAOgRgAIUEwQgugtguguIgRgQIgBgBIgLgMIAAAfIAAAAQgBAkgDAkIAEhpICFCDQgHgEgFgFgAnGE2IgBgHIACADIACAAIgCACIgBADIAAgBgAm+EzIgCgBIACgCIAAgCIACAFIAAABIgCgBgAnQD4QgCgWAAgVIACgYQgCAiADAhQACAcAGAaQgHgcgCgagAJ+EXIAAAAIgBABIgBABQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAgAKuDKIAGgXIABgCIAAABIAAABIgGAVIAAABIgCAHQAAgDABgDgAK0CsIACgDIgBAFIgBgCgAKsCnIABADIgCADIABgGgAGeCsIgBgCIABABIABABIgBAAgAF6CMQgOgbgCgYQgEgxAMgpQgPgTgPgRIgBAAQgUgYgWgVQhCg+hNglQgDACgCgDIgCgCIgBAAIgCgBIgDABIgCgBIgCAAIgDgBIgBAAIgDgBIAAgBIAEgBIADAAIACAAIADABIABAAIABAAIACABIABAAIABgBIAAgBIACAAIAAABIAAABIABAAIABAAIABAAIAAABIABgBQABAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAIgCgBIgBgBIgBAAIgCgBIgEABIgBAAIAAgBIgBAAIgBAAIgBACIgEAAIgJgCQgFgCgFAAIgBAAIAAAAIgBABIAAgBIgBAAIAAAAIgWgIIgJgCQhdgcgXgCQgQgChIAEIACAAIAIABIAIAAIAKABQAvADAMAEIATACIABAAIA9AMIAYAEIgLABIgEACQgEABgEgDIgBgBIgBAAIgBABIAAAAIABABQAFAFAGgBIAMgDIACgBQAJAAAMAEIADABIgCAAIgBAAIgQgCIgBAAIgBABIAAABIABAAIARADIABAAIAUAEIACABIACgBIACACIAAAAIgEABIgGgBIgigGIgdgEIg/gMIgSgCIgBAAQgLgEgvgDIAAAAIgKgBIgBAAIgFgBIgBAAIgJAAIgEAAIgQgBIg5gCIgCgBIgKgBQAAAAgBAAQgBAAAAAAQgBgBAAAAQAAAAgBAAIgBgCQgBAAABAAIgBgCQAAgBAAAAQABgBAAAAQAAgBAAAAQABAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQCagKAYADIABAAQAdADCZAuQABABAAAAQABAAAAAAQABABAAAAQAAABAAABIABABQBPAmBEBAQAWAVAVAYIAhAmIABAEIAAACQgNAoAEAwIAAABQACAVANAZIAAAAQAJAQAOAQIAAABIACACIgCgCIgBAAIgCgCIgDAAIgCACIgBADIgBABQgNgQgJgQgAKuCYIACADIAAABIgCABQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAABIAAABQgBgEACgFgAK1CeIAAgBIACgCIABgBQgCAEABADIgCgDgAnKB2IgVgEIAEgBIABgBIABgCQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAIgCgDIAZAFIgBAAIgEABQgBABAAAAQAAABAAAAQAAABgBAAQAAABAAAAIABADIgEAXIADgWgAKvB3IABACIgBACIAAgEgAK6BoIAAgHIAAgnIAAgCIAAgBIAAgBIABAEIAAAZIgBAOIAAAIIAAgBgApyBIIgBgBIgBAAIgBAAIgBAAIgQgEIAAgBIAAAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAgBIABgBIAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAIgBgCIAQAFIABAAIABABIABAAIACABIgEABIgCACIAAABQAAABAAAAQAAAAAAABQABAAAAABQAAAAAAABIADACIgCgBgAqOBAIgBAAIgCgBIgBAAIgCAAIgOgFIgBAAIgBgBIgBgBQgHgBgFgLIgIgZIgBgFIABABIAAAAIAEACIABAAIACgBIACgDIAAACIABABQADAPAEAJQADAGADABIADACIANAEIACgBIACABIAEACQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAIgBADIgBABQAAAAAAAAQAAABAAAAQABABAAAAQAAABAAAAIABABIgBAAgAqHA3IgBAAIADABIgCgBgAKHg9IgMgRQgMgRgNgMIgBgCQgchRhGhFIgVgVQghgdgngaIgSgLIAAAAQgigWgjgUIgCgBQgQgLgRgGIAAgBIg4geQinhQiLgIIgBAAQiEgLhsAhIAAABQgjAJgeAOIgDABIgBABQgUAJgUALIAAAAIgGADQgZAPgUATIgBAAQgLAKgJALIAAAAQgjAmgYA2IgBACIgCABQgmAFgfAdIgHAFIAAABIgRAVIAAAAQgUAZgMAfIAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAIgBgBIgDgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAABQANggATgaIASgVIABgBQADgCACgDIABAAQAggeAngHQAYg1AjgmQAKgMAMgKIAAAAQAVgVAagPIABAAIAFgDQATgLAVgJIAFgDIAAABQAfgOAjgKIAAAAQBugiCGALQCNAICpBRIA4AfQASAHARAKIAAABIABABIAAAAIBGApIAAABIARAKQAoAaAiAeIAVAWQBHBGAdBTQANAMAMARIABAAIAMASQAhA1AJBCIgCgCQAAgBAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAIgBAAIgDABIgCAEIAAABQgHhAghg0g");
	this.shape_1.setTransform(918.5625,370.9497);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AExFwIgCgBIrGh+IAAAAIgDgCIgCgDIgLgWIAAgBIAAgDQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAIAAgBIADABQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAAAAIALAWIAEABIACABIK9B8QAZgeAVglIAAgBIAAAAIACgEQAWgtAOg4IAAgBIADgKIAKg9IAEhyIAAgBIABgCIADgCIADAAIACABIAAABIADACIAAAAIACACIABAAIAAABIAAAAICHCCIAwAJIAGgCQASgOANgQIABgBIABgBIABgBIABgCQAVgeANgjIAAgDIABgBIABgCIABgHIAGgWIAAgBIAAgBIACgDIgBgDIABgGIAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAIACgBIgBgBIgCgDIAAgBIABgBIAAgbIABgCIABgBQAAAAABgBQAAAAAAAAQABgBABAAQAAAAABABQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIABABIAAACIAAAcIgBAAIAAABIAAABIgBABIgCABIABABIABADIgBAIIgBADIAAACIAAAAIABABIAAABIgBACIgGAXQgCADABADIAAABIgCADIAAAAIAAADQgOAkgWAfIAAACIgBABIgCACIAAAAQgOARgSAPIgCABIAAAAIgKAEIgDAAIgzgJIAAAAIgDgCIiFiCIgEBpIAAAAIgKA+IAAAAIgDALQgPA8gYAwIAAAAIAAAAQgUAmgaAfIgBAAIgBACIAAgBIAAACIgDACIgBABIgCgBgAm6CdQgBAAAAgBQgBAAAAAAQAAgBAAAAQgBAAAAgBIAAAAIAAgBIgBgDIAAgCIABgCIAAgBIgBgBIgBgBIAAgBIgBgCIgBgCIAAgCIAAgCIADgCIgCgBIgDgCIAAgBQgFgbgCgcQgDggABgiIADgpIAEgWIAAgDQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAIAEgBIABAAIADADIACACIAAACIgFAZIgDAnQgBAiADAfIAAABQABAbAGAaIAAABIgBADIgCACIACAAIACACIABAEIABAAIABADIAAAAIgBADIACACQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAABIABACIAAAAIgBAEIgCACIgBAAIgBAAIgCgBgAJMBpQgHgGgBgKQgCgkgLgcIAAgBQgIgZgQgTIgBAAQgIgLgLgJIABAAQghgZg0gEQgJgBgGgGQgGgHABgJQABgJAHgGQAHgGAIABQBDAFAqAiIAAAAQAOALALAOQAVAZALAgIABABQAMAiADArQABAJgGAHQgGAGgJABIgDAAQgIAAgFgFgAK8g5QAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAIAAgNIAAgDIAAgFIAAgBIAAgnIAAAAIAAgDIAAgBIACgDIACgBIABAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAIABACIAAABIABAAIAAACIAAABIAAABIgBAnIAAAHIABABIAAABIgBAAIAAANIgCgCgAnbg8IiPgoIgCgBIgCgCQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAIAAgBIABgDIAEgBIABAAIABABICQAoIAAABIADACQAAAAAAABQABAAAAABQAAAAAAABQgBAAAAABIAAABIgCACIgDAAgAqChrIgCgBIgCAAIAAAAIgCgBIgBgBQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBIAAgBIABgCQABgBAAAAQAAAAABAAQAAgBABAAQAAAAABABIACAAIABAAIABABIADAAIABABQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAIAAACIgCABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBABAAAAgAmWiLQgJgCgGgHQgkgxgogVQgggQghAEIgBABQgRACgPAHIgBAAQgeAMgfAbQgHAGgJgBQgHAAgFgFIABANIABAEIgBABIABACIgCADIgCACIgCAAIgDgCIgBgBIgBgBIAAgCIAAgCIAAgCIgIhEIABgBIAAgEIAAgBIACgiIACgZIgBgDIABgBIAFgYIABgEIAJgZIAAgBIABgGIABgBIABgBIAAgBIAAAAIABgBQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAABABIACAAIABABQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABIAAABIgBAFIAAABIAAABIgBABIgJAZIAAACIAAACIgFAWIAAABIAAABIgCAaIAAABIgCAhIAAAGIACAXIADgDQAmggAkgPQAVgJAWgDQAvgHAtAXQAwAYAsA8QAFAHgBAJQgCAIgHAGQgGAEgHAAIgDAAgAqtipIAAABIgBgCg");
	this.shape_2.setTransform(918.125,388.3939);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0033").s().p("AmQGWIgCgBIgEgBIgKgWIgBAAQgMgbgJgeIAAAAIgBgCQABgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgBgFIgBgDIAAAAIgBgEIAAgBIgCgGIABgBQgHgaAAgbIAAgBQgEgfACgiIADgoIAEgZIAAgCIgCgCIgCgDIgagFIAAgBIiQgoIgBgBIAAAAIgCAAIgBgBIgCAAIAAAAIgQgFIgDAAIgCgBIgCAAIgFgCIgBgBIgCAAIgNgEIgEgBQgDgCgCgFQgEgJgDgPIgBgCIAAgCIAAgCIAAgBIgBgEIgBgMQAFAFAHAAQAJABAHgGQAfgbAegMIABAAQAQgHAQgCIABgBQAhgEAgAQQAoAVAlAwQAFAHAJACQAJABAHgFQAHgGACgIQABgJgFgGQgsg8gvgYQgugXgvAHQgVADgWAJQgkAPgmAgIgDADIgBgXIAAgGIABghIAAgBIACgaIAAgBIAAgBIAFgWIAAgCIABgCIAJgZIAAgBIABgBIAAgBIABgFQAMgfAUgaIAAABIAQgVIABgBIAGgGQAfgcAngGIABgBIACgCQAYg1AjgmIAAAAQAJgMALgJIAAAAQAVgTAZgPIAGgDIAAAAQAUgLATgJIABgBIAEgCQAegOAjgJIAAAAQBrghCFAKIABAAQCKAJCoBQIA3AeIABAAQAQAHARAKIACACQAjATAiAWIAAAAIASALQAnAaAhAdIAVAWQBFBEAdBSIABACQANAMAMARIAMAQQAgA0AIBAIABADIAAAAIAAAnIAAABIAAAFIAAADIgBANQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIADgBIAAAFQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBABAAAAIAAABIgBgCIgBAEIAAAbIgBABIAAABQgBAFAAAEIgBAGIgBAGIAAACIAAABIgGAWIgBAHIgBACIAAABIAAADQgOAjgVAeIgBACQgBABAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQgOAQgSAOIgFACIgxgJIiHiDIAAAAIAAgBIgCgBIgBgBIAAAAIgCgCIAAgBQgOgQgKgRIABAAQgNgYgCgWIAAAAQgEgxAMgoIAAgCIAAgDIghgmQgVgZgWgVQhFg/hOgnIgBgBQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBgBAAQiZgugdgDIgBAAQgYgEiaAKQgBAAAAABQgBAAAAAAQgBAAAAABQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAAAABQAAAAAAABIAAACQgBAAACAAIABABQAAABABAAQAAAAAAAAQABABABAAQAAAAABAAIAKABIACAAIA5ADIAPAAIAFABIAJAAIAAAAIAGABIABAAIAKABIAAAAQAuACALAEIABAAIATADIA+AMIAeAEIAhAFIAHABIAEgBIAAAAQAEACAFAAIAAABIADACIABAAIADABIACAAIACAAIACAAIADABIABAAIACABQABADAEgCQBNAmBCA+QAVAVAVAXIABABQAPARAPATQgMApAEAxQACAYAOAaQAJARANAPIgEBzIgKA9IgDAKIAAABQgOA4gVAtIgCAEIAAAAIgBABIgHALQgRAcgWAcgAIcCYIAAAAQAQATAIAaIABABQAKAcACAkQABAKAHAGQAGAGAKgBQAJgBAGgGQAGgHgBgJQgCgrgNgiIgBgBQgLghgUgZQgMgOgNgLIgBAAQgqgihCgFQgJgBgHAGQgHAGgBAJQgBAJAHAHQAFAGAJABQA0AEAiAZIgBAAQAKAJAJALgAqwADIgBgBIABACg");
	this.shape_3.setTransform(918.4,371.0733);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AgJgiIAOA8IAFAJ");
	this.shape_4.setTransform(994.825,330.5125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#303030").ss(1,1,1).p("AAAgDQAAADAAABQABACAAAB");
	this.shape_5.setTransform(993.7375,326.6125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AkiH/QgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBIgRgSIgBgBIAAgDQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBIAAAAIADgBIAEABIAAABIAQASIAEgBIADABILFhDQAQgkAKgpIAAAAIAAgBIABgEQAIgygBg6IAAAAIAAgLIgGg+IgBAAIgahvIAAgBIAAgDIACgCIADgBIACABIABAAIACABIABAAIACACIAAAAIABAAIABAAIAAABIClBaIAwgEIAFgEQAOgSAJgTIABgCIAAgBIAAgBIABgCQANgjACglIAAgDIAAgBIAAgCIAAgHIAAgWIAAgBIgBgCIABgDIgBgCIAAgBIgBgGIAAgBIAAgEIACgBIgBAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIgBgBIAAgBIgGgaIAAAAIAAgBIAAgCIABAAIABgBIAFAJIAAgJIgDgCIAAAAIAAAAIADAAIAAABIACABIABACIAGAbIABABIAAABQgBAEABACIAAABIACAHIAAABIgBADQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAIAAABIABAAIAAABIAAACIAAABIAAAIIAAANIAAABIABAGIAAABIgBADIAAABIAAADQgDAmgMAkIgBACIAAABIgBACIgBABQgJAUgOATIAAABIgBAAIgIAHIgDABIgzAEIgBAAIgCgBIikhaIAYBmIAAABIAGA+IAAAAIAAAMQADA+gKA0IgBAAIAAABQgJAqgRAkIABABIgCACIABgBIAAACIgCADIgDABIgDgBIrNBDIgBABIgDgBgAlXG4QgBAAAAgBQgBAAAAAAQAAgBgBAAQAAAAAAgBIgBAAIAAgBIgBgCIgBgCIAAgCIAAgBIgBgBIgCAAIAAgBIgCgCIgBgCIgBgBIAAgBIAAgCIACgCIgCgBIgDgBIAAgBQgNgYgJgaQgLgfgIghIgJgpIAAgFIgCgSIgBgCIABgEIADgCIABAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABABIACACIAAACIALBBQAHAgALAeIAAAAQAKAaAMAXIAAACIAAACIgCADIADAAIACABIACADIABABQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABIAAAAIAAADIADACQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIABABIABABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAAAAAIgBABIgBAAIgCAAgApGDuIgBAAIgDgBQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAIgBgBIACgDIADgCIAAAAIACAAICWAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABIAAABIgBACIgDACgApiDuIgBAAIgCgBIgCAAIgCgDIABgCQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIACgBIACABIABgBIADAAIABABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAIABACIgCACIgDACIAAAAIgCABIgCAAgAqdDKIgBgBIgBgDIAAgBIgBgCIgahAIAAgBIAAgDIgBgBIgHgiIgFgZIgBgDIAAAAIgBgZIgBgEIADgbIAAAAIgBgHIABgBIAAAAIAAgBIAAAAQAEgjAMgeIALgZIAAgBQADgDACgDIAAgBQAXglAkgRQAJg6AYguQAGgOAJgNIAAAAQAPgZAVgWIABgBIAEgDQAPgQASgPIAEgEIAAABQAagWAfgTIAAAAQBhg9CEgaQCMgeC3AhIA+APQATACATAFIABABIABABIgBAAQAnAJAoAMIAAAAIAUAGQAtAPApAUQAOAGAMAJQBXAwAyBIQAQAIAQANIAAABIARANQAvArAZA+IgCgBIgDgDQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAABIABAFIABADQAAABAAABQAAAAAAAAQAAAAgBAAQAAAAgBgBIgDgEIAAABQgYg8gugqIgQgMQgQgNgQgJIgBgBQgxhHhWgwQgMgIgOgGQgngUgtgOIgVgHIABAAIhOgVIgCgBQgSgFgSgCIgBgBIg+gOQi1ghiKAeIAAAAQiCAZhgA9IAAAAQgeASgaAWIgCACIgBABIghAeIAAAAIgFAEQgUAWgOAXIgBABQgIAMgGANIAAAAQgYAugIA6IgBADIgCABQgjAPgWAkQgCAEgDADIgBABIgKAYIAAAAQgMAegEAhIAAAFIAAACIAAABIgCAaQAAAAAAABQAAAAAAAAQAAAAAAAAQAAABABAAIAAACQAAALABALIABACIAAABIAFAZIAAABIAHAhIACAFIAIAWIACgDQAbgqAfgXQATgOAUgJQArgUAyALQA1AKA5AtQAHAGABAJQABAJgGAHQgFAHgJABQgJABgHgFQgxgmgrgKQgkgHgeAOIgBAAQgPAHgNAKIgBAAQgaAUgXAjQgFAHgJACQgHACgGgDIAFAMIABADIAAABIABACIAAAAIgBAEIgBACIgCAAIgBAAIgDgBgAqZC+IABAAIgBgBgAJ8BzQgJgEgDgJQgMgjgRgYIgBgBQgPgXgUgOIAAAAQgMgHgMgFQgngQgyAKQgJACgIgFQgHgGgCgIQgCgJAFgHQAFgIAJgCQBCgNAxAWIABAAQAQAHAPAKQAaATAUAcIABABQAUAdAOAoQAEAJgEAIQgEAIgJADQgEACgEAAQgEAAgEgCg");
	this.shape_6.setTransform(925.725,339.7857);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0033").s().p("AktHjIgBAAQgTgXgQgbIAAAAIgBgCQAAAAgBgBQAAAAAAAAQAAgBAAAAQgBAAAAAAIgCgGQAAAAgBAAQAAgBAAAAQAAAAAAAAQgBgBAAAAIAAAAIgCgEIAAAAIgDgGIgBgBQgMgXgJgaIAAgBQgLgdgIghIgKhBIgBgCIgCgCQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAAAAAIgBAAIgZABIiVgBIgCAAIgBAAIgBAAIgBAAIgCAAIAAAAIgQAAIgDAAIgDAAIgCAAIgCAAIgBAAIgCAAIgCgBIgCABIgNgBIgEAAQgDAAgEgFQgGgIgHgNIgBgCIgBgBIAAgBIgBgBIAAgCIgCgDIgFgMQAHADAHgBQAIgCAGgIQAXgiAagUIAAAAQANgLAQgGIAAgBQAfgNAkAHQArAJAxAmQAHAFAJAAQAJgBAFgHQAFgIAAgIQgBgJgHgGQg6gug1gKQgxgLgrAUQgVAJgSAOQggAYgbApIgBAEIgJgXIgBgEIgIghIAAgBIgFgaIAAgBIAAgBQgCgLAAgMIAAgCQAAAAAAAAQAAAAgBAAQAAgBAAAAQAAAAABAAIACgaIAAgCIAAgBIgBgGQAEggANgfIAAABIAKgYIAAgBQADgDACgFQAXgjAjgQIABgBIABgDQAJg5AXguIABAAQAGgOAIgMIAAAAQAOgYAVgVIAEgEIAAgBIAhgdIABgBIADgDQAZgVAfgSIAAgBQBfg8CCgaIABAAQCJgdC2AhIA+AOIAAAAQASADASAEIADABIBNAWIAAAAIAVAGQAsAPAnATQAPAHAMAIQBVAvAxBHIACACQAQAIAPANIARANQAtApAYA9QAAAAAAAAQAAABAAAAQABAAAAABQAAAAABAAIAAABIAKAlIAAABIABAFIABADIADAMIAAAAIAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABgCABAGIgBABIAAABIgCgCIABADIAAABIAAABIAHAaIAAAAQAAAGABAFIABAFIAAABIABAFIAAACIAAABIABAWIAAAHIgBADIABABIAAACQgDAmgNAjIAAACIgCAEQgJASgNASIgFAEIgxAFIilhbIAAAAIgBAAIAAgBIgCgBIgBAAIAAAAIgDgCIAAAAQgRgMgOgNIABgBQgTgUgIgUIAAAAQgSguACgqIAAgCIgCgCQgVgQgVgNQgbgSgbgOQhSgshXgQIAAgBIgEgCQifgDgeAFIgBAAQgXADiTAzQgBAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIABACQgBABACgBIAAABQABAAAAABQABAAAAAAQABAAAAAAQABgBABAAIAKgBIACAAIA4gNIAPgEIAEgBIAIgBIABAAIAFgBIABAAIAKgDIABAAQAtgKAMABIABAAIATgCQAKAAA2gGIAcgDIAigEIAGgBQABAAAAAAQABAAAAgBQAAAAABAAQAAgBABAAIAAAAQAFABAEgBIAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAAAIABAAIADAAIACAAIACgBIADgBIACAAIABAAIACABQACACAEgCQBTAQBRAqQAaAOAaARIABABQAUAMATAOQgBAsARAuQAIAWAVAVQANAOARAMIAbBuIAAABIAGA9IAAALIAAABQACA6gJAxIAAAFIAAAAIgBABIgEAMQgJAfgMAiIrGBCIgCAAIgEABIgQgTgAIYgHQAMAGALAHIABAAQAUANAPAXIAAABQARAZANAiQADAJAIAEQAIAEAIgDQAJgDAEgIQAEgIgDgJQgOgogVgdIgBgBQgTgdgbgSQgPgLgQgHIAAAAQgygVhBANQgJACgFAHQgFAIACAIQABAJAHAFQAIAFAJgBQAUgEASAAQAcAAAYAJgAqYC+IgBgBIACACgAK6hDIADACIAAAJg");
	this.shape_7.setTransform(925.6917,339.7288);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#303030").s().p("AlwE1IgBgBIABAAQAAABAAAAQABABAAAAQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAIABgBQAAAAAAAAQABAAAAgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAQAbATAWIgEgBIgDABIAAAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABIAAADQgTgYgRgbgAGiE1IgBABIgBABIACgCgAGuDwIAEgMQgKApgQAkQANghAJgggAl2ErIACAAIABABIAAABIAAACgAltEpIAAgDIAAAAIADAFIgDgCgAl9EeIADABIACABIgCACIAAACgAlzEfIgDAAIACgDIAAgCIADAFIAAABIgCgBgAmUDrQgIgVgFgUIgFgXQAIAhALAfQAJAaANAYQgOgZgJgZgAHDBzIAAgMIABAMIABAKIAAABQACAzgLA0QAKg0gDg+gAmxBtIgVABIADgCIABgCIAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAIAYAAIgDACIgBAEIABACIACASIgCgQgAqABsIgBAAIgCABIgPgBIgCAAIgBAAQgHAAgIgKQgGgIgHgNIgDgFIABABQABAAAAAAQABABAAAAQABAAAAAAQABAAAAAAIACAAIABgCIABgEIABACIABABQAHAOAGAHQAEAFADABIAFAAIAMABIADgBIABAAIADABIAAgBIACABQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIgBACIACADIACAAIgBABIgCAAgApgBtIgBgBIAAABIgBAAIgBAAIgQAAIgBgBIAAAAIADgCIACgCIgBgCQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBgBAAIgBgBIAQABIABgBIABAAIABABIACAAIgDACIgCADIABABQAAAAAAABQAAAAAAAAQAAABABAAQAAAAABABIADABIgBAAIgCAAgAp5BiIADAAIgBABIgCgBgAGlg9ICkBZQgIgBgGgEQg5geg4ghIgUgKIgCgBIgOgIIAIAeIABAAQAIAiAGAjgAKigWQgJAXgOAPQAOgSAJgUgAKagdIAAABIAAABIgBACIABgEgAF7heQgVgVgJgXQgRguABgrQgTgPgUgMIAAAAQgagSgbgOQhQgqhUgQQgDADgCgCIgDgBIAAAAIgDAAIgDABIgBAAIgCABIgEAAIAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgBgBQgEABgEgBIgBAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABAAAAIgGAAIghAFIgdADQg3AFgKAAIgTADIgBAAQgMgBgtAKIAAAAIgKACIgBAAIgFABIgBAAIgJACIgEABIgPADIg3ANIgDAAIgKACQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIgBgBQgBAAABgBIgBgBQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAgBABAAQCSgyAYgDIAAgBQAegFCfAEIAEACIABABQBWAQBTArQAbAOAbASQAVANAVAQIABACIABACQgCArARAtIAAABQAIAVATAUIAAAAQANANARAMIABABIACABIgCgBIgBAAIgCgBIgDABIgCACIAAADIAAABQgRgMgNgOgAh0lZQgPAChFAWIACAAIAIgCIAIgBIAJgCQAugKANABQAJgCAKgBIAAAAIBAgFIAYgDIABAAIAKgCIgkAAQhCAAgSADgAGmhHIgCgCIABABIABABgAK0h0IAAgBIABABIAAAGIgBgGgAK0iLIAAgBIABABIgBAIIAAgIgAKpiTIABACIgBADIAAgFgAKyiSIABgDIAAAFQAAAAAAgBQAAAAAAAAQAAAAgBgBQAAAAAAAAgAKmikIABABQAAAAAAABQAAAAAAAAQABABAAAAQABAAAAABIABAAIgCABQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIAAABQgCgEAAgGgAKfjDIABABIAAACIgBgDg");
	this.shape_8.setTransform(927.925,352.6779);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,1,1).p("AgIgiIANA8IAEAJ");
	this.shape_9.setTransform(955.525,311.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#303030").s().p("AleE1IAAgBIAAAAQABABAAAAQAAABAAAAQABAAAAAAQABABAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAIAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBgBAAQAAgBAAAAQAPAbASAWIgDgBIgEABIABAAQAAABgBAAQAAAAAAABQgBAAAAABQAAAAABABIAAADQgSgYgRgbgAGNE1IgBABIgBABIACgCgAGYDwQABgGADgGQgJApgPAkQALghAJgggAljErIACAAIABABIAAABIAAACgAlbEpIAAgDIAAAAIADAFIgDgCgAlpEeIACABIACABIgCACIAAACgAlgEfIgDAAIACgDIAAgCIADAFIAAABIgCgBgAmADrQgIgVgEgUIgFgXQAIAhAKAfQAJAaAMAYQgNgZgJgZgAGtBzIAAgMIAAAMIABAKIAAABQADAzgLA0QAJg0gCg+gAmcBtIgTABIADgCIAAgCIABgBQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAIAXAAIgEACIgBAEIACACIABASIgCgQgApgBsIgBAAIgCABIgNgBIgDAAIgBAAQgGAAgIgKIgNgVIgCgFIABABQABAAAAAAQAAABABAAQAAAAABAAQAAAAAAAAIACAAIACgCQAAgBAAAAQAAAAABgBQAAAAAAgBQAAAAAAAAIAAABIABABQAHAOAGAHQADAFADABIAFAAIAMABIACgBIABAAIADABIAAgBIACABQgBAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAIAAACIABADIACAAIgBABIgBAAgApBBtIgBgBIAAABIgBAAIgCAAIgOAAIgBgBIAAAAIACgCIACgCIgBgCQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgBgBIAPABIABgBIABAAIABABIABAAIgCACIgCADIABABQAAAAAAABQAAAAAAAAQAAABABAAQAAAAABABIACABIgBAAIgBAAgApZBiIADAAIgCABIgBgBgAGPg9ICdBZQgIgBgGgEQg2geg1ghIgTgKIgCgBIgNgIIAIAeIAAAAQAIAiAGAjgAKAgWQgIAXgNAPQANgSAIgUgAJ5gdIAAABIgBABIgBACIACgEgAFoheQgUgVgIgXQgRguABgrQgRgPgUgMIAAAAQgYgSgagOQhMgqhQgQQgDADgCgCIgCgBIgBAAIgCAAIgDABIgBAAIgCABIgEAAIAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAIgBgBQgDABgEgBIgBAAQAAABgBAAQAAABAAAAQgBAAAAAAQAAABgBAAIgGAAIgfAFIgbADQg1AFgJAAIgSADIgBAAQgLgBgrAKIAAAAIgKACIgBAAIgFABIgBAAIgIACIgDABQgIACgHABIg1ANIgCAAIgKACQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAIgBgBQgCAAABgBIgBgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQAAgBABAAQCLgyAXgDIAAgBQAcgFCYAEIADACIABABQBSAQBOArQAaAOAaASQAUANATAQIACACIAAACQgBArAQAtIAAABQAIAVASAUIAAAAQANANAPAMIABABIACABIgCgBIgBAAIgCgBIgDABIgCACIAAADIAAABQgQgMgMgOgAhulZQgPAChBAWIACAAIAIgCIAHgBIAJgCQArgKANABQAIgCAKgBIAAAAIA9gFIAWgDIABAAIAJgCIghAAQg/AAgRADgAKRh0IAAgBIABABIAAAGQgBgDAAgDgAKRiLIAAgBIABABIAAAIIgBgIgAKHiTIABACIgBACIAAgEgAKQiSIAAgDIAAAFIAAgCgAKFikIAAABQAAAAAAABQAAAAAAAAQABABAAAAQAAAAABABIABAAIgCABIAAAEIAAABQgBgEAAgGgAJ+jDIAAABIAAACIAAgDg");
	this.shape_10.setTransform(891.95,333.8279);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF0033").s().p("AkeHjIgBAAQgSgXgPgbIAAAAIgBgCQAAAAAAgBQAAAAgBAAQAAgBAAAAQAAAAgBAAIgCgGQAAAAAAAAQAAgBgBAAQAAAAAAAAQAAgBgBAAIAAAAIgCgEIAAAAIgDgGIAAgBQgMgXgJgaIAAgBQgKgdgHghIgKhBIgBgCIgCgCQAAAAgBAAQAAgBAAAAQgBAAAAAAQAAAAgBAAIgBAAIgXABIiOgBIgCAAIgBAAIgBAAIgBAAIgBAAIgBAAIgPAAIgDAAIgDAAIgCAAIgCAAIAAAAIgCAAIgCgBIgCABIgMgBIgEAAQgDAAgEgFQgGgIgGgNIgBgCIgBgBIAAgBIgBgBIAAgCIgCgDIgEgMQAGADAGgBQAJgCAFgIQAWgiAYgUIABAAQAMgLAPgGIAAgBQAdgNAjAHQAoAJAvAmQAHAFAIAAQAJgBAEgHQAGgIgBgIQgBgJgGgGQg3gugygKQgvgLgpAUQgUAJgRAOQgeAYgaApIgBAEIgIgXIgCgEIgHghIAAgBIgFgaIAAgBIAAgBQgCgLAAgMIAAgCQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIACgaIAAgCIAAgBIgBgGQAEggAMgfIAAABIAKgYIAAgBIAFgIQAVgjAhgQIACgBIABgDQAIg5AWguIABAAQAFgOAIgMIAAAAQAOgYATgVIAEgEIAAgBIAggdIABgBIACgDQAYgVAdgSIAAgBQBbg8B8gaIAAAAQCDgdCsAhIA7AOIAAAAQARADASAEIACABIBKAWIgBAAIAUAGQAqAPAlATQAOAHAMAIQBRAvAuBHIACACQAPAIAPANIAPANQAsApAWA9QAAAAAAAAQABABAAAAQAAAAAAABQAAAAABAAIAAABIAJAlIAAABIACAFIABADIACALIABgCQABgCACAHIgCAAIAAABIgBgBIAAADIAAABIAHAaIAAAAQAAAGABAFIABAFIAAABIAAAFIAAAAIABACIAAABIAAAWIAAAHIAAADIAAABIAAACQgCAmgMAjIgBACIgBAEQgJASgNASIgEAEIguAFIidhbIAAAAIgBAAIgBAAIgBgCIgBAAIAAAAIgDgCIAAAAQgQgMgNgNIAAgBQgSgUgHgUIAAAAQgRguACgqIgBgCIgBgCQgUgQgUgNQgagSgZgOQhPgshSgQIAAgBIgEgCQiXgDgdAFIAAAAQgWADiMAzQAAAAgBAAQAAABAAAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQABABAAAAIABACQgBABABgBIABABQAAAAABABQAAAAABAAQAAAAABAAQAAgBABAAIAJgBIADAAIA0gNQAIgBAHgDIADgBIAJgBIAAAAIAFgBIABAAIAKgDIAAAAQArgKALABIABAAIASgCQAKAAA0gGIAagDIAggEIAGgBQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAIABAAQAEABAEgBIAAAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAAAIABAAIADAAIACAAIABgBIADgBIADAAIAAAAIACABQACACAEgCQBPAQBMAqQAaAOAYARIABABQATAMASAOQgBAsAQAuQAIAWAUAVQAMAOARAMIAZBuIAAABIAGA9IAAALIAAABQABA6gIAxIAAAFIAAAAIgBABQgCAFgBAHQgJAfgMAiIqiBCIgCAAIgEABIgPgTgAH9gHQALAGALAHIABAAQATANAOAXIAAABQARAZALAiQADAJAIAEQAIAEAIgDQAIgDAEgIQAEgIgEgJQgNgogTgdIgBgBQgTgdgZgSQgOgLgQgHIAAAAQgvgVg+ANQgJACgFAHQgEAIACAIQABAJAHAFQAHAFAJgBQATgEARAAQAaAAAXAJgAp3C+IAAgBIABACgAKYhDIACACIAAAJg");
	this.shape_11.setTransform(889.8167,320.8788);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AkTH/QgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBIgRgSIAAgBIAAgDQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBIgBAAIAEgBIADABIABABIAPASIAEgBIACABIKihDQAPgkAJgpIABAAIAAgBIAAgEQAIgygBg6IAAAAIAAgLIgGg+IgBAAIgZhvIAAgBIAAgDIACgCIADgBIACABIABAAIACABIABAAIAAABIACABIABAAIABAAIAAABICcBaIAugEIAFgEQANgSAIgTIABgCIABgBIAAgBIAAgCQANgjACglIAAgDIAAgBIAAgCIAAgHIAAgWIAAgBIgBgCIAAgBIABgCIgBgCIAAgBIgBgGIAAgBIAAgEIACgBIgBAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAAgBIAAgBIgHgaIAAgBIAAgCIABAAIABgBIAFAJIAAgJIgDgBIAAgBIAAAAIADAAIABABIABABIABACIAGAbIABABIAAABQgBAEABADIABAHIAAABIAAADIAAACIAAABIABAAIAAABIAAACIAAABIABAIIgBANIAAABQAAADABADIAAABIgBADIAAABIAAADQgCAmgMAkIgBACIAAABIgBACIgBABQgIAUgNATIgBABIAAAAIgIAHIgCABIgyAEIAAAAIgCgBIidhaIAYBmIAAABIAGA+IAAAAIAAAMQACA+gJA0IgBAAIAAABQgIAqgRAkIABABIgCACIABgBIAAACIgCADIgCABIgDgBIqqBDIAAABIgDgBgAlGG4QAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAgBgBIAAAAIgBgBIAAgCIgBgCIAAgCIAAgBIgBgBIgCAAIgBgBIgBgCIgBgCIgBgBIAAgBIAAgCIACgCIgCgBIgCgBIgBgBQgMgYgJgaQgKgfgIghIgIgpIgBgFIgBgSIgCgCIABgEIAEgCIABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABIACACIAAACIAKBBQAIAgAKAeIAAAAQAJAaAMAXIAAACIAAACIgCADIADAAIACABIABADIABABQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABIAAAAIAAADIADACQAAAAABAAQAAABAAAAQAAAAAAABQABAAAAABIABABIAAABQAAAAAAABQABAAAAABQAAAAgBABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAIAAABIgCAAIgCAAgAopDuIgBAAIgCgBQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAIgBgBIACgDIACgCIAAAAIACAAICPAAQAAAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABIgBABIAAACIgDACgApEDuIAAAAIgCgBIgCAAIgBgDIAAgCQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAIACgBIABABIACgBIADAAIABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIABACIgCACIgCACIAAAAIgDABIgCAAgAp7DKIgBgBIgBgDIAAgBIgBgCIgZhAIAAgBIAAgDIAAgBQgEgPgEgTIgEgZIgBgDIgBAAIgBgZIAAgEIADgbIAAAAIgBgHIABgBIAAAAIAAgBIAAAAQADgjAMgeIAKgZIAAgBQAEgDABgDIAAgBQAXglAhgRQAJg6AXguQAFgOAJgNIgBAAQAPgZAUgWIABgBIAEgDQAOgQARgPIAEgEQAZgVAegTIgBAAQBcg9B+gaQCEgeCuAhIA7APQATACARAFIABABIABABIAAAAQAkAJAmAMIAAAAIATAGQArAPAnAUQANAGAMAJQBSAwAwBIQAPAIAPANIABABIAPANQAtArAYA+IgCgBIgCgDQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAABIACAGIABADQAAABAAAAQAAAAgBABQAAAAAAgBQgBAAgBgBIgDgEIAAABQgXg8grgqIgQgMQgOgNgPgJIgCgBQguhHhSgwQgLgIgOgGQglgUgqgOIgUgHIABAAIhLgVIgCgBQgRgFgRgCIgBgBIg6gOQisghiDAeIAAAAQh8AZhbA9IAAAAQgdASgYAWIgCACIgBABIggAeIAAAAIgEAEQgTAWgOAXIgBABQgHAMgFANIgBAAQgXAugIA6IgBADIgBABQghAPgVAkIgFAHIgBABIgJAYIAAAAQgMAegEAhIABAFIAAACIAAABIgDAaQAAAAAAABQAAAAAAAAQAAAAABAAQAAABAAAAIAAACQAAALACALIAAACIAAABIAFAZIAAABIAHAhIABAFIAIAWIACgDQAagqAdgXQASgOATgJQApgUAvALQAzAKA3AtQAGAGABAJQAAAJgFAHQgFAHgIABQgJABgHgFQgugmgpgKQgigHgdAOIgBAAQgOAHgNAKIAAAAQgYAUgXAjQgEAHgJACQgHACgGgDIAFAMIACADIAAABIABACIAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAAAABIgCACIgCAAIAAAAIgDgBgAp4C+IACAAIgCgBgAJcBzQgIgEgDgJQgMgjgQgYIgBgBQgOgXgSgOIgBAAQgLgGgMgGQglgQgvAKQgJACgIgFQgGgGgCgIQgBgJAEgHQAFgIAJgCQA9gNAvAWIABAAQAPAHAOAKQAaATASAcIABABQAUAdANAoQAEAJgEAIQgEAIgIADQgEACgEAAQgEAAgEgCg");
	this.shape_12.setTransform(889.85,320.9357);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,1,1).p("AmqhuIgUgGAmvB1QgBgDAAgCQAAgBAAAAQgCgMgBgKQgOhZAPhJIAHgjAG/gyIgBAPIAAAFIgBADIgDAdIgBABIgCAV");
	this.shape_13.setTransform(852.05,343.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#303030").s().p("Aj5DLQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIABAAIAAAFIgBgEgAGUCuIAAgBIAEAFQgBAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAABIAAAAIgDgGgAGKCZQgJgXABgSQADgoANgfQgJgRgKgOIAAgBQgNgTgOgTQgsg3g2gmQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBIgCgBIgBAAIgBgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAgBIgCAAIgBAAIgDgBIAAAAIgCgCIgBgBIgGgCIgDABIgFgCIgZgHIgVgHIgwgRIgOgDIAAAAQgIgFgjgIIAAAAIgIgBIgBgBQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgBIgGgBIgDAAIgMgDIgqgHIgCgBIgHgCQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBIAAgBQgBABAAgBIAAgBQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABAAIACgBQB2AJARAFIABAAQAWAFBwA2IACACIAAAAQA5AoAsA5IAcAnQALAQAKASIAAACIAAABQgPAfgBAnQgCARAIAVIgBAAIABABQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIAAACIgBACIAAABIAAAEIAAABIgDgIgAA6jAIAFABIAGACIAIACQAjAGAJAFIANAEIABAAIAvAQIASAGIAAABIAIABQhEgggSgEQgMgDg2gGgAlqgHIAAgBIgBAAIgBAAIgMgGIAAAAIAAAAIADAAIACgBIAAgDQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBgBAAIAAgCIALAHIABgBIABABIAAABIgBAAIgDACIABABIAAADIACABIgBAAIgBAAgAl+gQIgCAAIAAgCIgBAAIgCgBIgKgEIgBgBIgBgBQgEgBgEgKIgCgVIgBgDIABABIADACIABAAIABgBQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAAAAAIAAABIAAABIADATQABAGACABIADABIAJAFIACAAIABABIABABIABAAIABABQAAAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBABAAAAQAAABAAAAIAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAABIACABIgCAAg");
	this.shape_14.setTransform(832.525,327.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF0033").s().p("ACsG9IgCgBIgogNInkiqIAAgEIgBgFIAAgBIgBgSIAAgBIgBgBIgBgBQgHgsAAgoQAAgqAIglQgIAlAAAqQAAAoAHAsIADAVIAAABIABAFIgBgEIAAgBIgCgKQgHgggCgOIAAgBIABAAIgBgCQABgBAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAIAAgGIgBgCIAAgBIAAgDIAAgGQgCgUACgWIAAgBQABgYAFgaIAEgOIAIgkIAAgCIAAgBIAAgBIAAgBIgDgBIgBgBIgPgGIAOAHIgOgGIhqgwIgBgBIgCAAIAAgBIgBAAIgBAAIgLgGIgDAAIAAgBIgBAAIgCAAIgBgCIgBAAIgBgBIgBAAIgCgBIgJgEIgDgCQgCAAgBgGIgDgTIAAgCIAAAAIAAgBIAAgBIAAgBIAAgDIAAgBIAAAAIAAgBIAAgIQAEAEAFAAQAHACAGgEQAbgRAZgHIAAAAQAMgDANAAIABAAQAZgBAXAQQAbAVAWArQAEAGAGACQAHACAFgDQAGgEADgGQACgIgDgGQgagzgigXQgggXgjAAQgRABgSADQgdAIggAVIgDADIACgTIAAgEQACgNAEgOIAAAAIAEgUIAAgBIAAgCIAFgQIABgBIAAgCIAMgYQAOgXASgSIAAAAQAHgIAHgGIABgBIAFgEQAbgSAdAAIABgBIACgCQAYgnAdgaIABAAQAJgIAJgGIAAAAQASgNAVgJIAEgCIABAAIAggLIABAAIACgBQAZgIAbgEQBWgOBiAWIABAAQBpAWB2BRQATANAVAQIAAABQAMAHALAJIABABIAwAoIAAAAIANALQAbAZAVAaIAPATQAtA9ANBDIAAACQAJALAGAOIAIANQAUAsgCAzIAAADIAAABIABAGIgBABIgEAfIgBAHIAAAAIAAABIAAABIgBABIAAABIgBABIAAABIAAABIgGATIgCAGIgBACIAAABIgBACQgMAdgUAaIgBABIAAAAIgBACIgCABQgMAMgQAMIgDABIAEgDQAFgEABgIQACghgFgcIgBgBQgFgbgNgWQgHgMgJgKIAAAAQgdgggygLQgHgBgFAEQgGAEgBAHQgCAGADAGQAEAGAHACQAmAJAXAXIAMARIABAAQAKAQADAWIAAABQAFAXgBAdQgBAHAEAGIgVgFIhnh6IgBAAIgBgBIgBgCIgCgCIAAAAIgBgCIgDABIgBgBIABAAQgIgVACgSQABgmAPgfIAAgBIAAgCQgKgSgLgPIgcgoQgsg5g5goIAAgBIgCgCQhwg1gWgFIgBAAQgQgFh3gJIgCABQgBAAAAAAQAAAAAAABQgBAAAAAAQAAABAAABIAAABQAAABABgBIAAABQAAAAAAABQABAAAAAAQABAAAAAAQABABAAAAIAHACIACABIArAHIAMADIADAAIAGABIABABQABgBAAAAQABAAAAAAQABAAAAABQAAAAABAAIABABIAIABIAAAAQAjAIAHAEIAAAAIAOAEIAwARIAVAGIAZAIIAFACIADgBIAGACIABABIACACIAAAAIADABIABAAIACAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAAAABAAIABABIABAAIACABQAAAAAAABQAAAAABABQAAAAABAAQAAAAABAAQA2AlAsA4QAOASANAVIAAAAQAKAOAJARQgNAfgDAnQgBATAJAWIADAJQgBAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAABIgCARIgIBJIAAAGIgMAvIgDAIIAAABQgPAwgVAmIgCAEIgBAAQgIAOgKANIgQAVIgHAIIgBgBgAIACdIAAgBIAAgBIAAACgAliEMIAAAAIgBgBIAPAGgAljD7IAAAAg");
	this.shape_15.setTransform(844.325,329.2489);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("ACrHFIn/i2IgPgGIgCgBIgFgGIgBgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAAAIgBgSIgBgEIAAgBIABgCIAAgBQAAAAABAAQAAgBAAAAQAAAAABAAQAAAAAAAAIABgBIAGAaIABAEIAAADIHkCqIArAPIAHgIIAQgVQAKgMAIgOIABgBIACgEQAVgmAQgwIAAAAIACgJIAMguIABgGIgBgBIAIhJIADgTIAAAAIABgFIAAgBIAAgCIABgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAIADAAIACABIAAABIACACIABACIAAAAIABABIBoB5IAUAFQgEgGABgHQABgdgFgWIAAgBQgCgWgLgQIAAAAIgNgRQgWgYgngJQgHgBgEgGQgDgGACgHQABgHAGgDQAGgEAGABQAyALAdAfIAAAAQAKAKAHAMQANAWAEAcIABABQAFAbgCAhQgBAIgFAFIgEADIADgCQARgLAMgNIABgBIABgBIABgBIAAAAQAUgaANgeIAAgCIAAgBIABgCIACgFIAHgTIAAgBIAAgCIABgBIAAgBIABAAIAAgBIAAgBIgBAAIAAgBIABgHIABgBIAAgBIABAAIABAAIAEgeIAAAAIACAIIABgHIgBgDIAAAAIACABIAAABIABABIAAACIgCAYIAAACIgBAFIgBAHIgBAAIgBACIAAACIAAABIAAABIAAABIAAABIAAABIgDAGIgEAMIAAABIgCAFIAAAAIABABIgBACIgBAAIgBADQgNAegUAaIgBABIAAACQAAAAgBAAQAAAAAAABQAAAAAAAAQgBAAAAAAIgBAAQgNAOgQAMQgBgBABABIgBABIgJADIgBAAIgqgMIgBAAIgBgBIhnh4IgBAIIAAACIgJBQIAAABIgNA1QgBAFgCAEQgHAUgHAUIgFAMQgJAVgLASIAAAAIAAAAQgTAggYAZIgBACIgBABIgBACIgDABIgCgCgAIECjIACgWgAlmDkIACACIAAABIAAAAIABASIgDgVgAIIBwIACgBIAAgBIABABIgEAeIgBgCIgBAAIgBAEgAILBvIAAAAgAIKBqIgBgEIgBAAQACgzgUgtIgHgMQgHgPgIgLIgBgBQgNhDgtg+IgPgSQgVgagbgZIgNgLIAAAAIgvgoIgCgBQgLgKgMgHIAAAAQgUgQgTgNQh2hShqgWIAAAAQhjgVhWAOQgbADgZAJIgCAAIgBABIggAKIgBAAIgEACQgVAJgRAOIgBAAQgJAGgJAIIgBAAQgdAagXAmIgDADIgBAAQgcAAgcATIgFADIgBABQgHAGgGAJIAAgBQgTASgOAXIgLAZIAAACIgBABIgGAQIAAACIAAAAIgEAUIAAABQgEAOgCAMIAAAEIgBATIACgCQAggVAegIQARgEARgBQAkAAAfAXQAiAYAaAzQAEAGgDAHQgCAGgHAFQgEADgIgDQgGgCgDgFQgXgrgbgVQgXgQgZABIAAAAQgNgBgNADIAAAAQgZAHgbASQgGAEgGgCQgGgBgDgEIAAAJIgBAAIABABIAAAAIAAADIgBACIABABIgBAAQAAABAAAAQAAAAAAAAQgBABAAAAQAAAAgBAAIgBABIgBAAIgDgCIAAgBIAAgDIAAgBIAAgBIABg4IACgCIgBgBIAGgbIAEgTQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAAAAIAHgSIABgEIAKgSIABgFIACgCIAAAAIABAAQANgYARgSIAQgQIABAAIAFgDQAcgUAegBQAYgnAfgaQAHgJALgGIAAAAQASgOAXgJIAAAAIAEgCQAPgGASgFQAAgBABAAQAAAAABAAQAAAAABgBQAAAAABAAIgBABQAZgIAcgFQBXgOBkAYQBsAVB3BSIAoAeQAMAHALAJIABACIAAAAQAYATAZAVIAAABIAMAKQAaAZAYAbQAIAJAFAKQAvA/ANBEQAJAKAGAPIAAAAQAFAHADAHQAUAtgBA1IgBgBIgCgDQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgCAEIACgPIgCAPIAAAEIAAAAIgBgBgAILBnIABADIgBABgAndgXIgBgBIgCgBIAAgDIgBgBIADgCIACAAIABAAIACABIBqAvIAAAEIgBABIgCABIgDABgAntgfIgBAAIgCAAIgBgBIgBAAIAAgBIgBgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAgBIABAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAIACAAIACABIAAAAIACABIAAABQABABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAADIgCABIgBAAIgBAAg");
	this.shape_16.setTransform(844.3,329.3637);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(1,1,1).p("AgMgdIAGAMIACAEIABACIAJAXIAHAR");
	this.shape_17.setTransform(860.4,310.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("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");
	this.shape_18.setTransform(818.4192,322.4218);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF0033").s().p("AiJFWIABAAIAAAAgAiPFMIgJgOIAAAAIgBgBIgDgBIgBABIgQgVIgBgBIAAAAIAAgBIAAAAIgBgBQAAgBAAAAQAAgBAAAAQAAAAgBAAQAAAAAAAAIgCgCIAAgBIgBgCIAAAAIgDgCIAAAAIgCgEIgBgBIgRgeIAAgBQgJgTgHgUIgLgqIgBgCIgBgBIgCAAIgBAAIAAAAIgOACIhdAJIgCAAIgCAAIAAABIgBAAIgKABIgCAAIgDAAIgBAAIgBABIgBgBIgBAAIgCABIgHAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgCAAgCgDIgLgNIAAgBIgBAAIAAgBIgBgBIAAgBIgBgCIgEgHQAEABAEgBQAFgCADgFQAMgZAOgPIABAAQAHgHAJgFQASgMAXACQAcAEAhAWQAEADAGgCQAFgBACgFQADgFgBgGQgBgGgEgDQgogaghgDQgfgEgaAQQgMAHgKAKQgSATgOAcIAAADIgGgPIgBgCIgIgWIAAAAIgGgRIAAgCQgCgHAAgHIAAgBQgBAAAAgBIgCgXQAAgXAFgUIAEgQIABAAIACgGQALgZAUgMIABAAIAAgDQABgmALgfIAAAAIAHgSIAAgBQAHgRALgPIACgDIABgBIASgVIAAgBIACgBQAOgQARgOQA3guBNgaIAAAAQBUgcBzAKQASABAWAEIAAAAIAXACQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAIAxAKIAOACQAdAHAaAKIARAIQA6AZAjAsIABABQALAFAKAIIAMAGQAgAZATAmIABACIABAAIADADIAAABIAJAZIABACIACAEIAAAAIAAABIAAABIAAgCIAAABIAAABIAAABIABAAIgBABIAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAgBIAAABIABAAIAAABIAEARIABAFIAAABIAAABIAAABQAEAbgEAbIAAACIAAAAIAAABIAAACQgEAOgHAOIgCADIAAAAQAAAAABgBQAAgBAAAAQABgBAAAAQAAgBAAAAQACgGgCgGQgNgYgPgSIgBAAQgOgSgSgLQgKgGgKgDIAAAAQgigLgnANQgFACgDAFQgDAFADAGQABAFAFADQAFADAGgBQAegKAaAHIAPAIIABAAQAOAHAKAOIABABQAMAPALAVQACAFAGADIgRAEIh6gsIgBAAIAAAAIgCgBIgBAAIgBAAIAAgBIgCAAIgCABIAAAAQgOgMgGgOIAAgBQgPgcgCgcIAAgCIgCAAQgOgKgOgHQgTgKgRgHQg3gYg4gEIAAgBIgCgBQhjAIgSAFIgBAAQgOAEhYArIgBACQAAAAAAABQAAAAAAAAQAAABABAAQAAAAAAABQAAABAAgBIABABIADAAIAGgCIABAAIAigMIAJgDIADgBIAFgCIABABQAAgBAAAAQAAAAAAgBQABAAAAAAQAAAAABAAIABAAIAGgCIAAAAQAbgJAIAAIAAgBIAMgDQAHAAAhgHIASgEQAIgEAMgCIADAAIACgCIAFgBIABAAQABAAAAAAQAAABABAAQAAAAAAgBQABAAAAAAIACAAIABAAIABgBIACAAIABgBIABAAIABABQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAgBQA1AGA2AWQARAHASAKQANAHANAJQADAcAPAdQAHAOAPANIAFAFIABACIAAAAIACADIAeBGIALAoIABAHQAKAqAAAkIAAAEIAAABQAAANgCAOIgDAWIgBAIIgBAAIgCAAIgtAKImOBMgAmMCcIAAgBIAAABgAGrhng");
	this.shape_19.setTransform(818.3567,322.7451);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#303030").s().p("AheD3IgBgBIACABgAh1DdIADABIACgBQABAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIABAAIAQAVIgBgBIAAABIgBACIAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAABIgVgYgAh5DWIABAAIABABIAAAAIAAACgAhzDVIAAgBIACACIgCgBgAh+DOIABABIACAAIgBACIAAAAgAh4DOIgCABIABgCIAAgCIACADIAAABIgBgBgAiRCuIgLgaQAGAOAGALQAGANAHAMQgIgLgGgNgAlDBnQgFgGgGgIIgBgCIAAAAIADABIABgBIABgBQAAgBAAAAQABAAAAgBQAAAAAAAAQAAAAgBgBIABAAIAAACIALANQACADACAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAIAHgBIACAAIABAAIABAAIABAAIABAAIgCABIAAADIAAAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAABABAAIACAAIgCABIgBAAIgBgBIgBABIgCAAIgIAAIgBAAIgBAAIgBABQgEAAgFgFgAklBqIABAAQAAAAAAgBQABAAAAAAQAAAAAAAAQAAgBAAAAIABgBIgBgCIgBgBIgBgBIAKAAIABgBIAAAAIACAAIgCABIAAACIAAABQAAAAAAABQAAAAAAAAQAAABABAAQAAAAABABIgBABIgBAAIgKAAIgBAAgAkYBpIACAAIgCAAgAisBfIgNABIACgCIAAgCIAAgBIgBgCIgBgBIAOgBIgBABQgBAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAIABACIADAMIgDgJgAFMhRIgBgBIAFACIAAABIgEgCgAE8hdQgPgNgHgOQgPgdgDgdQgNgIgNgHQgSgLgRgGQg2gXg1gFQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAIgBgBIgBAAIgBABIgCAAIgBABIgBAAIgCAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBAAIgFABIgCABIgDABQgMACgJAEIgSADQghAIgHAAIgLADIAAAAQgIABgbAIIAAAAIgGADIgBAAQgBAAAAAAQAAAAgBAAQAAABAAAAQAAAAAAABIgBgBIgFACIgDABIgJADIgiAMIgBAAIgGABIgDABIgBgBQAAABAAgBQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIABgDQBYgqAOgEIABAAQARgGBkgHIACABIAAABQA4AEA3AYQARAHATAKQAOAHAOAKIACAAIAAABQACAdAPAcIAAAAQAGAOAOAMIAAABQgBAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIAAACIAAABIACAEIgFgEgAgMjiQgJADgqASIACAAIAFgCIAEgBIAGgBQAcgKAJAAIAKgEIAngIIAPgDIAAABQAEgDADAAQg9AGgNAEg");
	this.shape_20.setTransform(812.075,330.45);

	this.instance = new lib.Theend();
	this.instance.setTransform(1236.65,289,1,1,0,0,0,27.6,11.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},657).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{x:993.7375,y:326.6125}},{t:this.shape_4}]},25).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_5,p:{x:954.5,y:307.775}},{t:this.shape_9}]},11).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},12).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},13).to({state:[{t:this.instance}]},21).wait(56));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_בית_וזבל = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// בית_וזבל
	this.instance = new lib.updatedIphone("synched",0);
	this.instance.setTransform(716.05,220.95,0.1877,0.1852,0,0,0,70.3,96.1);

	this.instance_1 = new lib.backroundout_of_house();
	this.instance_1.setTransform(-2,0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9933").ss(2.8,1,1).p("AH4jHIAAINIp1AAIAAoJgALzI5QAAAVgNATQgEAHgGAGQgaAag0AVQhmAqiQAAQiQAAhmgqQg6gXgYgdQgHgIgEgIQgJgPAAgRQAAg6BmgqQBmgpCQAAQCQAABmApQBlAqAAA6gAh9rGIJ1AAIAAH/AryjAIAAoGIJ1AAAh9FGIp1AAIAAoGIJ1gDIAAoD");
	this.shape.setTransform(626,240.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9933").ss(8.5,1,1).p("AF8oIQAkCcAPCgQAXD5gbEHQgMBtgUBwAmbIRQhfpSDWnP");
	this.shape_1.setTransform(662.1989,353.2375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9933").ss(3.8,2,1).p("ApcoFIFyAAIAhAAIBbAAIAaAAIKxAAIAAQLIy5AAIAAiuIAAhVIAAn4IAAgGg");
	this.shape_2.setTransform(745.65,221);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("AAJkhQgJABgHADAgHkrQAHADAJABAAJEsQgHgZgKgNAgIDvQALgJAGgP");
	this.shape_3.setTransform(684.25,225.4125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#66CCFF").ss(1,1,1).p("AgSAqQAQgnAWgjQABgDACgCAAPgpIglBL");
	this.shape_4.setTransform(1024.825,389.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CCCCCC").ss(4.7,2,1).p("AasneIAAPFEA1/gHmIAAPGEBVDAGdIAABHEhVCgHlIAAPGEg5agHmIAAPGA9DnmIAAPGAhIniIAAPF");
	this.shape_5.setTransform(636,671.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#66CCFF").ss(8.5,1,1).p("AxHhGQgHAagDAOQgEALAAAIQgDAQAAACQgCAGgGAOIgCAPQgCAKgDAFAQ1hMQAZAfAGANIAGAWQABAHAEAOQAGAXABAJQACAMAAALARCgWQAJANAEANQABACABAFQAEACAAABQADAEAAAIQAAADADAFQABADAEAGQAGAJACAOQAAAFAAAGAw6gpQgKARgKApQgGAUgDAGIgFAKQgBADAAAHQgCAFgBAJ");
	this.shape_6.setTransform(1127.5751,397.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#999999").ss(8.5,1,1).p("AMotRQieOPCeNvAEbtrQiZOHCZOrAkCuNQhzOpBzOIAr1vGQhkO8BkO6");
	this.shape_7.setTransform(1122.4666,591.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9933").s().p("AmNJ7QhapcC8ncQgGgIgFgIQgIgPAAgRQAAg6BmgqQBmgpCPAAQCQAABlApQBmAqAAA6QAAAVgNATIgLANQgZAag1AVQhlAqiQAAQiPAAhmgqQg6gXgZgdQAZAdA6AXQBmAqCPAAQCQAABlgqQA1gVAZgaQArCVASCaQAeD6giEGQAPiOAAiJQAAh1gLh0QALB0AAB1QAACJgPCOQgRCBggCDgAl2BzQgRATAAAbQAAAcARASQASAUAYAAQAZAAARgUQASgSAAgcQAAgbgSgTQgRgTgZAAQgYAAgSATgAGZF3IAAAAg");
	this.shape_8.setTransform(663.9495,346.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF66FF").s().p("AAxACQAMgFAOAFgAhKACQAUgGANAGg");
	this.shape_9.setTransform(729.675,169.0414);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF99").s().p("ABFIGIAAiuIAAhVIAABVQgIgYgKgNIAAgXQALgJAHgQIAAn4IAAgGIAAkKIFyAAIAhAAIBaAAIAbAAIKxAAIAAQLgAqIIGIAAoJIAAoCIAAICIp2ADIJ2gDIAAIJIp2AAIAAoGIAAoFIJ2AAIJ1AAIAAH/Ip1ADIJ1gDIAAIMgAgTgGgAA0j+IARADIAAAGIgRAEg");
	this.shape_10.setTransform(678.3,220.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#7ABF7D").s().p("Egh2APyQgNg1gXgoIgBANIoAAAQhEkHi5hwQBLg3D2DvQgFj+jXiUQEGgxBXGBQALnFBxhwQglF1A8ECQA4kqCuirQhgDzALDVIAJgBQAdgmBcAOQgZAXgTAbQAqAoAVBgQAFjYAzg2QgRCzAbB7QAZiPBOhRQgsB4AGBoQAKgZAxAHQgtAtgDBAgEgiRANhQAaAWAgAgQgBhFggg1QgQAhgJAjgEgixALjIACgEIgDgCIABAGgEAiQAFVQgqiqhphUIAAgfQA/AJCECGQgDi8iZhsQC6glA+EcQAIlPBMAGQgWC8AqC+QAojcCMAyQhWAJAKChQAPgoBNAMQhGBGgGBkgA2fBEQgsifh3hFQAwghCfCSQgDiPh2hYIBZAAQBQArAjCTQAHkUBJhFQgYDkAmCeQAki3BxhoQhACaAJCFQANghBHAKQhAA5gFBRgEggvgJtQgbhxhHgwQAdgXBfBmQgChthThAQBlgUAiCkQAEjBArgwIABgBIAAABQgPCfAXBvQAWiABDhKQgmBsAGBeQAIgXAqAGQgnApgDA6gEAqqgKRQgbhxhHgvQAdgYBfBnQgChthThAQBlgVAiCkQAEjAArgxIABAAIAAAAQgPCgAXBvQAWiBBDhJQgmBsAGBeQAIgYAqAHQgnApgDA5g");
	this.shape_11.setTransform(644.375,511.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AkzKyQi0grichPQiXhMhHg6IgGgFQjSi3AAjwQAAhMAVhGIACgHQAHgUAIgUQAQgmAWglIADgFQBQh+CehnQE9jRHAAAQHAAAE9DRQC4B5BOCXQASAkAMAlQAUA8AEA/IgHAAIAAALIAAAWIAAAYIAABFQgJAzgUAxQhICAhWBKQhrBeggAaQi0BgiYAxQixAljPADIg2ABQigAAh+gQg");
	this.shape_12.setTransform(1127.35,412.8728);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF3333").s().p("AXMJzMgtqAAAIjfAAIagzlIZbTlg");
	this.shape_13.setTransform(676.1,86.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CC6600").s().p("AS2UZIveAAQAhiDAQiBQAjkGgej7QgPiggkicQAkCcAPCgQgTiZgriWIALgNQANgSAAgVQAAg7hmgpQhlgqiPAAQiQAAhmAqQhmApAAA7QAAAQAIAPQAFAIAGAIQi8HdBaJcIpJAAIlOAAMAAAgoyMAtpAAAMAAAAoygADqTzQAUhwALhuQgLBugUBwgAo9TzQgdi3AAiqQAAmBCUlBQiUFBAAGBQAACqAdC3gABElFQgGAQgMAJIAAAWQALANAHAZIAACuIS6AAIAAwMIqyAAQgOgGgMAGIhbAAQgNgGgTAGIlzAAIAAEKIgQgEIAAAOIAQgEgAz+pJIAAIHIJ2AAIJ1AAIAAoOIAAn/Ip1AAIp2AAgAoGNuQgRgTAAgcQAAgbARgTQASgTAYAAQAZAAARATQASATAAAbQAAAcgSATQgRATgZAAQgYAAgSgTg");
	this.shape_14.setTransform(678.325,279.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AktGfIiYobIHSk4IG4FcIjCINg");
	this.shape_15.setTransform(55,66.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#666666").s().p("APyYqIAAuEMAAAggzIAAh1IAAgcIAAgLIAZAkIgCAHQgVBGAABNQAADwDSC3IAGAFQBHA6CWBMQCdBPC0ArQCTASDCgDQDOgDCyglQCYgxC0hgQAfgaBsheQBVhKBJiBQAOgaAPg5IAAekIAHAAIAAABIAAOEgEAkYAVLQhNnWAAnMQAAnMBNnEQhNHEAAHMQAAHMBNHWgAUHU0QgyndAAneQAAndAyneQgyHeAAHdQAAHeAyHdgEAslAUxQhPm4AAm/QAAm/BPnIQhPHIAAG/QAAG/BPG4gAb6UoQg6nEAAnNQAAnLA6nVQg6HVAAHLQAAHNA6HEgEgvqAFGQhUhVgEh5QgDh4gfiJQgeiJDuA2QDuA2gBBbQAABZCMAGQCNAGgrBpQgqBpjZBXQhuAthMAAQhKAAgqgqgEgg3gQNQgUgzAQhKQARhKAgggQAgggA9gXQA+gYA3ADQA3ADgICXQgHCYhAgXQhAgWhJAxQgkAYgXAAQgYAAgLgbgEAxogWOQgFg/gTg8IAYggIAACbg");
	this.shape_16.setTransform(917.9857,552.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999999").s().p("EhkQAV4IAAwUMBjqAAAIajAAMAhWAAAIAAOEMAh2AAAIAAuEIHIAAIAAQUgAaJVJIAAvGgEBUgAVGIAAhHgAhrVFIAAvGgEhVkAVDIAAvHgEA1cAVCIAAvHgA9mVCIAAvHgEg59AVCIAAvHgAJ8DVQgUiMBBhkQBChlChhHQChhGB+CgQB/CfhFBgQhFBhhWAlQhVAmhvghQhvgihEAzQgSAOgPAAQgpAAgNhngAHRn9QhigdAbi9QAbi8AKh8QALh9C0BIQC0BHA1A8QA1A9hABAQhABAALB1QALB1h3AdQg8APg2AAQg3AAgxgPgAj/vnQhTgGhUgsQhTgrg3haQg3haAohAQAng/CpAAQCpAAAVAqQAVArASBXQASBYgZBJQgYBEhJAAIgNgBg");
	this.shape_17.setTransform(639.475,584.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CCCCCC").s().p("AmVQaQ0R0FJVsuIJJAAIL2AAIPeAAQwXIRRZYigAIdHvQihBGhCBlQhBBlATCMQATCNBFgzQBEg0BvAiQBvAhBVglQBWgmBFhgQBFhhh/igQhYhvhoAAQguAAgxAWgAryDqQAfCKADB4QADB5BVBVQBVBVDZhXQDZhYAqhpQArhpiNgFQiMgGAAhbQABhbjug2QhEgPgtAAQh1AAAWBigABAlZQgKB8gbC9QgbC7BiAdQBiAeB4geQB3gdgLh1QgMhzBBhBQBAhAg1g8Qg1g9i0hHQhCgagrAAQhLAAgHBPgArerBQipAAgnBAQgoA/A3BaQA3BaBTAsQBTArBUAGQBUAHAZhKQAahJgShYQgShXgVgqQgWgrioAAIAAAAgAHEu3Qg9AXggAgQggAggRBKQgQBLAUAzQAVAzBJgxQBJgwBAAWQBAAWAHiYQAIiXg3gDIgLAAQgyAAg4AVg");
	this.shape_18.setTransform(676.1978,515.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#339900").s().p("AaGQaQxY4iQWoRID/AAIQcAAQgrAxgEDBQgiilhlAVQBTBAACBtQhfhngdAYQBHAwAbBwIDFAAQADg5AngpQgqgHgIAYQgGheAmhsQhDBJgWCBQgXhvAPigIN8AAMAAAAgzgEAg3AAvQBpBVAqCpIFsAAQAGhjBGhHQhNgMgPApQgKihBWgIQiMg0goDdQgqi+AWi9QhMgFgIFOQg+kci6AlQCZBuADC7QiEiGg/gKgEhkHAQaMAAAggzMBTgAAAIFOAAQpUMuUQUFgEgg8APLIDnAAQADhAAtguQgxgHgKAaQgGhoAsh5QhOBSgZCPQgbh8ARiyQgzA2gFDYQgVhhgqgnQATgbAZgYQhcgNgdAlIgJABQgLjUBgj0QiuCrg4ErQg8kCAll2QhxBwgLHFQhXmBkGAxQDXCVAFD+Qj2jvhLA2QC5BwBEEHIIAAAIABgNQAXAoANA2gA4IjHQB3BEAsCgIFKAAQAFhRBAg6QhHgKgNAhQgJiFBAiaQhxBpgkC2QgmidAYjlQhJBFgHEUQgjiThQgrIhZAAQB2BYADCPQiBh2g4gBQgNAAgJAHgEghXgM2QBHAwAbBxIDFAAQADg6AngpQgqgGgIAXQgGhdAmhsQhDBJgWCAQgXhuAPigIAAgBIgBABQgrAwgEDBQgiikhlAVQBTA/ACBtQhNhTgiAAQgHAAgGAEgEBdSAQaIgHAAIAA+kIAAgQIAAhFIAAgYIAAgYIAAgKIAHAAIAAAAIG2AAMAAAAgzgEghXAM5QAJgjAQggQAgA1ABBFQggghgagWgEgh4AK2IADABIgCAFIgBgGg");
	this.shape_19.setTransform(638.575,515.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]},193).wait(153));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_שלט_מזבלה = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// שלט_מזבלה
	this.instance = new lib.stink();
	this.instance.setTransform(871.7,412.2,0.2165,0.2984,0,0,0,58.6,72.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjCBBIgCgNIgCgPIgEgOQgDgHgCgEQgEgKgOgJQgOgKgTgIQgRgIgUgHQgUgGgQgCIB2hEQANACAMADIAWAIIAVAKQAKAGAKAIQACgYAHgVQAIgWANgUQANgVAUgSQATgSAbgQQAvgcAmgIQAmgHAgAKQAgAKAbAcQAaAbAZArIBTCXIkDCWIgkhTICKhQIgnhKQgMgVgMgPQgOgQgQgGQgQgHgWAEQgVADgcARQggATgRAUQgSAVgHAUQgIAVAAAUQAAAUACAQIAcDFIhvBBg");
	this.shape.setTransform(934.15,273.7515);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRBQQgUgtANgnQANgnAtgoIiZBZIgkhTID9iUIAkBTQgQANgNAPQgOAQgHATQgIATACAXQAAAXANAcIBBCUIhuBAg");
	this.shape_1.setTransform(888.675,293);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AjECmIEbilIgqhcQgJgVgOgKQgPgKgRAAQgVgBgWAJQgYAIgcAQIiSBWIglhTICThWQA3gfAtgSQAtgRAlABQAlABAdAWQAcAWAUAuIAqBeIA3ggIAkBTInAEFg");
	this.shape_2.setTransform(853.25,323.3723);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAiDdQgGgIgEgJQgJgVABgWQAAgXAIgXQAIgYANgYQANgYAQgZIAVgiQAJgQAHgPQAGgOABgNQABgMgEgKQgGgNgOABQgPABgbAPIjSB6IhRi3IBqg9IAsBlIB9hKQApgXAfgKQAfgKAYABQAXACAQAMQAQANAJAVQAJAUABAUQACASgGATQgFAUgLAWQgKAVgPAaIgaAtQgNAVgIATQgHASgCAQQgCARAHAPIAHAOQAFAHAHAFIh2BFQgFgDgEgHg");
	this.shape_3.setTransform(797.2661,345.9955);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AjeBJIBuhAIBUC9IhvBAgABwhnQgJgXgQgJQgQgKgUAAQgUABgXAIQgXAKgaAPIjdCAIgkhSIDciBQA/glAvgQQAwgRAkADQAkAEAaAXQAZAWATAqIBNCwIhtBAg");
	this.shape_4.setTransform(753.6,378.9769);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2,1,1).p("A6yENQBeggBdghQM1knLBmoQG8kLGPk+QBWhFBVhIQASgQATgQQAOAFAOAFQCsBGB/BlQDjDLBREOQAdBjALBuQgfAOgfANQgxAVgxAWQkNB3kJCAQgYAMgZAMQmhDLmWDgQiBBIh+BJQjDBxjAB0QlSDOlHDcQg5Amg4AmQgdAUgcAUQhCg4g3g8QixjBhDjpQgzivAMjHQADgrAFgug");
	this.shape_5.setTransform(841.0249,327.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#996633").ss(14,1,1).p("AaDk/QAAAGAAAFAZRrdQAdCPAICLAeOQ5IADgCQBRo8kBpRQgWgygYgyAQ29KQAZhMCzAXQAeAtAaAuAPd7XQgmAEg0gaQgIA1gCBGA7SkZQAZhLC0AXAQqnnQArDJgCDIQAAAPAAAPAR9hFQADBcAIBaQAjFdCEE8QAGAQAIAQICoGLIAVgFAzWOWQABAFABAFQAPBMALBLQADAYADAXQAJBFAGBEAyFTyQAAAFABAGA6KXrQAFDTAnDHAuZeFQg9kFiAkKA8rilQgmAEgzgZQgHAsgDA4QAAALgBALA9qLDQABADABADQCYG3ACGqA+RArQAABrAHCJQAJC3AXDtA+jGAIA5FD");
	this.shape_6.setTransform(836.6232,372.1725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999966").s().p("A2fSGQixjBhDjpQgzivAMjGQADgsAFgtQBeggBdgiQM1knLBmnQG8kLGPk/QBWhFBVhIIAlggIAcALQCsBFB/BmQDjDLBRENQAdBjALBuIg+AbIhiArQkNB4kJB/IgxAYQmhDLmWDhQiBBHh+BKQjDBwjAB0QlSDOlHDcIhxBMIg5AoQhCg4g3g8g");
	this.shape_7.setTransform(841.0249,327.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#996633").s().p("A46d4QgHhOgFgjQgGglgLgyIgciDQgIglgCgTIAAgZIgDgBQghgcgFgtQgCgVAHgWQgFgFgBgGQgMgcADggIgBgBQgGgWgCgfIgEg2QgKixg2ihIgXhIQgFgRgDgQQgRgPgKgVQgGgMgDgNIgBgOQgGgLgCgNQgEgPAAgMIgFgKQgPgeAFgmQgFgHgCgHQgEgNgCgMQgEghANgiQAHgRAJgOQgEgSAAgOIgFgEQgVgUgJgbQgHgVABgeIAAgMIADgrQAFhkgWhcIgDgJIgFgVQgEgQAAgOQgBgbAMgdIAGgNIAEgJQARgdAbgVQAVgSAZgLIAEgCQAFgSAJgSQATgnAkgbQAHgHAJgFQAdgSAjgHQAsgLAlAKQAlALAWAdIABAAQAgAGAYASIACADQhdAhheAgQgGAtgCAsQgMDGAzCvQBDDpCxDBQA3A8BCA4IA5goQAEAOABARIAAABQABAqgXAnIgMASIAKAIIAOANQAUAYAFAfQAEAYgHAbQgDAQgIAQQgKhLgPhMQAPBMAKBLIgEAJIABALIgCAVIAMAGIAHAFQAVANAMAWQAFAKAEAKQAMAkgNAnIgBAFIgDAJIAEACQANAIAKANQAUAWAFAfQAEAXgGAYIgDAQQgEALgHALQAOASAEAUIgBABIAKANQATAggFAmQgBANgEAMQAjAbAbA2QASAqAQA4QAKAjAPBDIAOA9gAyiTiQgGhEgJhFQAJBFAGBEgAa1TTQgTgEgPgIQghAJgigDQgsgEgbgaIgMgMQgLgQgJgUIgUg6QgTg5g0h0QgyhxgTg9QgSg4gNhLIgCgMQgTgJgPgPQgPgRgLgbQgIgTgGgfQgJgvgGhYQgIhhgGgnQgFglgMgyIgbiDQgJglgBgTQgCgMABgMIgCgDIgMgMQgWgYgEgkQgCgVAGgWQgDgFgCgHQgNgcAEgeIgBgDQgGgWgDgeIgDg1QgGhXgPhUQEJiAENh3QACAJAAALIABAAQABArgYAnIgMATQAOAIALANQATAYAFAeQAEAZgGAaQgEAVgLAUQAAAFgBAGQABALgCAKQAKAEAKAHQAVANAMAWIAHAQIACAEQALAlgMAmQgBACAAADIgEAJIAEACQAOAJAKAMQAUAWAFAgQAEAWgFAZIgFAPQgEAMgGALQANAQAEAVIAAABIAJANIAGALQAMAbgDAgQgCAMgDANQAjAZAZA3QAUAqAPA4QAKAjAQBEQAsC/AQBlQAbCkgDCLIgDBBIgCBCQAAA0gBAOIgBAKQgEAggMAYQgQAlgiAcQgiAdgoANQgaAGgYAAQgPAAgPgCgAy4QqIAAAAgARl65IgcgKIglAgQhVBIhWBFIgFgSQgEgRAAgPQAAgQAEgQQADgLAFgMIAGgMQARgjAegZQAWgSAZgLIAEgCQAEgSAJgRQAUgoAkgcQAHgGAJgEQAdgTAigIQAsgKAlALQAmAKAWAdIAAABQAhAFAXATQAIAGAHAJQAJAKAGANQAGAMACANIACANQACAWgGAWIgGAVQAPAQAKAWQAMAbAIApIAIAsQh/hlishGg");
	this.shape_8.setTransform(836.3363,373.4869);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhyAtIAAgJIgCgLIgCgJIgDgHQgCgHgIgGIgTgNIgWgKQgMgEgJgBIBFgwIAOAFIANAFIAMAHIAMAJQABgQAFgPQAEgPAIgOQAHgNAMgNQAMgNAPgLQAbgTAXgFQAWgFATAHQASAHAQASQAPATAOAeIAxBoIiXBnIgWg5IBRg3IgXgzQgGgPgIgKQgHgKgKgFQgKgFgMADQgNACgQAMQgTAMgJAPQgLAOgEAOQgEAOAAAOQgBANACAMIAQCHIhBAtg");
	this.shape_9.setTransform(952.275,430.3958);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgKA3QgMgfAIgaQAIgcAagbIhZA8IgVg4ICThmIAWA5QgKAKgIAKQgIALgEANQgFANABAQQABAQAHASIAmBmIhAAtg");
	this.shape_10.setTransform(925.625,443.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhzBzICmhyIgYg/QgGgPgIgHQgJgGgKgBQgLAAgOAGQgNAGgRALIhVA6IgWg5IBWg6QAggWAbgMQAZgMAWABQAWAAAQAPQARAQAMAgIAYBBIAggXIAWA5IkGC0g");
	this.shape_11.setTransform(904.925,464.549);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAUCXQgEgFgCgGQgFgOAAgQQABgQAEgQQAFgQAHgQQAIgRAJgRIANgXIAJgVIAEgTQABgIgCgHQgEgJgJABQgIAAgQALIh6BTIgwh9IA+grIAaBGIBJgzQAXgQATgGQASgIAOACQANABAKAIQAJAJAFAPQAFAOACANQAAAMgDAOQgDANgGAPIgPAgIgQAfQgHAPgEANQgFAMgBAMQgBALAEAKIAFAKQACAFAEADIhFAwIgFgIg");
	this.shape_12.setTransform(872.125,480.1375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AiCAyIBBgsIAxCCIhAAsgABChHQgGgPgJgHQgJgGgMAAQgMAAgOAGQgNAGgOALIiCBXIgWg4ICChYQAlgaAbgLQAbgLAWACQAVADAPAPQAPAQALAdIAtB4IhAAsg");
	this.shape_13.setTransform(846.55,502.7777);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(2,1,1).p("AvrC6QA3gXA2gWQHhjLGckjQEEi4DpjcQAzgvAygxQAKgLALgMQAJAEAIAEQBlAvBKBGQCFCMAvC5QARBFAHBLQgTAKgSAJQgcAPgdAPQieBRibBZQgOAIgOAIQj1CLjtCaQhMAyhKAyQhyBNhwBRQjFCOjACXQghAaghAaQgRAOgRAOQgmgngggpQhoiFgnigQgeh5AHiJQACgeADgeg");
	this.shape_14.setTransform(897.7579,467.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#996633").ss(14,1,1).p("AJ34tQAPg0BoAQQASAfAPAgAJD3eQgXADgegSQgEAlgCAwAJwp4QAZCKgBCKQAAAKAAALArFELIAAAAQAUB4AIB2AqlI9QAAAEABAEAKhlZQABBAAFA+QAUDvBODaQADALAFALIBiEPIAMgDAwymbQgWADgegRQgEAegCAnQAAAHAAAIAv+nqQAPg0BpAQAxukLQAABKAEBeQAGB9ANCjQABACABACQBYEuABElAx4ggIAhDdAvULpQAHE2BhESQAEALAFALIBiEPIAMgEAoJYBIACgBQACgPACgQQAqmbiwmtAOzshQAQBiAFBgAPQoEQAAADAAAEARsG+IACgBQAvmJiWmYQgNgigOgj");
	this.shape_15.setTransform(895.1698,527.9381);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999966").s().p("AtKMdQhoiFgnigQgeh5AHiIIAFg+IBtgtQHhjKGckkQEEi3DpjcQAzgvAygxIAVgXIARAIQBlAwBKBFQCFCMAvC5QARBFAHBLIglATIg5AeQieBSibBXIgcARQj1CLjtCbIiWBkQhyBNhwBQQjFCNjACYIhCA0IgiAcQgmgngggpg");
	this.shape_16.setTransform(897.7579,467.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#996633").s().p("AqbZUQgUAHgUgCQgZgEgQgRIgHgJQgGgKgGgOIgLgoIgQgxIgZhGQgehNgLgqQgLgogHgzIgCgIQgLgHgIgJQgJgMgHgSQgEgOgEgVQgFghgEg8QgEhDgDgbQgEgagHgiIgQhaQgFgagBgNIAAgRIgBgBQgUgTgDgfQgBgOAEgPIgEgIQgGgTABgWIAAgBQgEgPgBgVIgCglQgGh7gghuIgNgyIgFgXQgKgKgGgOQgDgIgCgKIAAgJQgEgIgBgIQgDgLABgIIgEgHQgIgVADgaQgDgEgBgFIgEgSQgCgWAHgXQAEgLAGgKQgDgNAAgJIgCgDQgNgNgFgTQgEgOAAgVIAAgIIACgeQADhFgNg/IgCgGIgDgPQgCgMAAgJQgBgTAIgUIADgJIADgGQAKgTAPgPQANgMAOgIIADgCQACgMAFgMQAMgbAVgTIAJgIQARgMAVgFQAZgIAWAHQAWAIANAUIAAAAQATAEAOAMIABACIhtAtIgFA9QgHCJAeB5QAnCfBoCEQAgAqAmAmIAigbIADAVIAAABQAAAdgNAbIgHAMQAHAGAHAJQAMAQADAVQACARgEASQgDAPgGAOIABAHIgBAPIALAHQAMAJAHAPIAFAOQAHAZgHAaIgBAEIgCAGIADACQAHAFAGAJQAMAPADAVQACARgDAQIgCALIgGAPQAHAMADAOIAAABIAFAJQALAWgDAaQAAAJgCAIQAUATAQAlQAKAdAKAmIAOBHQAaCEAKBFQAQBxgCBfIgCAtIgBAtIAAAVIgBAaIgBAFQgBAWgIARQhegjgdBvQgJgDgHgFgAkJViIAMgIIgHARgAPtIaQgLgDgJgGQgTAHgUgDQgZgCgQgSIgIgIQgGgLgFgOIgMgoQgLgngehQQgehOgLgqQgKgmgIg0IgBgIQgLgGgJgKQgJgMgGgTQgFgNgEgVQgFgfgDg9QgFhDgDgbQgEgZgGgiIgQhbQgFgagBgNQgBgIAAgIIgBgCIgHgJQgNgQgCgZQgBgPADgOIgDgJQgHgTACgVIgBgCQgDgPgCgVIgCgkQgDg8gJg6QCbhYCehRQABAGAAAHIABAAQAAAegOAbIgHAMQAIAGAHAJQALAQADAVQACARgDASQgDAPgGANIgBAIQABAIgBAGQAGADAFAFQANAJAHAPIAEALIABADQAGAZgGAbIgBADIgDAGIADABQAIAHAGAIQALAPADAWQADAPgDARIgDALIgGAPQAIAMACAOIAAABIAFAJQADADABAEQAHATgCAWIgDARQAVASAOAmQAMAdAJAmIAPBHQAaCCAJBGQAQBxgCBfIgBAtIgCAtIAAAuIgBAHQgCAWgHARQgJAZgUATQgUAUgYAJQgPAEgPAAQgIAAgJgBgAKT3XIgRgIIgVAWQgyAygzAvIgCgMQgDgMAAgKQAAgLACgLIAFgQIAEgIQAKgYARgRQANgMAPgIIACgCQADgMAFgMQALgbAVgTQAEgFAGgCQARgOAUgFQAZgHAWAIQAXAHAMAUIAAAAQAUAEANANQAFAEAEAGQAFAHAEAJQADAIABAJIABAJQACAPgEAQIgDAOQAIALAGAPQAHASAFAdIAFAeQhKhGhlgvg");
	this.shape_17.setTransform(894.9845,530.2991);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhbBTQgIgtAjgoQAjgpBSgqIj9BfIgQhTIGhicIAQBTQgdANgZARQgaAQgSATQgSAUgJAXQgIAYAFAbIAcCWIi0BDg");
	this.shape_18.setTransform(1265.9,402.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AlxCrIHSisIgShdQgEgVgPgLQgRgKgaABQgbgBgjAJQglAKgtARIjyBaIgPhTIDxhaQBagiBGgSQBHgTA0AAQAzAAAfAWQAdAVAJAwIASBeIBbgiIAQBUIriESg");
	this.shape_19.setTransform(1202.65,434.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhvDhQgEgIgCgIQgEgWALgXQAKgXAVgXQAVgYAcgZIA8gyIAtgkQAUgQAPgQQAPgOAHgMQAIgNgCgKQgDgNgVABQgVABgsAQIlbCBIgii4ICuhBIATBlIDOhNQBDgZAwgKQAwgLAgABQAgABARAMQAQANAEAVQAEAVgGATQgGATgQAUQgPAUgZAVIg3AxIg5AuQgaAWgTATQgTATgKARQgJAQADAQQABAHAEAHQADAHAHAFIjBBIQgFgCgDgIg");
	this.shape_20.setTransform(1118.9012,458.3208);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AljBPIC1hEIAkC+Ii0BEgAC9hsQgEgWgSgKQgSgJgcABQgcAAglAKQgmAKgpAPIlsCHIgPhSIFriIQBngnBKgRQBJgSAyACQAxADAbAWQAZAXAIAqIAhCyIi1BDg");
	this.shape_21.setTransform(1038.6,492.9647);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(2,1,1).p("EgoDgAcQCTgWCSgZQRojEQHlyQCUg2CTg5QLfkdKtl5QCUhRCThWQAggTAhgUQASAMASAMQDkCaCXC/QDJEfBBFDQATBjAHBmQALChgVCrQgyAMgyAMQhNAShPAVQmvBpmqB6QgoAMgnALQt5ECtkE/Qs4EuskFkQiZBDiYBGQgxAWgwAWQhChZg2hcQmNqiEQsag");
	this.shape_22.setTransform(1163.1442,443.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#996633").ss(14,1,1).p("EAlMguRQA+htD8BWQAdBNAXBOEAikgr5Qg4gFhCg1QgQAqgOAyQgNArgNAyEArbgqNQAwDUg4CBEArogQxQgGDjgiDYAdmi7QgbCPgRCMQgOB2gHB0QgZGnBFGYQAEAbAFAbIBzKLIAggCEAqngGpQgBAIgBAIEApgAcCIAEgBQD4qxhGsGQgXkJg9kSAd1tSQgEFYhOFIEgjHgUpQAJgRAPgMQBKg/DHA/QAJADAKADA+m02QAcAnAXAnEglugSQQgBAAgCAAQg3gGhBgzQgdBNgbBqEgroACYQAJBZAHBZQANDCgCC9QgFGkhTGMEgrSgFmIgWH+EgpHgNtQhTF+hOKHA8oIEIgBABQgIEVgjEJA9rS+QgBAJgBAJEgrVAiOQABAJACAJEge0AuHIAFgBQAxiHAliKQAAgCABgBEgqCApyIA9FdIAggDEgcbAlWQAQhjALhlEgcAApyQA/pSiRqJEgqsAWsQh4JyBPJU");
	this.shape_23.setTransform(1123.9119,554.7786);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999966").s().p("EgmGAWgQmNqiEQsaQCTgWCSgZQRojEQHlyQCUg2CTg5QLfkdKtl5QCUhRCThWIBBgnIAkAYQDkCaCXC/QDJEfBBFDQATBjAHBmQALChgVCrIhkAYQhNAShPAVQmvBpmqB6IhPAXQt5ECtkE/Qs4EuskFkQiZBDiYBGIhhAsQhChZg2hcg");
	this.shape_24.setTransform(1163.1442,443.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#996633").s().p("EgljAvgQg0AGgwgQQg9gTggguIgNgXQgLgbgGgiQgEgRgGhLQgGhGgVh5IAAgCIgnAAIgbAAQgBgyADg3IAAgTQgYgUgQgZQgSgfgHgqQgEghABgwQACg4ALhXIAKhGQAViWAEg/QADg6AAhQIADjQQABg8ADgeIAIglIgDgEQgog0AIhGQAFghAQgfQgEgKgBgJQgIgvAPgvIgBgDQgBgjAHgvIAMhUQAViHAFiEQAFiJgNiEIgJhyIAAgDQgCgbABgZQgVgcgIgjQgHgeAGghQgFgTAAgUQAAgYAEgSIgEgQQgMgzAUg4QgEgMgBgLQgDgWACgTQAEgzAggxQAOgXATgUQAAgdAEgWIgGgHQgYgkgEgsQgDghALgvIAWhTQApiZgDiSIgBgPIAAgiQAAgcAFgVQAHgqAbgoIAMgSQAmgwA0gdQAjgUAngKIADgBIAGgDQAMgaATgZQApg2A9ggIAbgNQAxgUA1gBQBEgFAyAbQAzAbAWAzIABAAQAtASAcAiIADAFQiSAZiTAWQkQMbGMKhQA2BcBDBZIBggsQABAXgEAZIgBABQgMBCgvA2QgKAMgMALQAPASANAWQAVApgDAxQgCAngTAmQgNAggWAcIgDAQIgJAgQANAJAKAMQAbAcAKAkQAFAQABASQAFA6geA4IgDAHIgIANIAFAFQARAQALAWQAVAngDAxQgCAlgQAjIgLAXQgJAQgNAQQANAeAAAgIgBABIAJAXQARA3gTA5QgFASgKATQAqAyAUBbQAOBFAEBaQADA5AABrIAADOQgCCfgFBlIgCAYIg0AAIgVAAIgBACIgQA7QgRBAgIAlQgRBQgHAVQgBAHgDAGQgQAwgZAjQjZh9h8DpQgVgJgRgOgEgUJAqEIAkgMQgNAQgPARgEAjeAd3QgbgLgTgRQg0AFgwgPQg+gSgegvQgIgLgGgMQgLgagGgiQgDgSgHhLQgJhegli/Qgji8gIhiQgIhcAGh2IAAgUQgZgTgQgbQgRgegGgrQgFghAAgwQAEhLATiJQAOhpAHg+IAEgtQAEg6AAhPIADjSQAAg6AEgeQACgUAFgSIgCgEQgog0AIhFQAEgiAQgfQgDgJgBgLQgJguAQguIgBgEQAAgkAFgvIAMhSQAViHAGiFQGqh6GvhqQAAAOgDAQIAAABQgMBCgwA1IgXAZQARARAMAWQAUAqgDAxQgCAmgRAmQgOAfgXAcIgDARQgDAQgGAQQANAJALAMQAbAbAKAlIAGAbIAAAGQAEA8gdA3QgDADgBAFIgIAMIAFAEQARARALAWQAVAogDAxQgCAkgPAkIgMAXQgJAQgMAPQAMAdAAAhIAAABIAJAXQARA2gTA6QgGASgKASQArAyATBbQAKAxAGA9IADAyQACA5ABBqQABEygJCfQgPEEgyDTIgaBjQgRA/gIAmQgRBPgHAWIgEAOQgQAwgZAiQgkA0g7AjQg7Aig/AIIgbABQgvAAgqgRgEAlNgrgIglgYIhBAnQiTBWiUBRIAAgbQAAgcAEgXQAFgXALgZQAIgQALgQIANgSQAigtAxgfIAFgDQAlgUAogLIAHgCQAMgaASgYQArg3A9ggQAMgIAOgEQAxgVA1gCQBDgEAyAcQA0AaAXAzIAAABQAtARAbAjQAKAMAHAPQAHANAFAOIADAOQAEATgBAUIgCAVQgEAigQAhQgHAOgJAPQARAcAHAmQAJArgBBCQgBAggCAmQiXi/jkiag");
	this.shape_25.setTransform(1125.095,562.6052);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},346).to({state:[]},205).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},59).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]},47).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_רקע = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// רקע
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0C87BD").ss(2,1,1).p("Ehkdg4OMDI7AAAMAAABwdMjI7AAAg");
	this.shape.setTransform(639.275,359.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFCC").s().p("EhkdA4PMAAAhwdMDI7AAAMAAABwdg");
	this.shape_1.setTransform(639.275,359.875);

	this.instance = new lib.shining_bling();
	this.instance.setTransform(672.95,319.7,0.7172,0.5416,0,-150.0082,29.9891,49,46.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00CC00").s().p("EgquATUMAAAglUUAZqgEZA7gAKkIATAAIAAfJg");
	this.shape_2.setTransform(1000.775,436.9923);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#99CCFF").s().p("A5CDMMgjFgFaUAycgKoBFpAFPIAJAAIAAQ+Ug7hgKjgZoAEYg");
	this.shape_3.setTransform(887.6,301.2787);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#66CCFF").s().p("Eg8CgMnMB4FAAAIAAT3UhFpgFQgycAKog");
	this.shape_4.setTransform(887.125,206.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00CC00").s().p("EghSAUeQtF2VlzyiUAsigA2A7gAKkIATAAIAAfJg");
	this.shape_5.setTransform(940.375,429.5734);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#99CCFF").s().p("Egr7gAWIwMh4UAycgKoBFpAFPIAJAAIAAQ+Ug7hgKjgshAA2g");
	this.shape_6.setTransform(887.6,301.2787);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#9CCEFC").s().p("EA7SAJIIifgVIgDgBIgBAAIgIgBQxVi9wOiHIgLgCMgrQgDxIpPgYIgmgBQjdgGjYgBQjfgBjaADIgBgBIwMh5IAsgIISmi4QahjbeXgPMAmhAA6IA9ADIAcACIAYABIAMABIAJABIDNAWIAJAAIAGArIABAHIABP8IAAALIg2gBg");
	this.shape_7.setTransform(887.625,302.8625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00CC00").s().p("EghbAUWIgqhEQsV1llpyFQGMgFGgAHIBaADIJPAYMArQADyIALABQQOCHRVC+IAIABIABAAIADAAIBmASIBiARIATABIAIAyQAEAkABAlIAAXwIgLFIMhVPAAGIgFgFg");
	this.shape_8.setTransform(941.125,429.8337);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6BCAFA").s().p("Eg8CgMmMB3/AAAIAGAiIAATOIgoAEIisgNIgJgBIgMgBIgYgBIgcgCIg9gDMgmhgA6Q+XAP6hDaIymC5IgmAGg");
	this.shape_9.setTransform(887.125,206.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#9FCFF9").s().p("EA45AIjIgBAAIgGgBQw6i2wAiLIgjgEIgLgCQ4hi42ThKImMgTIgbgBIgdgBIgHAAIgGAAIjDgFQhhgChggBQjggDjaACIgBAAIwNh7IAygJIY6jNQPXhkQXgvMA4HgAJICxAIIABAAIADAAIANABIAIABIDLAdIAKABIAMAmIADAGIAAP8IAAALIgtAKIiigQg");
	this.shape_10.setTransform(887.65,306.2875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00CC00").s().p("EghfAUUIgshCQsI1hlpyIQErgDE1AEIDDAEIAGAAIAHAAIAdABIAbABIGMATQWTBLYhC4IALACIAjAEQQACLQ6C3IBdAPIBfARIATABIAQAsQAIAjACAkIAAXsIgWFGMhVBAAFIgFgFg");
	this.shape_11.setTransform(941.85,430.0525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6FC9F6").s().p("Eg8CgMmMB35AAAIAMAcIAATNIghALIjBgOIgMgBIgEAAIgBAAIixgHMg4HAAJQwXAuvWBlI47DNIgtAGg");
	this.shape_12.setTransform(887.125,206.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00CC00").s().p("EghkAUTIgthBQr71dloyKQGJgCGdAJIBeAFIORA5QO1BFPlBpIHZA0IAkAEIAXADIAhAEMAgjAFBIACAAIACABIACAAIBHAMIBbAQIAUACIAYAlQALAiADAjIAAXoIggFEMhUzAAEIgGgEg");
	this.shape_13.setTransform(942.6,430.2826);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A2D1F6").s().p("EA5CAIuIgBAAIgDAAIgCAAIgCAAIgBgBMggkgFAIgggFIgYgDIgkgEInZg0Qvlhpu1hEIuQg5Ig8gEQjegIjYgEQjhgDjbABIgDgBIwMh8IAhgFIORhvQXSiiZKg+MAymgAbICWAFIAHAAIAMABIAEABIAFAAIDJAkIAKABIASAiIADAFIABP8IAAALIgkAUIiigJg");
	this.shape_14.setTransform(887.675,307.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#74C7F1").s().p("Eg8CgMmMB30AAAIARAWIAATNIgbASIjIgPIgEgBIgNgBIgHAAIiVgEMgymAAaQ5LA+3RCjIuSBvIgdADg");
	this.shape_15.setTransform(887.125,206.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00CC00").s().p("EghoAUTIgvhBQrt1YlpyOQGIAAGbALIBjAGIRRBRQRJBYR3B9IAbADIBXANIUnDIIK7BxIBQANIBZAQIATABIAhAfQAOAiAFAhIAAXlIgsFBMhUkAADIgGgCg");
	this.shape_16.setTransform(943.35,430.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#A5D2F3").s().p("EA5KAI6IgBAAIgIgBIgWgEIq8hwI0mjIIhXgOIgbgCQx4h9xIhZIxShQIhJgFQjdgLjZgDQjggFjdgBIgEAAIwNh+IA0gFIX6iUQNthIOLgvMA9AgBcICnACIAJABIADAAIAJABIDGArIAKACIAZAcIAEAFIABP8IAAAMIgaAfIikgDg");
	this.shape_17.setTransform(887.7,307.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#78C6ED").s().p("Eg8CgMmMB3uAAAIAXARIAATKIgUAaIjZgQIgDAAIgJgBIimgCMg9AABcQuLAvttBII36CUIgxAEg");
	this.shape_18.setTransform(887.125,206.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00CC00").s().p("EghtAUSIgwg/Qrh1VlnyQQGGACGZAMIBiAHIS/BiQQZBbQ1BxIADAAIAPACIAzAIMAgZAFDIATADIAEABIAfAFIBWAPIATACIAoAYQASAhAGAhIAAXgIg2E/MhUWAACIgHgBg");
	this.shape_19.setTransform(944.1,430.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#A8D4F0").s().p("EA5SAJEIgFgBIgSgDMggZgFCIgzgIIgQgCIgCAAQw2hxwYhbIy/hiIhRgHQjegMjYgFQjigFjdgCIgFgBIwNh+IAegDIN1hKQWnhzXchFMA1ogBmICHAAIACAAIAGAAIAGABIAJABIDFAyIAKACIAfAYIAFAEIACP9IAAALIgSAqIikADIgBAAg");
	this.shape_20.setTransform(887.725,308.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#7DC4E8").s().p("Eg8CgMnMB3oAAAIAdAMIAATKIgNAgIjlgRIgGAAIgGgBIgCAAIiHABMg1oABlQ3cBG2nByIt1BKIgcADg");
	this.shape_21.setTransform(887.125,206.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00CC00").s().p("EghxAUQIgyg9QrT1QloyUQGFAEGYANIAZACIQKBbQSaBrSsB4IAJABIAlAGMAgkAFGIAyAIIBTAPIATACIAwARQAWAhAHAgIAAXcIhBE8MhUIAABIgHgBg");
	this.shape_22.setTransform(944.825,430.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#ABD5ED").s().p("EA5cAJOIgIgCIgfgFMggkgFFIglgGIgJgBQyth4yZhrIwKhaIgRgCQjegOjZgGQjigGjegDIgGgBIwNiAUA4ugD6A7UgBxIALABIAJABIDEA5IAJADIAlAUIAHACIACP9IAAALIgJA1IijAKIgBAAg");
	this.shape_23.setTransform(887.75,309.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#81C3E4").s().p("Eg8CgMnMB3iAAAIAjAGIAATJIgHAnIkIgTUg7MABzg4pAD5g");
	this.shape_24.setTransform(887.125,206.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00CC00").s().p("Egh2AUQIgzg8QrG1NlnyWQGCAGGXAOMA1jAFJMAh0AFVIAIABIABAAICTAaQAaAgAHAgIAAXXIhLE7g");
	this.shape_25.setTransform(945.575,430.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#86C1DF").s().p("Eg8CgMnMB4FAAAIAAT3IkJgUMhz8AFsg");
	this.shape_26.setTransform(887.125,206.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#AED7EA").s().p("EA5kAJYIgIgCMgh0gFUMg1jgFJQjfgPjZgHQjjgIjfgEIwUiCMBz9gFsIAMACIAJABID2BSIAHACIADP9IABBKIilARIgBAAg");
	this.shape_27.setTransform(887.8,310.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#8AC0DB").s().p("Eg8CgMnMB4FAABIAATJIgCAtIkIgUIitAJMgy6ACXQ/QBh/EBrg");
	this.shape_28.setTransform(887.125,206.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00CC00").s().p("EgiAAUEIg0g6QjDleislQQm0uykBttQGCAHGWAQMA0nAFNIA2AFIAJABMAhEAFPIAyAIIAIACIABAAIAAAAICCAXQAbAfAIAeIAJDzIAGM7IgOGSIhTEwg");
	this.shape_29.setTransform(946.025,429.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#B1D8E7").s().p("EA5rAJfIgBAAIgIgCIgygIMghEgFPIgJgBIg2gFMg0ngFMQjfgQjZgIIkwgKIiSgEIwViDQfEhrfQhhMAy6gCXIBpgEIBPgCIAMACIAIABQB3AsB3AtIAHACIADPJIAAA2IABBKIiYAVIgHABg");
	this.shape_30.setTransform(887.825,311.575);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00CC00").s().p("EgiJAT4Ig1g4QjKlRi0lEQmjumj6t8QGBAJGVASIABAAMAzqAFPIBrAKIATADMAg3AFPIAiAFIAXAEIAHABIAIACIABAAIBzAUQAbAeAJAeIASDsIALM4IgbGEIhbElg");
	this.shape_31.setTransform(946.45,428.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#B4DAE4").s().p("EA5wAJmIgBAAIgIgBIgIgCIgXgEIghgFMgg3gFOIgTgDIhrgLMgzrgFOIAAAAQjggRjZgJIkvgLIiSgFIwWiFQfIh1fhhgMAxHgCKIDTgHIBMABIALACIAJACIDlBfIAHADIADPJIAAA2IABBLIiTAZIgHABg");
	this.shape_32.setTransform(887.875,312.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#8EBED7").s().p("Eg8CgMnMB3gAAAIAlADIAATJIgDArIkJgUIkIANMgxIACJQ/gBh/IB1g");
	this.shape_33.setTransform(887.125,206.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#B6DBE2").s().p("EA51AJvIgIgCMgh6gFbIjMgWMgx5gFLIgmgFQjggRjZgLIkvgMIiSgFIwXiHQdvh5eShdMAwQgCCQDegGDfgIIBKAEIALADIAIACQBvAyBuA0IAHACIAEPLIAAA3IAABKIiNAfIgFABIgCAAIgBAAg");
	this.shape_34.setTransform(887.9,313.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00CC00").s().p("EgiTATsIg2g2QjQlEi7k5QmTuYjzuMQGAALGUATIAmAEMAx5AFMIDMAXMAh6AFbIAIABIABAAIABAAIBhARQAbAeAKAdIAbDlIARM1IgpF2IhiEag");
	this.shape_35.setTransform(946.925,427.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#93BDD2").s().p("Eg8CgMnMB3hAAAIAkAEIAATJIgFApIkJgTQjzAJjyALMgwQACCQ+SBc9vB6g");
	this.shape_36.setTransform(887.125,206.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#00CC00").s().p("EgidATgIg3gzQjXk4jBktQmDuMjtubQF/ANGTAUQaiC0bNC9MAh7AFdIAIABIABAAIABAAIBSAPQAbAcALAcIAjDeIAYM0Ig3FnIhrEPg");
	this.shape_37.setTransform(947.375,426.975);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#B9DDDF").s().p("EA58AJ3IgBAAIgIgBMgh7gFdQ7Ni96iizQjfgTjagKQiYgIiXgHIiRgGIwaiIIAkgCIIOgjQWBhdWbhHMA2WgCPQD7gGD8gHIAJAAIA+AHIALADIAIACIDVBtIAGACIAEPMIAAA3IABBLIiIAkIgGAAIgBAAg");
	this.shape_38.setTransform(887.9,314.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#97BBCE").s().p("Eg8CgMnMB3iAAAIAjAGIAATJIgHAnIkIgTQkKAIkIAMMg2XACPQ2bBH2BBdIoNAjIgjACg");
	this.shape_39.setTransform(887.125,206.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#BCDEDC").s().p("EA6BAKAIgIgCMgh+gFfQiDgPiCgQMgxrgFaIgBAAQjggUjZgMIkugQIiTgGIwaiKIAZgCIFfgZQaph5bYhSMAwrgB2QDhgDDigFIAJAAIA8AJIAKADIAHACIDNBzIAGAEIAEPOIAAA2IABBKIiCAqIgGAAIgBABIgBAAg");
	this.shape_40.setTransform(887.925,315.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#00CC00").s().p("EginATVIg3gyQjeksjJkgQlyt/jmusQF+APGTAXIAAAAMAxrAFbQCCAQCDAPMAh+AFfIAIACIABAAIABgBIBBAMQAcAcAMAbIAsDXIAdMxIhEFZIhzEFg");
	this.shape_41.setTransform(947.8,425.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9BBACA").s().p("Eg8CgMnMB3kAAAIAhAHIAATKIgIAlIkJgTQjoAGjoAKMgwrAB1Q7YBS6pB6IlfAZIgYACg");
	this.shape_42.setTransform(887.125,206.125);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#00CC00").s().p("EgixATJIg4gwQjjkfjRkUQlitzjgu7QF9ARGQAYIACAAQaZC6baDKMAiBAFhIAIACIABAAIACAAIAwAIQAbAbAOAaIA1DQIAjMwIhSFKIh7D6g");
	this.shape_43.setTransform(948.25,424.975);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#BFDFD9").s().p("EA6HAKIIgIgCMgiBgFiQ7ajJ6Zi5IgCAAQjfgVjZgNIktgQIiSgHIwciMIAWgCIEygXQZgh8aVhRMAzYgB3QDugCDvgFIAJAAIA6AMIAKAEIAHADIDEB5IAGAEIAEPOIAAA3IABBLIh8AuIgFABIgCAAIgBAAg");
	this.shape_44.setTransform(887.95,316.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#9FB9C6").s().p("Eg8CgMnMB3lAAAIAgAIIAATKIgKAkIkIgTQjwAGjuAJMgzYAB2Q6VBR5fB9IkzAXIgUACg");
	this.shape_45.setTransform(887.125,206.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#00CC00").s().p("Egi6AS9Ig5guQjrkSjXkJQlTtljYvLQF9ATGQAaQaUC9biDQMAiCAFkIAIABIABAAIADAAIAgAGQAbAaAOAZIA+DJIApMtIhgE8IiCDvg");
	this.shape_46.setTransform(948.7,423.975);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C2E1D6").s().p("EA6NAKQIgBAAIgIgBMgiCgFkQ7hjQ6Vi8QjggWjagOIktgSIiTgIIwciMIAkgEIDxgTQaZiKbbhSMAyTgBtQDxgBDxgDIAJAAIA3APIAKAEIAGADIC8CAIAGADIAFPRIAAA2IAABLIh3A0IgDAAIgEAAg");
	this.shape_47.setTransform(887.975,316.975);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#A3B7C2").s().p("Eg8CgMnMB3mAAAIAfAKIAATKIgLAiIkJgTQjrAEjqAJMgyTABsQ7bBT6ZCJIjxAUIgiADg");
	this.shape_48.setTransform(887.125,206.125);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#C4E2D4").s().p("EA6RAKZIgHgCMgiEgFmQjrgdjogdMguKgFZIgcgDQjhgWjZgPIktgTIiTgJIweiOIAggDIDNgSQYviJZyhSMA1sgBxQEIAAEJgDIAJAAIA0ASIAJAEIAHAEICzCGIAFAEIAGPSIAAA3IAABLIhyA4IgDABIgDAAIgCAAg");
	this.shape_49.setTransform(888,317.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#00CC00").s().p("EgjEASxIg6grQjxkGjfj9QlCtYjRvbQF8AVGQAcIAbACMAuJAFaQDpAeDqAcMAiEAFmIAIACIABAAIADAAIAQACQAcAZAPAZIBHDCIAuMrIhtEtIiKDkg");
	this.shape_50.setTransform(949.15,422.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#A7B6BE").s().p("Eg8CgMnMB3oAAAIAdALIAATKIgNAhIkJgTQj7ADj7AJMg1rABwQ5yBS4vCKIjOARIgdADg");
	this.shape_51.setTransform(887.125,206.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#C7E3D1").s().p("EA6bAKhIgDAAIgBAAIgIgBQxSi4wziwQjwgejuggMguLgFgIgTgDQjhgWjagRIksgUIiTgJIwfiQIAagCICjgPQa9igcYhUMAuegBbILmgDIAKAAIAyAVIAIAEIAGAEICrCNIAFAEIAGPUIAAA2IABBLIhtA+IgEAAg");
	this.shape_52.setTransform(888.025,318.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#00CC00").s().p("EgjOASlIg6gpQj4j6jmjwQkytMjLvqQF8AWGPAeIARACMAuMAFhQDtAgDwAdQQzCxRSC3IAIACIABAAIAEAAQAcAYAPAXIBQC7IA0MpIh6EfIiTDZg");
	this.shape_53.setTransform(949.6,421.975);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#ACB5B9").s().p("Eg8CgMnMB3pAAAIAcANIAATKIgPAfIkIgTQlhADldAJMgueABbQ8YBV69CfIijAPIgYACg");
	this.shape_54.setTransform(887.125,206.125);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#00CC00").s().p("EgjYASZIg7gnQj+jtjtjlQkis+jEv6QF6AYGPAfIAXADMAtyAFmQDLAXDLAaQQWCrQzCzICYAbIACABQAcAXAPAWIBZC0IA6MmIiIERIibDOg");
	this.shape_55.setTransform(950.05,420.975);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#CAE5CE").s().p("EA6dAKqIgIgCIgCAAIgCgCIiYgbQwziywWisQjLgZjLgYMgtygFlIgZgDQjhgYjagRIksgWIiTgKIwgiRIAVgCICGgNQaNikbshVMAwBgBaIMNgBIAJAAIAwAYIAIAFIAGAEICiCTIAFAFIAHPVIAAA2IAABLIhnBDIgHABIgBAAg");
	this.shape_56.setTransform(888.05,319.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#B0B3B5").s().p("Eg8CgMnMB3rAAAIAaAOIAATLIgQAdIkJgTQltAClqAIMgwAABbQ7tBU6NCkIiFANIgTACg");
	this.shape_57.setTransform(887.125,206.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#00CC00").s().p("EgjhASNIg8glQkFjgj0jZQkSsyi9wKQF2AbGJAgIAIABQZZDEbADdMAhFAFfICXAbIACACQAbAWARAVIBhCtIBAMkIiVECIijDDg");
	this.shape_58.setTransform(950.475,419.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CDE6CB").s().p("EA6kAKzIgBAAIgIgBIgSgDIgCgCIiXgbMghFgFfQ7Ajd5ZjEIgIgBQjegXjYgSIkqgYIiUgLIwhiSIA2gGIFuglQX/iXZWhOMAwTgBVIMiADIAJAAIAtAaIAIAFIAFAEICbCbIAEAEIAHPWIAAA3IAABLIhhBIIgHAAg");
	this.shape_59.setTransform(888.075,320.375);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#B4B2B1").s().p("Eg8CgMmMB3sAAAIAZAOIAATMIgSAbIkJgTQlxAAlsAIMgwTABVQ5XBO3+CXIluAlIg0AEg");
	this.shape_60.setTransform(887.125,206.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#00CC00").s().p("EgjrASCIg9gkQkLjUj8jMQkBsli3waQF0AcGIAiIAKABQZRDHbBDiQQPCtQyC0ICWAbIADACQAcAUARAUIBqCmIBGMiIijD0IirC5g");
	this.shape_61.setTransform(950.925,418.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#D0E8C8").s().p("EA6pAK9IgBAAIgIgBIghgGIgDgCIiWgbQwyi0wOisQ7Cji5QjHIgLgBQjdgYjXgTIkqgZIiTgMIwkiUIAxgFIE8giQYuikaWhPMAvkgBNIMmAGIAJAAIAqAdIAHAGIAGAEICSChIAEAEIAHPYIAAA2IAABMIhcBNIgHAAg");
	this.shape_62.setTransform(888.1,321.1125);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#B8B0AD").s().p("Eg8CgMmMB3tAAAIAYAQIAATLIgTAaIkJgTQlsgBloAGMgvkABNQ6WBP4uCkIk9AiIgtAEg");
	this.shape_63.setTransform(887.125,206.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#00CC00").s().p("Egj1AR2Ig+ghQkRjIkDjAQjxsZiwwpQF4AeGMAkIAPACMAtcAF7QDPAZDRAcQQLCsQxC1ICWAbIAEACQAbAUASATIBzCfIBMMfIixDmIiyCug");
	this.shape_64.setTransform(951.4,417.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#D2E9C6").s().p("EA6uALHIgIgCIgxgIIgDgCIiWgbQwxi1wLisQjRgcjPgZMgtcgF6IgSgCQjhgajcgUIkpgaIiUgNIwkiVIAtgGIEmghQYniraYhQMAsIgBIQIRACIbAHIAJAAIApAfIAGAHIAFAEICKCoIAEAEIAHPZIAAA3IABBMIhXBSIgHAAIgBAAg");
	this.shape_65.setTransform(888.125,321.875);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#BCAFA9").s().p("Eg8CgMmMB3vAAAIAWARIAATLIgVAZIkJgTQnqgEnjAGMgsIABJQ6YBP4nCsIkmAhIgqAEg");
	this.shape_66.setTransform(887.125,206.1);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#00CC00").s().p("Egj+ARqIg/gfQkYi7kLi0QjgsMipw5QF3AgGLAmIAIABMAtYAGBQDRAbDUAdQQHCsQxC2ICVAbIAEACQAcATASARIB8CYIBRMeIi+DYIi6Cig");
	this.shape_67.setTransform(951.825,416.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#D5EAC3").s().p("EA61ALSIgBAAIgIgCIhAgLIgEgCIiWgbQwxi2wHisQjTgdjSgbMgtYgGAIgKgCQjigajbgWIkpgbIiTgNIwmiXIAqgGIERgfQX4ivZrhRMAxUgBJQGtAGGzAIIAJAAIAmAiIAGAGIAFAGICBCtIAEAFIAIPaIAAA3IAABNIhRBXIgHAAg");
	this.shape_68.setTransform(888.15,322.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#C0AEA5").s().p("Eg8CgMmMB3wAAAIAVATIAATLIgWAXIkJgTQl9gFl3AEMgxUABJQ5rBQ34CvIkQAgIgnAEg");
	this.shape_69.setTransform(887.125,206.1);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#00CC00").s().p("EgkIAReIhAgdIowlXQjRr/iixIQF3AhGKAoIAHABMAtXAGKQDPAaDRAdQQDCsQwC3ICWAbIAEACQAbARAUASICECRIBYMbIjMDJIjCCYg");
	this.shape_70.setTransform(952.275,415.975);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#D8ECC0").s().p("EA67ALcIgBAAIgIgCIhQgOIgEgCIiWgbQwwi3wDisQjRgdjPgaMgtXgGJIgKgBQjigbjbgXIkpgdIiUgNIwmiZIAlgFIDqgdQZMjCbVhRMArsgA8QIbAGImAMIAKAAIAjAkIAGAIIAEAEIB5C0IAEAGIAIPcIAAA3IAABLIhLBdIgHAAg");
	this.shape_71.setTransform(888.175,323.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#C5ACA0").s().p("Eg8CgMmMB3xAAAIAUAUIAATMIgYAVIkJgTQnogIngADMgrrAA9Q7WBR5MDCIjqAdIghADg");
	this.shape_72.setTransform(887.125,206.1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#00CC00").s().p("EgkRARSIhBgbIo+k+QjBrzibxYQF2AlGJApIAGABMAtMAGPQDSAbDUAfQP/CsQvC3ICWAbIAEADQAcAQAUARICNCKIBdMZIjZC6IjLCNg");
	this.shape_73.setTransform(952.7,414.95);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#DBEDBD").s().p("EA7AALlIAAAAIgJgBIhfgRIgEgCIiWgbQwvi4v/isQjUgejSgcMgtMgGOIgJgBQjigdjbgXIkogeIiVgPIwoiaIAjgEIDVgcQYgjGarhSMAwxgA7QG3AJG/ALIAJAAIAhAoIAGAHIAEAGIBwC6IAEAGIAIPdIAAA3IABBMIhGBiIgIgBg");
	this.shape_74.setTransform(888.2,324.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#C9AB9C").s().p("Eg8CgMmMB3zAAAIASAVIAATNIgaATIkJgTQl6gIl0ABMgwxAA8Q6sBS4fDGIjVAbIgfADg");
	this.shape_75.setTransform(887.125,206.1);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#00CC00").s().p("EgkcARHIhBgZIpMkmQiwrmiUxoQF1AmGIArIAwAHMAtFAGWQC9AZC+AcQP8CtQvC4ICVAbIAFACQAbAQAVAPICWCDIBjMXIjnCsIjSCDg");
	this.shape_76.setTransform(953.175,413.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#DDEEBB").s().p("EA7GALwIgBAAIgIgCIhugTIgFgDIiVgbQwvi4v8itQi+gbi9gZMgtFgGWIg0gHQjigdjcgZIkogfIiUgPIwpicIAhgEIDGgbQYWjNashTMAxDgA3QHAAKHKAOIAJAAIAeAqIAGAIIADAGIBoDBIAEAFIAIPfIAAA3IABBMIhBBnIgHAAg");
	this.shape_77.setTransform(888.225,324.7125);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#CDAA98").s().p("Eg8CgMmMB30AAAIARAWIAATNIgbARIkJgTQl+gJl3AAMgxDAA3Q6sBT4WDNIjGAbIgdADg");
	this.shape_78.setTransform(887.125,206.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#00CC00").s().p("EgkmAQ7IhCgXQkxiKkoiEQigrZiOx3QF0AnGIAuIAnAFMAs9AGdQDCAaDDAdQP5CtQuC5ICVAbIAFADQAcAOAVAPICfB7IBpMVIj1CeIjaB4g");
	this.shape_79.setTransform(953.625,412.975);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E0F0B8").s().p("EA7MAL4IgBAAIgIgCIh+gWIgGgDIiUgbQwui5v5itQjDgdjCgaMgs9gGcIgrgGQjigejdgaIkmggIiVgQIwqidIAbgEICfgWQY9jdbkhUMA0QgAqIKWAXIAKAAIAbAtIAGAIIADAGIBgDIIACAGIAJPfIAAA4IABBMIg7BsIgHAAg");
	this.shape_80.setTransform(888.25,325.6625);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#D1A894").s().p("Eg8CgMmMB32AAAIAPAYIAATMIgdAQIkJgTQj7gHj4AAMg0RAAqQ7jBT49DdIifAXIgXACg");
	this.shape_81.setTransform(887.125,206.1);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#00CC00").s().p("EgkvAQvIhDgVIpnj1QiQrNiHyGQF0AqGGAuMAwKAHDQBsAOBtAQQP1CuQuC6ICTAbIAGACQAbAOAXAOICoB0IBuMTIkCCQIjiBsg");
	this.shape_82.setTransform(954.05,411.95);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#E3F1B5").s().p("EA7SAMBIgBAAIgIgCIiPgZIgFgCIiUgbQwti6v1itQhtgRhsgOMgwKgHCIgEAAQjigfjdgaIkmgiIiVgRIwrifIA6gJIF4g1QXAjHZVhNMA0fgAlIKnAaIAJAAIAaAvIAEAJIADAGIBYDPIACAGIAKPhIAAA3IAABNIg1BxIgHgBg");
	this.shape_83.setTransform(888.275,326.4375);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#D5A790").s().p("Eg8CgMmMB33AAAIAOAaIAATMIgeAOIkKgTQj9gIj6gBMg0eAAkQ5VBN3BDIIl4A1Ig1AHg");
	this.shape_84.setTransform(887.125,206.075);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#00CC00").s().p("Egk5AQjIhEgTQk+hwk3hsQh/rAiAyWIITA+IDhAdIAEAAQYQDfbMELQPxCuQtC7ICUAZIAHAEQAbANAXANICwBtIB0MQIkPCBIjqBig");
	this.shape_85.setTransform(954.5,410.95);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#E6F3B2").s().p("EA7YAMLIgBAAIgIgBIidgcIgHgEIiUgZQwti7vxiuQ7MkL4QjeIgEAAIjhgdQhwgQhvgOIklgjIiUgSIwuigIA6gJIF0g2QWAjGYRhQMA2SgAkILJAcIAJAAIAXAzIAEAJIADAGIBPDVIADAGIAJPiIAAA4IABBNIgxB1IgGAAg");
	this.shape_86.setTransform(888.3,327.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#D9A58C").s().p("Eg8CgMmMB34AAAIANAbIAATNIggAMIkJgTQkHgJkEgDMg2TAAlQ4QBP2ADGIl0A3Ig1AHg");
	this.shape_87.setTransform(887.125,206.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#00CC00").s().p("EglCAQXIhFgRIqDjEQhvqzh6ylIIRBAIDiAeIAEABQYHDhbOEQQPuCuQsC7ICUAbIAIADQAbAMAWAMIC6BmIB6MOIkdBzIjyBXg");
	this.shape_88.setTransform(954.95,409.975);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#E9F4AF").s().p("EA7dAMUIgBAAIgIgBIirgfIgIgDIiUgbQwsi7vuiuQ7NkQ4IjgIgEgBIjhgeQhwgRhvgOIklglIiVgSIwuihIA1gJIFPgzQYOjkbIhLMAycgAQIKvAeIAKAAIAUA1IAEAKIACAHIBHDbIACAHIAKPjIAAA4IABBNIgrB7IgHgBg");
	this.shape_89.setTransform(888.325,327.975);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#DEA487").s().p("Eg8CgMmMB36AAAIALAcIAATOIgiAKIkJgTQjzgJjxgEMgycAAQQ7IBL4ODkIlPAzIgwAHg");
	this.shape_90.setTransform(887.125,206.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#00CC00").s().p("EglNAQLIhFgOQlLhXlFhUQhgqmhyy3QFxAvGEA0IAQADMAv3AHZQBkAOBjAQQPqCtQsC9ICTAbIAIADIAzAVIDCBfICAMNIkrBkIj5BMg");
	this.shape_91.setTransform(955.4,408.95);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#EBF5AD").s().p("EA7iAMfIgBAAIgIgCIi6ghIgIgEIiUgaQwri9vqitQhkgQhjgOMgv3gHZIgVgDQjjggjdgeIklgmIiUgTIwwijIA1gJIFNg1QWajaZChQMA1zgAWQFsAPF0ATIAJAAIASA4IAEAKIACAHIA+DiIACAGIAKPmIAAA3IABBNIgmCAIgHAAg");
	this.shape_92.setTransform(888.35,328.675);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#E2A383").s().p("Eg8CgMmMB37AAAIAKAeIAATNIgjAJIkJgTQkGgLkCgFMg1yAAWQ5CBQ2bDaIlNA1IgvAHg");
	this.shape_93.setTransform(887.125,206.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#00CC00").s().p("EglWAP/IhGgMIqfiTQhPqZhszFQFxAwGDA2IAcAEMAviAHfQBlAOBlAQQPmCuQrC9ICTAbIAJAEIAyATIDMBZICGMJIk5BXIkCBAg");
	this.shape_94.setTransform(955.85,407.95);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#EEF7AA").s().p("EA7oAMoIgBAAIgIgBIjJgkIgKgEIiSgbQwri9vniuQhlgQhkgOMgvigHeIghgFQjjghjdgfIklgoIiVgUIwwikIA0gJIFHg2QXBjnZ7hPMA0jgALQFuARF1ATIAJAAIAQA7IACALIACAHIA2DpIACAGIALPnIAAA4IAABMIggCGIgHgBg");
	this.shape_95.setTransform(888.375,329.45);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#E6A17F").s().p("Eg8CgMmMB38AAAIAJAfIAATOIglAHIkJgTQkAgMj8gGMg0kAALQ56BO3CDoIlHA2IguAHg");
	this.shape_96.setTransform(887.125,206.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#00CC00").s().p("EglgAP0IhHgLQlYg+lUg8Qg/qNhlzUQFwAyGCA4IAMABMAvpAHoIDMAgQPiCtQrC/ICSAZIAKAEIAzASIDUBSICMMIIlGBIIkKA2g");
	this.shape_97.setTransform(956.3,406.95);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#F1F8A7").s().p("EA7uAMtIgBAAIgIgCIjZgnIgKgEIiSgaQwri+viiuIjMggMgvpgHmIgRgDQjkgijdggIkkgpIiUgUIwzinIAdgFIFcg7QVmjgYThTMA7WgAEIIBAdIAKAAIANA9IACALIACAIIAuDuIABAHIALPoIAAA4IAABOIgaCJIgHAAg");
	this.shape_98.setTransform(888.4,330.7);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#EAA07B").s().p("Eg8CgMmMB3+AAAIAHAgIAATOIgmAGIkKgTQiHgHiGgDMg7WAAEQ4TBT1mDgIlcA7IgXAEg");
	this.shape_99.setTransform(887.125,206.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#00CC00").s().p("EglqAPoIhHgJQlfgxlbgxQgvp/hezlQFvA0GBA6IAaAEMAxCAH/IBeAOQPfCuQqC/ICSAZIAMAFIAyAQIDdBLICRMFIplBlg");
	this.shape_100.setTransform(956.725,405.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#F4F9A4").s().p("EA70ANCIgBAAIgIgCIjngpIgMgEIiSgaQwqjAvfitIhegPMgxCgH+IgfgFInBhEIkjgqIiWgVIwzioIAbgFIEzg2QY9kPcvhHMA0sAAZIHvAeIAKAAIAKBAIACALIABAIIAmD1IABAIIALPpIAAA4IABBNIgVCQIgHgBg");
	this.shape_101.setTransform(888.425,330.3125);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#EE9F77").s().p("Eg8CgMmMB3/AAAIAGAiIAATOIgoAEIkJgTQh3gHh3gDMg0sgAaQ8vBI49EOIkzA3IgVADg");
	this.shape_102.setTransform(887.125,206.075);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#00CC00").s().p("EglzAPcIhJgGIrIhJQgep0hYz0IGPA7IFKAzIAWADQXfDwbUEpQPcCvQpC/ICRAaIALADIA1APIDlBEICYMDIp7BMg");
	this.shape_103.setTransform(957.175,404.95);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#F7FBA1").s().p("EA75ANEIgBAAIgIgCIj4gtIgLgDIiRgaQwpjAvciuQ7Tkq3gjvIgVgDIlKgzIhogQIkigsIiWgWIw0ipIBEgNIOxicQRBibSwhAMA7dAAJQENAQERARIAJAAIAJBDIABAMIABAIIAdD8IANPyIAAA4IAABOIgPCUIgIgBg");
	this.shape_104.setTransform(888.45,331.8375);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#F29D73").s().p("Eg8CgMmMB4BAAAIAEAjIAATOIgpADIkKgTQiIgIiHgFMg7dgAJQywBAxBCbIuxCcIg9ALg");
	this.shape_105.setTransform(887.125,206.05);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#00CC00").s().p("Egl+APQIhJgEIrVgxQgOpmhR0EQFtA4GAA8IAMADMAxBAIPIBfAQQPYCuQoDAICRAbIAPADIAyANIDvA9ICdMBIqRAyg");
	this.shape_106.setTransform(957.65,403.95);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#F9FC9F").s().p("EA7/ANOIgBAAIgIgCIkEgwIgPgDIiRgbQwojAvYivIhfgPMgxBgIPIgSgDInChIIkigtIiWgWIw1irIAsgJIS4jGQOah9Pqg6MA/bAARIGpAcIAKAAIAGBFIABAMIAAAJIAVECIANP0IAAA4IAABOIgKCaIgHgBg");
	this.shape_107.setTransform(888.475,332.6125);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#F79C6E").s().p("Eg8CgMmMB4CAAAIADAlIAATOIgrAAIkKgTQhGgEhGgDMg/bgAQQvrA6uaB9Iy3DGIgmAHg");
	this.shape_108.setTransform(887.125,206.05);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FB9A6A").s().p("Eg8CgMmMB4DAAAIACT1IgtgCIkJgTIhAgDMg67gAwQvCAst2BpI5pEDIgsAIg");
	this.shape_109.setTransform(887.125,206.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#00CC00").s().p("EgmHAPFIhKgCIrjgZQACpZhK0UILrB4IAGABMAxtAIgIAzAIQPUCvQoDAICQAaIASAFIAwALID3A2ICjL+IqmAag");
	this.shape_110.setTransform(958.075,402.95);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FCFE9C").s().p("EA8FANkIgBAAIgIgCIkRgyIgSgEIiQgaQwojCvViuIgygJMgxtgIeIgMgDInChJIkiguIiWgYIw3isIAzgKIZpkDQN3hpPBgrMA67AAvIFqAZIAKAAIADBJIAAAMIABAJIAMEJIANP2IAAA4IAABNIgECfIgHgBg");
	this.shape_111.setTransform(888.5,332.1);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FF9966").s().p("Eg8CgMnMB4FAAAIAAT3UhFpgFQgycAKog");
	this.shape_112.setTransform(887.125,206.15);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFF99").s().p("EgpCgDzIzOjFUAybgKoBFpAFPIAKAAIARVoIACEqUg6tgKzgqmgHBg");
	this.shape_113.setTransform(888.575,331.0787);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#00CC00").s().p("EgzNAO4QATpMhE0jUAqoAHBA6sAKyICpL8g");
	this.shape_114.setTransform(958.525,401.95);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFF99").s().p("EgkKgDKI4GjuUAybgKoBFpAFPIAKAAIARVoIACEqUg6tgKzglugGYg");
	this.shape_115.setTransform(888.575,331.0787);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#00CC00").s().p("EglPAThMgK+gnBUAlvAGZA6sAKzIAAV1g");
	this.shape_116.setTransform(965.675,435.65);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#00CC00").s().p("EgliATSMgKZgmjUAlLAF7A6sAKzIAAV1g");
	this.shape_117.setTransform(967.525,437.15);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFF9C").s().p("EgjlgCsI4rkMUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzglJgF6g");
	this.shape_118.setTransform(888.575,331.0829);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#00CC00").s().p("Egl0ATDMgJ0gmFUAklAFdA6sAKzIAAV1g");
	this.shape_119.setTransform(969.375,438.65);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFF9E").s().p("EgjAgCOI5QkqUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgkkgFcg");
	this.shape_120.setTransform(888.575,331.0829);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#00CC00").s().p("EgmHAS0MgJPglnUAkBAE/A6sAKzIAAV1g");
	this.shape_121.setTransform(971.225,440.15);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFA1").s().p("EgibgBwI51lIUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgj/gE+g");
	this.shape_122.setTransform(888.575,331.0829);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#00CC00").s().p("EgmZASlMgIqglJUAjbAEhA6sAKzIAAV1g");
	this.shape_123.setTransform(973.075,441.65);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFA4").s().p("Egh2gBSI6almUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgjagEgg");
	this.shape_124.setTransform(888.575,331.0829);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#00CC00").s().p("EgmrASWMgIGgkrUAi3AEDA6sAKzIAAV1g");
	this.shape_125.setTransform(974.9,443.15);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFA6").s().p("EghSgA0I6+mEUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgi2gECg");
	this.shape_126.setTransform(888.575,331.0829);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#00CC00").s().p("Egm+ASHMgHggkNUAiSADlA6sAKzIAAV1g");
	this.shape_127.setTransform(976.75,444.65);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFA9").s().p("EggtgAWI7jmiUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgiRgDkg");
	this.shape_128.setTransform(888.575,331.0829);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#00CC00").s().p("EgnQAR4MgG8gjvUAhtADHA6sAKzIAAV1g");
	this.shape_129.setTransform(978.6,446.15);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFAC").s().p("EggIAAHI8Im/UAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzghsgDHg");
	this.shape_130.setTransform(888.575,331.0829);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#00CC00").s().p("EgnjARpMgGWgjRUAhIACpA6sAKzIAAV1g");
	this.shape_131.setTransform(980.45,447.65);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFAE").s().p("A/jAlI8tndUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzghHgCpg");
	this.shape_132.setTransform(888.575,331.0829);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#00CC00").s().p("Egn1ARaMgFygizUAgjACLA6sAKzIAAV1g");
	this.shape_133.setTransform(982.3,449.15);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFB1").s().p("A++BDI9Sn7UAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzggigCLg");
	this.shape_134.setTransform(888.575,331.0829);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#00CC00").s().p("EgoIARLMgFNgiVUAf/ABtA6sAKzIAAV1g");
	this.shape_135.setTransform(984.15,450.625);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFB4").s().p("A+ZBgI93oYUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgf9gBug");
	this.shape_136.setTransform(888.575,331.0829);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#00CC00").s().p("EgoaAQ8MgEogh3UAfZABPA6sAKzIAAV1g");
	this.shape_137.setTransform(986,452.125);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFB7").s().p("A90B+I+co2UAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgfYgBQg");
	this.shape_138.setTransform(888.575,331.0829);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#00CC00").s().p("EgotAQtMgEDghZUAe1AAxA6sAKzIAAV1g");
	this.shape_139.setTransform(987.85,453.625);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFB9").s().p("A9PCcI/BpUUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgezgAyg");
	this.shape_140.setTransform(888.575,331.0829);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#00CC00").s().p("Ego/AQeMgDegg7UAePAATA6sAKzIAAV1g");
	this.shape_141.setTransform(989.7,455.125);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFBC").s().p("A8qC6I/mpyUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgeOgAUg");
	this.shape_142.setTransform(888.575,331.0829);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#00CC00").s().p("EgpSAQPMgC4ggdUAdqgALA6sAKzIAAV1g");
	this.shape_143.setTransform(991.55,456.6171);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFBF").s().p("A8FDYMggLgKQUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgdpAAKg");
	this.shape_144.setTransform(888.575,331.0829);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#00CC00").s().p("EgpkAQBIiU//UAdFgApA6sAKzIAAV1g");
	this.shape_145.setTransform(993.375,458.0129);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFC1").s().p("A7gD2MggwgKuUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgdEAAog");
	this.shape_146.setTransform(888.575,331.0829);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#00CC00").s().p("Egp3AP1Ihv/iUAchgBGA6sAKzIAAV1g");
	this.shape_147.setTransform(995.225,459.2987);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFC4").s().p("A67EUMghVgLMUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgcfABGg");
	this.shape_148.setTransform(888.575,331.0829);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#00CC00").s().p("EgqJAPpIhK/EUAb7gBkA6sAKzIAAV1g");
	this.shape_149.setTransform(997.075,460.487);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFC7").s().p("A6WEyMgh6gLqUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgb6ABkg");
	this.shape_150.setTransform(888.575,331.0829);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#00CC00").s().p("EgqcAPeIgl+mUAbXgCCA6sAKzIAAV1g");
	this.shape_151.setTransform(998.925,461.5885);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFC9").s().p("A5xFQMgifgMIUAybgKoBFpAFPIAKAAIASVoIABEqUg6tgKzgbVACCg");
	this.shape_152.setTransform(888.575,331.0829);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFCC").s().p("A5MFuMgjEgMmUAybgKoBFpAFPIAKAAIARVoIACEqUg6tgKzgawACgg");
	this.shape_153.setTransform(888.575,331.0787);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#00CC00").s().p("EgquAPTIAA+HUAaxgChA6sAKzIAAV1g");
	this.shape_154.setTransform(1000.775,462.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]},44).to({state:[]},149).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},153).to({state:[{t:this.shape_4},{t:this.shape_6},{t:this.shape_5}]},311).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},1).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31}]},1).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]},1).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37}]},1).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40}]},1).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43}]},1).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49}]},1).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]},1).to({state:[{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]},1).to({state:[{t:this.shape_63},{t:this.shape_62},{t:this.shape_61}]},1).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64}]},1).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67}]},1).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70}]},1).to({state:[{t:this.shape_75},{t:this.shape_74},{t:this.shape_73}]},1).to({state:[{t:this.shape_78},{t:this.shape_77},{t:this.shape_76}]},1).to({state:[{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82}]},1).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85}]},1).to({state:[{t:this.shape_90},{t:this.shape_89},{t:this.shape_88}]},1).to({state:[{t:this.shape_93},{t:this.shape_92},{t:this.shape_91}]},1).to({state:[{t:this.shape_96},{t:this.shape_95},{t:this.shape_94}]},1).to({state:[{t:this.shape_99},{t:this.shape_98},{t:this.shape_97}]},1).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100}]},1).to({state:[{t:this.shape_105},{t:this.shape_104},{t:this.shape_103}]},1).to({state:[{t:this.shape_108},{t:this.shape_107},{t:this.shape_106}]},1).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109}]},1).to({state:[{t:this.shape_114},{t:this.shape_113},{t:this.shape_112}]},1).to({state:[{t:this.shape_116},{t:this.shape_115},{t:this.shape_112}]},31).to({state:[{t:this.shape_118},{t:this.shape_112},{t:this.shape_117}]},1).to({state:[{t:this.shape_120},{t:this.shape_112},{t:this.shape_119}]},1).to({state:[{t:this.shape_122},{t:this.shape_112},{t:this.shape_121}]},1).to({state:[{t:this.shape_124},{t:this.shape_112},{t:this.shape_123}]},1).to({state:[{t:this.shape_126},{t:this.shape_112},{t:this.shape_125}]},1).to({state:[{t:this.shape_128},{t:this.shape_112},{t:this.shape_127}]},1).to({state:[{t:this.shape_130},{t:this.shape_112},{t:this.shape_129}]},1).to({state:[{t:this.shape_132},{t:this.shape_112},{t:this.shape_131}]},1).to({state:[{t:this.shape_134},{t:this.shape_112},{t:this.shape_133}]},1).to({state:[{t:this.shape_136},{t:this.shape_112},{t:this.shape_135}]},1).to({state:[{t:this.shape_138},{t:this.shape_112},{t:this.shape_137}]},1).to({state:[{t:this.shape_140},{t:this.shape_112},{t:this.shape_139}]},1).to({state:[{t:this.shape_142},{t:this.shape_112},{t:this.shape_141}]},1).to({state:[{t:this.shape_144},{t:this.shape_112},{t:this.shape_143}]},1).to({state:[{t:this.shape_146},{t:this.shape_112},{t:this.shape_145}]},1).to({state:[{t:this.shape_148},{t:this.shape_112},{t:this.shape_147}]},1).to({state:[{t:this.shape_150},{t:this.shape_112},{t:this.shape_149}]},1).to({state:[{t:this.shape_152},{t:this.shape_112},{t:this.shape_151}]},1).to({state:[{t:this.shape_154},{t:this.shape_112},{t:this.shape_153}]},1).wait(52));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_חלון_בביתוזבל_עם_איש = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// חלון_בביתוזבל_עם_איש
	this.instance = new lib.shining_bling();
	this.instance.setTransform(716.7,253.75,0.133,0.173,29.9938,0,0,49.1,47);

	this.instance_1 = new lib.shining_bling();
	this.instance_1.setTransform(699.45,194.35,0.221,0.1946,0,0,180,48.4,46.8);

	this.instance_2 = new lib.personArm();
	this.instance_2.setTransform(767.75,244.65,1,1,0,0,0,21.6,5);

	this.instance_3 = new lib.personMouth2();
	this.instance_3.setTransform(759.6,237.05,0.1938,0.214,29.9921,0,0,17.7,-47.6);

	this.instance_4 = new lib.cloud();
	this.instance_4.setTransform(1041.7,122.3,0.6781,1.6119,0,-84.4027,63.0602,155.9,82.7);

	this.instance_5 = new lib.cloud();
	this.instance_5.setTransform(115,71.45,0.3334,0.9998,75.0015,0,0,155.8,82.3);

	this.instance_6 = new lib.cloud();
	this.instance_6.setTransform(303.05,199,1,1,0,0,0,138,88.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(6,1,1).p("ACSAwQgCAAgCAAQg3gFg7gJIithRAiRgvQACAAABABQAAAAAAAAQCBAgBQgO");
	this.shape.setTransform(731.55,244.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9933").ss(2,1,1).p("AAAgBIAkAAIBNAAIA1AAIC0AAIA3AAIAdAAIAOAAIBAAAIBSAAApNgBIADAAICUAAIEeAAICYAAIAAA8IAADeIAAAUIAAAnIAACfAAAnzIAAHy");
	this.shape_1.setTransform(745.725,221.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1.9,1,1).p("ABYAMQAzAPgQAqAh+g8QAkgSAUATQAHAGAFAK");
	this.shape_2.setTransform(781.8767,209.5562);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2,1,1).p("AFCjhQggACgrgLQhegXgmgkQgGgFgEgFQgcghAAgsQAAgyAmgkQAmgkgbAtQgbAuB5gJQB5gJAqBKQAXAqgDAdQAEAJACAKQAGADAEAEQASARAAAiQAAAigRAYQgJANgLAGQgKAFgLAAQgYAAgRgYQgRgYAAgiQAAgKABgIQABgTAFgHQAGgKAigHQASgDANADAGTkcQgBAIgDAIQAFABAFACAGQiCQgJAegMAhQgLAbgKAZQAAACgBABQg1CHgRAxQhjCfghCYAkrHjQAJiFAchgQAYgcAPgkQAfhHAshLQACgDACgEQAPgZAPgYQABgBABgCQAxhOA9hSQA6hPAxgxAhnE6QAAgCABgBQAAgCABgBQABgCADgBQADgCAFABQAEABACADQABACAAABQABADgBACQAAABAAABQgBADgEABQgDACgFgBQgEgBgCgDQgCgDAAgCQgTAAgUARQgBgBgBgBQgCgBgCgCQgigcAigLQACAAACgBQACAAACgBQANARAaAGAhSE3QAVACAbgEQAhAaguAQQgRgZgSgIAk8CsIh4AA");
	this.shape_3.setTransform(760.6375,222.4799);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(0.1,1,1).p("AGrgdQgQAagXALQgXAMgRgJQgRgJAAgYQAAgDAAgEQAAgCAAgBQADgUAMgVQAQgaAYgNQAXgMAQAJQARAJABAZQAAAYgOAZQgBABgBACgAEFhjQgQAagYAMQgXAMgRgJQgQgJgBgZQAAgZAQgbQAQgaAXgMQAXgMARAJQARAJAAAZQABAZgQAbgAGPBQQgCAIgQADQgPACgTgFQgTgFgMgJQgMgJACgIQACgJAQgCQAPgCATAEQATAFAMAKQAMAJgCAIgACXgLQgGAGgPgFQgOgFgOgOQAAAAgBAAQgBgCgCgBQgLgMgFgMQgFgNAGgGQAHgGAOAFQAPAFAOANQANANAGANQAAABAAAAQABABAAABQAFANgHAFgAm3C+QgCAAgBAA");
	this.shape_4.setTransform(747.2007,224.2199);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC6600").s().p("AgpBwIAAjfIBTAAIAADfg");
	this.shape_5.setTransform(816.3,228.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCCFF").s().p("ABrBSQgTgFgMgJQgMgJACgIQADgJAPgCQAPgCAUAEQATAFAMAKQAMAJgCAIQgDAIgPADIgLABQgLAAgNgEgAhsgQQgPgFgOgOIAAAAIgDgDQgMgMgEgMQgGgNAHgGQAGgGAPAFQAOAFAOANQANANAGANIg1AAIA1AAIABABIAAACQAFANgGAFQgEADgFAAQgFAAgHgCgAhXgmg");
	this.shape_6.setTransform(771.1882,224.828);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("ABSBAIAAgJIgBgDQgCgOgSACQgYAEANgVQAMgWASgJQASgKAMAHQAMAGAAATQAAATgMATIgBADIgBAAQgMAVgJAHIgDACQgFAAADgVgABuA0IgdAAgAhUgFQADgbgYADQgYADANgVQANgVARgKQASgKANAGQAMAHgBAUQAAATgNAWQgNAUgIAHIgEACQgEAAACgUg");
	this.shape_7.setTransform(777.687,215.6535);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AjaGAQgBADgDABQgEACgEgBQgFgBgCgDIgBgFIAAgDIACgDIADgDQAEgCAEABQAFABACADIABADIAAADIAAACIgBACIABgCIAAgCIAAgDQAVACAbgEQAhAaguAQQgRgZgTgIgAkXGMIgFgEQghgcAhgLIAAAnIAAgnIAFgBIADgBQANARAbAGIgCADIAAADQgTAAgVARIgBgBgAjsF2IAAAAgAkcFhgADKhTQgRgYAAgiIABgSQACgTAEgHQAHgKAigHIADAAIAAAAIAAAAIAOgBIABAAIAAAAIALABIACAAIgCAAIgLgBIAAAAIgBAAIgOABIAAAAIAAAAIgDAAQgiAHgHAKQgEAHgCATQggACgrgLQhegXglgkIgJgKQgdghAAgsQAAgyAmgkQAlgkgaAtQgbAuB5gJQB5gJApBKQAYAqgDAdQgBAIgDAIIAKADQAFADAFAEQARARAAAiQAAAigRAYQgJANgLAGQgJAFgMAAQgYAAgRgYg");
	this.shape_8.setTransform(774.1619,215.8549);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F6F6F9").s().p("AliGHQAJiGAchfQAYgcAPgkQAghHArhKIAFgHIAegyIACgDQAxhOA9hSQA6hPAxgxIAJAKQAmAkBeAXQArAKAggBIgBASQAAAiARAXQARAZAYAAQAMgBAJgFQgIAfgNAgIgUA1IhAAAQAOgYAAgXIAAgBQAAgagRgIQgHgEgIAAIgBAAIAAAAQgJAAgKAEIgBABIgCAAIgBABIgBAAQgXANgQAaQgNAVgCAUIizAAICzAAIAAADIgBAGIAAABQABAZAQAKIABAAQAHADAIAAIAAAAIAAAAQALAAAMgGIABAAQAXgMAQgbQgQAbgXAMIgBAAQgMAGgLAAIAAAAIAAAAQgIAAgHgDIgBAAQgQgKgBgZIAAgBIABgGIAAgDIA3AAIAAADIAAAIQgEAbAJgHQAJgHANgVIAAgBIABgCIAOAAIgCADIACgDIBAAAIgBADQg1CHgRAxQhjCfghCYIkrAGgAjLGJIAAifIAFADIABABQAVgQATAAIABAEQACAEAFABQAEABAEgCQADgCABgDQATAJARAZQAugQghgaQgbAEgVgCIgBgDQgCgDgFgCQgEgBgEADIgDADQgbgGgNgRIgDABIgFABQghAKAhAdgAjLDDIAAgUIAFAAIgFAAIAAjeIAADeQg2gEg8gJQA8AJA2AEgACHgcQgPACgDAJQgCAIAMAJQAMAJATAEQAUAFAPgCQAPgDADgHQACgIgMgJQgMgKgTgEQgOgEgLAAIgKABgAhZhrIADADIAAAAQAOAOAPAFQAOAFAHgGQAGgFgFgNIAAgCIgBgBQgGgNgNgNQgOgNgOgFQgPgFgGAGQgHAGAGANQAFANALALIhNAAIBNAAIAAAAgAAJiBQAJAAAMgFIAAgBIAAAAIACgBIABAAQAXgMAQgaQgQAagXAMIgBAAIgCABIAAAAIAAABQgMAFgJAAIgBAAIAAAAQgIAAgGgDIAAgBQgRgJAAgZIAAgCQAAgYAPgZQAPgaAYgNIADgBIABgBIABAAQAJgEAJgBIABAAIAAAAQAIAAAHAEIAAAAQARAKABAZIAAABQAAAYgQAaQAQgaAAgYIAAgBQgBgZgRgKIAAAAQgHgEgIAAIAAAAIgBAAQgJABgJAEIgBAAIgBABIgDABQgYANgPAaQgPAZAAAYIAAACQAAAZARAJIAAABQAGADAIAAIAAAAIABAAgAAfimQgDAbAJgHQAIgIANgVQANgVAAgTQABgUgMgHQgNgGgSAJQgRALgMAVQgNAVAXgDIAFgBQATAAgDAYgAEZiXQAEgKAAgJQAAgbgngLQAnALAAAbQAAAJgEAKgABXkYQAHAGAFAKQgFgKgHgGIgBgBQgKgJgNAAIgBAAIAAAAQgMAAgPAHIgBABIgBAAIgBABIAAAAIgBAAIABAAIAAAAIABgBIABAAIABgBQAPgHAMAAIAAAAIABAAQANAAAKAJIABABgAjLDqIAAAAgAjLCvIAAAAgADwhrIgOAAQAMgUAAgSQAAgUgMgGQgMgHgSAKQgSAKgMAWQgNAUAYgDQASgCADAOIg3AAQACgUANgVQAQgaAXgNIABAAIABgBIACAAIABgBQAKgEAJAAIAAAAIABAAQAIAAAHAEQARAIAAAaIAAABQAAAXgOAYgADihrgACPhrgAhZhrgAFZloQADgIABgJIAGAUIgKgDg");
	this.shape_9.setTransform(766.075,231.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF99").s().p("AAAH1IEsgFQAhiYBjigQARgwA1iIIABgCIAUg1QANghAJgeQAKgGAKgNQARgYAAghQAAgigSgRQgEgFgGgCIgGgUQADgdgXgqQgqhJh5AJQh6AIAbgtQAcgugmAkQgmAkAAAzQAAAsAcAgQgxAyg7BPQg9BSgxBOIgjAAIAAnyIAAHyIiZAAICZAAIAAA7QgsBLggBHQgYAEgdAAIgBAAIAAAAQhAAAhWgVIgDAAIgCgBIAAAAIgDgBIB4AAQAPhSAAhmIAAgCQgBglgCgoQARgTAAgbQAAgdgUgJIgEgCIgBgFIgEgkIg2AAIgXgGIgCAGIhlAAIgCgGIgYAGIguAAIgHAkIgCANIgCABQgZAGABAeQAAAaASAUQgDAkABAkIiUAAICUAAIAAACQABBcASBcICEAAIAAAAIADABIAAAAIACABIADAAQBWAVBAAAIAAAAIABAAQAdAAAYgEQgOAkgYAbIiuhSICuBSQgdBggICGICaAFIpOAAIAAn3IAAnyIJLAAIJSAAIAAPpgAmtDcIgDAAIADAAgAJKgCIhTAAgAh1EKgAhPDLIAAAAgAgDgCIAjAAIgCACIgeAxIgDAIgAgDgCg");
	this.shape_10.setTransform(746.15,221.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},193).wait(153));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.sad_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.phone_sad_mouth();
	this.instance.setTransform(402.55,352.9,1,1,0,0,0,103.4,49.1);

	this.instance_1 = new lib.tears();
	this.instance_1.setTransform(474.65,205.4,1,1,0,0,0,15.4,31.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#535353").s().p("AAAAFIAAgBIAAgBIAAgBIAAgCQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAgBABAAIAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAABQAAgBABAAQAAAAAAABQAAAAAAAAQAAAAAAABIABABIAAACIAAAAIAAAEIAAAAIAAABIAAABIgBACIgBgCg");
	this.shape.setTransform(461.1127,144.7957);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#303030").s().p("AW7XqQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABgBAAAAQAAAAABAAQAAAAABAAIETAAQB5ifBSiiQA6hyAmh0IAJgdQAghpAQhrQAejNgBjQQgCi6gbi7IgIg0IAAgCIABADIABAAIAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQABAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBIABAFIABAIIAGApQAbC8ACC7QABDRgeDNQgQBsggBqIgKAdQgmB1g6BzQhTCjh7ChIgBABIgDABgA7CXqIgCgBIgCgBQizjfhijdQgYg4gUg4IAAAAIgKgdIAAAAQgtiMgNiLQgPiwACitIABgaIAAAAIABgEIAEgBIAAAAQBUgEAugTIAAABQBpgsBhiYQBhiXgbi/QgLhOgMhBQgRhdgSg/QgfhohTiuIAAgBIgGgLIAAgDIACgDIAOgNIABAAQFMknG5iZIABAAIADAAQAAAAAAABQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQAAAAgBAAIgBABQm2CYlKElIgIAUQBTCvAeBoQATA/ARBeQAMBBALBPQAbDChjCbQhiCahsAtIAAAAQguAShTAFIgBAVQgCCtAPCvQANCKAtCLIAAgBIAKAeIAAAAQATA3AYA4QBhDbCyDdIBLAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAgAj92IQhxgEhxgHIAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABgBIADgBIAAAAQBxAHBxAEQCMAFCBgCIAAAAIADACQABAAAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABIgDABIAAAAIhBABQhjAAhpgEgAnm3IQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAAAAAQBxgNB2gGQCSgHCIAEIAAAAIADABQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgBAAQiHgEiRAHQh1AGhxANIAAAAIgDgBg");
	this.shape_1.setTransform(418.0611,269.1803);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhZS8IgkiFIjAAXQCHggCTAGIAlACIgqCfIgBgBIgZBfgEAxlAN+QgHgFgCgIQiXqXrJA9QgJAAgHgGQgGgFgBgJQgBgJAGgHQAGgHAJgBQLvhACeK8QACAJgFAHQgEAIgJACIgFABQgGAAgGgEgEgxwAKOQgJAAgHgHQgGgGAAgJQAAgJAHgHIAtgqIAAAAQDfjLDjg+QDLg3DOA3QBZAYBaAuQCJBFCLB4QAHAGABAJQAAAJgGAHQgFAGgJABQgJABgHgGQiHh0iFhDQhWgshVgXQjCg0i/A0QjaA8jXDDIAAABIgsAoQgGAHgJAAIAAAAgALEmKIgBAAIgBgBIgBAAQg2gegygUIgXgJIAAAAQgNgIgbgIIAAgCIAAAAIAAgBQAcAJANAIIAXAJQAyAUA2AeIADABIAAAAQATAGAPgGQAQgIAMgXIABgBIABAAIABABIgBABQgMAYgRAIQgIAEgJAAQgJAAgKgEgAnhmWIg1gcIgBAAIAAAAIAAAAQgLgHhCgRIgvgDQghAAgoAEIgpAEIgBAAQgPgFgRAFIgVAAQgSABgeAHQgYAFgfAJIgGABIgFACIgBgBIAAAAIAAgBIABgBIAEgBIAGgCQAfgIAYgFQAfgHASgBIAEAAIARgBQARgEAPAEQgYg9AAhRQAAhlAlhHQAlhGA0AAQA1AAAlBGQAlBHAABlQAABUgZA9QgTgFgXgCIAAAAIgvgDQghAAgoADIgpAEIgBAAIABAAIApgEQAogDAhAAIAvADIAAAAQAXACATAFIAAAAIACABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAIgBAAIgHgBIAIACIAZAIIAKAFIABAAIAAAAIAAAAIA1AcIABABIgBAAIAAABIAAAAIgBAAgAB9m+IAAgBIAAgBIABAAIABABQAOAjAWgDQAYgDAzgdIABgBIABAAIAAABIABAAIAAAAIgBABIgBACIAEgCQAHgDAQgLIADgCIADgCIAAAAIAXgMIAAAAQALgHAagHIAAAAIACgBQAWgBAXAAIAAAAIABAAQA/AABCAPIAaADIgagDQhCgPg/AAIgBAAIAAAAQgXAAgWABIgCABIAAAAQgNgwAAg5QAAhjAmhGQAmhFA3AAIAFAAQAgAPAZAwQAlBHAABlQAAAvgLBIIgBgCQAAAAAAgBQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAAAABIAAAAQAAABgBAAQAAABAAAAQABABAAAAQAAABAAAAIAAADIAAACIAAAAIAAABIgbgEIgMgDIgFgBIgIgBIgCAAIAAgBQg0gJgyAAIgBAAIAAAAIgiABIgMABQgYAHgMAHIAAAAIgXAMIABAAQgVAOgIAEQgFADgCgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQgyAdgXADIgEAAQgWAAgNgigAG8njQgpgEg7gCIAigBIAAAAIABAAQAyAAA0AJIAAABIACAAIAIABIAFABIg0gFgALmuJIgBAAIgcgDQgwgHgqgRIAAgBQhdglhFhXIABAAQgNgPgLgSIgRgbQgYgogTgvQgMgfANgeQANgfAfgMQAegNAfANQAeANANAfQATAwAZAmIACACIAOATIAAABQApA0A3AXIABAAQAgAOAmADIAAAAQA+AEBKgTQAggIAcARQAdARAIAgQAIAggRAdQgRAcggAIQhPAVhGAAQgTAAgTgCgAxQvAQgfgJgRgcQgRgdAIggQAIggAdgQQAcgRAgAIQA9AQAzgFIAAAAQAggDAbgMIABAAQAdgOAYgYIAAAAQAUgUARgaIABgBQAWghAQgrQANgeAegOQAfgNAeANQAfAMANAeQAOAfgNAeQgWA6geAtIgBACIgBABQgbApggAfIAAABQgtArg0AZIgBAAQgzAXg7AGIgBAAIgBABQgSABgUAAQg8AAhFgRg");
	this.shape_2.setTransform(407.5051,192.4628);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#33CCFF").s().p("AmgD6IgKgEIgFgDIgUgFIgIgDIAHABIABAAQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAIgCgCIAAAAQAZg9AAhUQAAhjglhHQglhHg1AAQg0AAglBHQglBHAABjQAABRAYA9QgPgEgSAEIgQABQgYhRAAhLQAAiGAxhfQAyhfBGAAQBGAAAyBfQAyBfAACGQAAB3gZA4IgBAAgAKQDVIAAgEIAAgBIAAgBQALhIAAgvQAAhjglhHQgZgwgggPIgFgBQg3AAgmBGQgmBGAABiQAAA5ANAvQgaAIgLAHIAAAAIgXALIAAAAQgZgUAAh/QAAiGAyhfQAyhfBGAAIANABIANgBQBGAAAxBfQAyBfAACGQAABcghA/QgNgIgcgJg");
	this.shape_3.setTransform(395.725,123.7375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAyTFIgBAAIgYgGIANgvImdAzIBNkYIAEgQIBZgLIDBgXIAjCFIAWB3IAahfIAAABIArifIAHgZIFgBeIgEANIhaFTgAM2pKIgBgBIgDgBQg2gegxgUIgYgJQAig/AAhbQAAiHgyhgQgyhfhGAAIgNABIgNgBQhGAAgyBfQgxBgAACHQAAB/AYAUIgDACIgGADIgIAEIAAABIALgGQgPAKgHAEIgEABIABgBIAAgBIAAAAIAKgGIgCABQgCAAgGAEIgBAAIgBAAIAAAAQg0AegXADQgXADgNgjIgBgBIgBAAQgNgkAFhMQAEhDAAgTIADgBQABgBAAAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgDgCQAEgoAHgmIABAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBIgDgBQAaiCBAhkQBTiBBxgOIASAbQALARAMAQIAAgBQBEBYBdAlIABAAQAqASAvAHQAOAcAMAfQAiBbAMBuQADAUgBBYQgCBXgMAZIAAAAIgBABQgMAXgQAHQgIAEgJAAQgIAAgJgDgAlwpWIg1gcIABAAIAAAAQAYg5AAh2QAAiHgyhgQgxhfhGAAQhGAAgyBfQgyBgAACHQAABLAZBQIgEAAQgTABgeAHQgYAFgfAJIgGABIgFACIgBAAIAAABQg5ALgJiYIABgBQABAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAgBgBQAAAAAAAAQgBgBAAAAIgDAAIgBgrQAAi5BMiIQA7gGAygXIABgBQA1gYAsgrIAAgBQAhgfAbgqIAAAAIABgCQB0ANBUCDQBHBtARCPQAAAAgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAQAAAAABABQAAAAABAAQAAAAAAAAQABAAAAAAIAEAqIgDABQgBABAAAAQAAABgBAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIAAAAIABAkQAACuhOAjQgNAGgQABIgBAAg");
	this.shape_4.setTransform(396.2584,211.4875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0033").s().p("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");
	this.shape_5.setTransform(419.6675,210.031);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72.3,-1,694.8000000000001,422.1);


(lib.overwelmed_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eybrowesphone("synched",0);
	this.instance.setTransform(107.5,35.15,1.2418,0.7842,0,0,180,10.5,3);

	this.instance_1 = new lib.eybrowesphone("synched",0);
	this.instance_1.setTransform(171.8,54.35,1,1,0,0,0,7.5,8.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#535353").s().p("AgkDZIgTgHQgIgDgJgIIAAgBQgHgHgIgFQgHgEgFgLQgFgKgGgIIAAgBIABgBIAAAAIABAAIAAAAQAHAJAEAKIABACIAKAMIAAAAQAJAFAHAIIAAAAQAIAHAIAEIATAHQAJADAJgCIARgFIATgGQAKgDAIgEIABAAIABABIAAAAIgBABIgIAEIgKAEIgTAGIgRAFIgIABQgGAAgGgDgAApDGIgBAAIAAgBIAAgBQAJgGAGgHIABAAIAOgNIAPgNQAIgHAEgIIAKgRIAAAAQAGgKADgIIAGgVQAAgKACgFIACgKIADgIQADgMgBgLIAAAAIAAgBIgBgJIgBgLIAAAAQgBgKAEgJQADgJABgLIABgBIAAAAIABAAIABABIgCANIgDAIQgDAJAAAJIABAKIAAABIABAKIAAACQABAKgDALIgFASQgBAGgBAKIAAAAIgGAVQgCAIgHAKIAAAAIgKASQgEAIgIAHIgLAJIgFAEIgOANIAAAAQgHAHgIAGIgBAAIAAAAgAhvCWIgBAAQgEgGgFgMIgIgVIAAgBQgCgJgBgLQAAgKgEgJQgEgJACgMIAEgVQACgIgBgJIAAgBIABAAIAAAAIABAAIAAABQABAJgCAJIgCAIIgCAMQgBALADAJIACAEQACAIABAIIAAAGIADAOIAAAAIAIAVQAFALADAGIABABIgBABIAAAAIgBAAIAAAAgAiEAKIgBgBIAAAAIADgUIAEgNIADgHQADgFABgHIAAgGIAAgEQABgJACgHIAAAAIAEgOIACgEIABgBIABgEIAHgOIABgBIABABIABAAIgBABIgGAOIgCAEIgCAFIgFAOIAAgBQgCAIAAAKIAAACIgBAFQAAAIgEAGQgDAIgDALIgDAUIgBABIAAAAgACJghIgBAAIAAgBIABgWIAAgIIgDgKQgDgJgBgKQgBgLgDgKQgDgJgFgJIAAAAQgEgIgCgNIAAgBIAAAAIABAAIABAAIAAABIABAFQACAJADAGIAAAAIAEAHIAFAMQACAJABAKIAAACIADAOIABAEQAEAIAAALIgBAWIgBABIAAAAIgBAAgAhihrIgBgBIAAAAIAAgBIAKgSIABgCIAJgOQAHgJADgKIAAAAIAAgBQADgJAFgIQAFgIAIgIIABAAQAIgIAIgEQAIgEAKgDIAJgCIAKgCIABABIABABIgBAAIgBABQgIAAgKADQgKADgIAEQgHAEgJAIIAAAAQgHAHgGAIQgFAJgDAJIAAAAQgCAKgIAJIgKARIgKARIAAABIAAAAIgBAAgABuibQgGgFgHgKQgGgJgIgHQgHgHgKgFIAAAAIgTgJIAAAAQgHgEgMgCIgSgDIgBgBIAAAAIAAgBIABAAIABgBIASADQALADAIADIAAABIATAIIAAABQALAFAHAHQAHAHAHAJIAKANIADACIAAABIAAABIAAAAIgBAAIAAAAIgBAAg");
	this.shape.setTransform(160.9508,72.1881);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#303030").s().p("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");
	this.shape_1.setTransform(139.0275,108.6826);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("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");
	this.shape_2.setTransform(138.99,130.3102);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("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");
	this.shape_3.setTransform(138.478,101.4401);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0033").s().p("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");
	this.shape_4.setTransform(138.9748,109.1903);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(40));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-1,279,220.7);


(lib.mounten_garbege_phone2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.tears();
	this.instance.setTransform(106.55,88.9,0.1429,0.1243,0,0,180,9.1,45.9);

	this.instance_1 = new lib.tears();
	this.instance_1.setTransform(162.65,81.3,0.3022,0.1889,0,0,180,9.1,45.8);

	this.instance_2 = new lib.tears();
	this.instance_2.setTransform(94.2,75.3,0.4066,0.2653,29.9983,0,0,9.2,45.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4.4,1,1,3,true).p("ASyGJQAHkOkdgxAqyjWQhChehPgtQhHgohQABQhlABhyA/");
	this.shape.setTransform(124.6846,103.4488);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("ASmFbQggAagnATQgJADgIACIhkgaIjqjvIgKgKIgBgBIggC3IgeBbQgqBpg+BOQgvA7g6AsIgCADIAAgBI1HlgQAAABAAAAIgBgBIABAAAU1gDIAAABQABAAAAAAQAAABAAACQgFAogFAhQgCARgDAPIgJAuAT+DuQABgGAFgHQAEgIANgfAT9DuQAAABAAAAQgCADgBADQggA3gwAsAUYCwIADgKAjwqTQgBAGgJACQgJADgLgDQgHgCgGgEQgDgCgCgCQgBgBgBgBQAAgBgBgBQgBgCgBgCQAAgCAAgCQACgGAIgDQAAAAABAAQAJgCALADQALADAHAGQABABABACQACACAAACQABABAAABQAAACgBACgAiypFQgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgADqpOQgBADgBADQgDAEgFACQgBABgBAAQgKAEgMgDQgCgBgCgBQgGgCgFgEQgCgCgCgDQgHgIACgJQACgJALgEQAKgEALADQAMAEAHAJQACABABACQAEAHgCAHgAECn9QgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgA01luIAAAAIAAgBIAAhvQABgHABgCQADgaAHgcQAEgVAGgWQAGgUAIgSQABgDAAgDIACgDIAPgaIALgUIAAgCAtkFLQgIgVgIgUQgYg4gKg/QgRhpAWh6IAMgyIAMgoQgBgBgBAAIgtgPIhBgWIhLgZIiCgwIgHgCQgYgJgSgGIgFgCA01luIAAAEA01luIAAAAA01lpIABABAtkFLQAAAAABAAIALADg");
	this.shape_1.setTransform(133.8595,112.0306);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#303030").ss(1,1,1).p("AzznKQAfgwArgnQAagWAagQQBFgqBNAAQA5hRBLg2QAVgQAYgNQAtgbA0gSQAHgCAFgCQAogOApgKQAFgBAEgBQBAgQBCgJQDZgdEAArQEOAtEyCiQA0AcA1AfQAeARAeATQACACADABQA9AmA/AqQAQALAPAKQELC9A9DYQAZAWAUAeQAKAOAKAPQA1BbACBrALiA6QgagjgdghQgjgqgnglQh3h1iUhOAPqJOQgKgIgKgKQhehehfhjQgBgBgBAAQgMgOgLgNQgFgFgFgGQAAAAAAABQgBAKgBAJQgJBVgWBOAL2FUQg9hMACg/QABhPAihAAK3JmQgHAUgJAUQggBMg4BDQgIAKgIAJQgnArgyApQgBAAgBACAU2DYQAAAAAAABQAAACAAABQAAATgEAXQgFAWgFAiQAAADgBAEASqIzQgCACgCABQgBABgBABQgjAfgiAMAUYGLQgBAFgCAFQgHATgJATQgEAHgDAHIgBAAAUbGBQABgHACgHAhcmPQAlANArAMQAEABADABIAaAHQAlAKAlAJABql5Qg2gQg3gLQgugKgrgGAy8goQAAAAgBAAAy2gmQgBgBgCAAQgBAAgCgBA01iTQAAAAAAAAA00iNQAAAEABAEQAIA1APAFQACABAFACIAkANQABAAABABIADABQAiAMAOAFAzng3QgEgCgEgBAqylMQACgEADgDQABgBAAAAAqqlWQgCABgBABQgDADgDACQABABAAACQAPBKABAqQABAZgCAlQgCAZgDAfQgJBKg0AvQg0AvgtAGQgTACgggGAqzlRQAAABAAABAuFBwQAEgUAGgVQgUgEgagIAt0H9QgXg9gLg6QgBgFgBgFQgPhYANhPQAEgaAFgZAtkImIAAAAAlgmpQiwAMiWBE");
	this.shape_2.setTransform(133.8525,90.141);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#663300").s().p("AOMKpIACgCIgCADgAuNlrIAAgBIAAgEIAAAAIAAAAIAAAAIAAAAIABAGgAtop2IACgDIgBADIANgYIgIAQIgHAOIABgGgAtjqJQAHgSAQgOIAAACIABAAIgMAUIALgUIgLAUIgPAaIgCADQABgLAEgIg");
	this.shape_3.setTransform(91.475,112.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("ANVKGIAQgTQgvA7g5AsQAxgpAngrgAECGMQhEgFg6gzQg6gziBAdQiCAcgbhPQgbhPBEgkQBDglBjgYIg5BkIChAWIgJAQIAJAFIAAAAIB1BCIBBh6QAgAvAUA2QAVA2gOAiQgNAeg1AAIgQgBgAQLCqIABABIgCATQgJBVgWBOgABrBoIgHgDQAVAEAVAHIAOAEIggA3IAAAAIgTAhgAHNlTIgEgCIgEAAQgmgPgTgrQgWgwARg4QARg4AqgbQAqgbAXAEQAXADgOgDIABAAIAgAJQARAGAOAhQAVAxgPA6QgKAkgTAaIAAADIgCAAQgMAPgPALQgfAYggAAIgMAAgAHQn3QgQAFgDAOQgDANALAMIAGAHQAIAGAJADIAGACQATAFAQgGIADgBQAIgDAFgGQACgEABgEQADgLgGgKIgEgFQgLgNgTgFQgJgDgIAAQgJAAgJAEgAHTo6QgKAEgCAJQgCAJAHAIIAEAFQAFAEAGACIADACQAMADAKgEIACgBQAFgCADgEIACgGQACgHgEgHIgCgDQgHgJgMgEIgKgBQgGAAgGACgAAam2QghgJgSgjIgBgBIgFgJQgFgIgEgLQgSguAPg5QAPg5AlghQAnggAoAKQAjAJAgA/QASAvgOA5QgFAQgGAOQgJAVgNARQgJAMgMAKQgdAYgeAAQgKAAgKgCgAAbo/QgQAFgDAOQgDANALAMIAGAHQAHAGAKADIAGACQATAFAQgGIADgBQAIgDAFgGQACgEABgEQADgLgGgKIgEgFQgLgNgTgFQgJgDgIAAQgJAAgJAEgAgEp5IgBAAQgHADgCAGIAAAEIABAEIABACIADACIAEAEQAFAEAIACQALADAJgDQAIgCACgGIAAgEIAAgCIgDgEIgCgDQgHgGgLgDIgLgCIgIABgAv6o9QgIASgHAUQgIgGAXggg");
	this.shape_4.setTransform(106.0353,107.1468);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiuHUIAAAAIgJgFIAJgQIiigWIA5hkIAlABQAWABAYAFIAXADIAHADIgCBkIATghIAAAAIAgg3IB8A+IhAB6gACwhgQgzgNgYgrQgZgrAUhMIADgKIABgBIAKgfQAXg8AmghQAlggA0AQQA0AQAXA7QAXA6gQBFIgCAMQgUBMgvAZQgeAPggAAQgRAAgSgEgACwlgQgqAbgRA4QgRA4AWAwQATArAmAPIAEAAIAEACQAnAFAkgdQAPgLAMgPIACAAIAAgDQAUgaAJgkQAPg6gVgxQgOghgRgGIgggJIgBAAQAOAEgXgEIgFAAQgWAAgmAXgAkJioQgygNgWhAQgSg3AMhCIAFgSQAThNAygtIADgCQAPgNAPgIQA+gNAkAgQAlAgAGAaQAGAaABBGQgBAKACAKIgBABQgFAHgCAHQgLAogTAgIAAABQgRAbgXAVQgmAjgnAAQgLAAgMgDgAkInWQgmAhgPA5QgPA5ASAuQAEALAFAIIAFAJIABABQASAjAiAJQApAKAmggQAMgKAJgMQANgRAJgVQAHgOAEgQQAOg5gSgvQggg/gjgJQgJgCgKAAQgfAAgdAYgADQjPIgGgCQgJgDgIgGIgGgHQgLgMADgNQADgOAQgFQAQgGATAFQATAFALANIAEAFQAGAKgDALQgBAEgCAEQgFAGgIADIgDABQgIAEgKAAQgIAAgJgDgAjkkXIgGgCQgJgDgIgGIgGgHQgLgMADgNQADgOAQgFQAQgGATAFQATAFALANIAEAFQAGAKgDALQgBAEgCAEQgEAGgJADIgDABQgIAEgKAAQgIAAgJgDgADMklIgDgCQgGgCgFgEIgEgFQgHgIACgJQACgJAKgEQAKgEAMADQAMAEAHAJIACADQAEAHgCAHIgCAGQgDAEgFACIgCABQgFACgHAAIgKgBgAkJlwQgIgCgGgEIgEgEIgCgCIgBgCIgCgEIAAgEQACgGAHgDIABAAQAJgCALADQALADAHAGIADADIACAEIAAACIAAAEQgCAGgIACIgJABQgFAAgGgBg");
	this.shape_5.setTransform(133.41,83.7271);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0033").s().p("AthImIALADIgLgDIgRgpQgXg9gLg6QgHgtAAgxQAAhAANhGIALgyIALgpIABABIgMAoIAMgoIgBgBIgugPIAuAPQgVgEgagIIABgDIABgFIhCgRIhLgZIiCgvIgCgBIgDgBIADABIACABIgHgCIACAAIgxgRIgDgBIgCgBIgkgNIgHgDQgPgFgIg1IgBgIIAAgGIgBAAIAAgBIAAhvIACgJQAEgaAGgcQAEgVAGgWQAHgUAIgSIAHgOIAHgQIADgFIANgUQAegwAsgnQAZgWAagQQBFgqBNAAQA5hRBLg2QAWgQAXgNQAugbA0gSIAMgEQAogOApgKIAJgCQA/gQBDgJQDZgdD/ArQEOAtEzCiQA0AcA1AfIA8AkIAEADQA+AmA/AqIAfAVQELC9A9DYQAYAWAVAeIAUAdQA0BbADBrIAAABIAAAAIAAABIAAADQABATgFAXIgJA4IgCAHIAFggIAKhJIgKBJIgFAgIgIAuIgEAOIgCAKIgDAKQgNAfgFAIQgEAHgCAGIAAAAIgBABIgCAGQggA3gwAsIgFADQggAagnATIgRAFIhjgaIjqjvIgLgLIAAAAQg7hKAAg+IAAgDQAChPAhhAQghBAgCBPIAAADQAAA+A7BKIAAAAIAAAAIAAABIgBgBIggC3IgdBbQgrBpg+BOQA+hOArhpIgQAoQghBMg4BDIgQATQgnArgxApIgCACgAiPH+QA6AzBEAFQBCAFAPgiQAOgigVg2QgUg2gggvIh8g+IgOgEQgVgHgVgEIgXgDQgYgFgWgBIglgBQhjAYhDAlQhEAkAbBPQAbBPCCgcQAvgLAlAAQBDAAAlAhgARYIOIAAgPQAAkAkVgwQEVAwAAEAIAAAPgAtPBMIALAAQAtgGA0gvQA1gvAIhKIAFg4QACgbAAgUIAAgPQgCgqgPhKIAFgHIABgBIgBAAIADgCIgDACIgGADIABACIAAADQAPBKACAqIAAAPQAAAUgCAbIgFA4QgIBKg1AvQg0AvgtAGIgLAAIAAAAIgBAAQgQAAgXgEQAXAEAQAAIABAAIAAAAgAJkhZQAmAlAkAqQAcAhAbAjQgbgjgcghQgkgqgmglQh4h1iThOQCTBOB4B1gAucjcQBOAtBDBeQhDhehOgtIgCgBIgDgCIgBAAQhDgkhKAAIgBAAIAAAAIgCAAIgCAAQhkABhyA/QByg/BkgBIACAAIACAAIAAAAIABAAQBKAABDAkIABAAIADACIACABgAgJl2IAHACIAaAHIBJAUIgDAKQgUBMAZArQAYArAzANQAyANAvgYQAvgZAUhMIACgMQAQhFgXg6QgXg7g0gQQg0gQglAgQgmAhgXA8Qg1gQg4gLQgtgKgsgGQgBhGgGgaQgGgaglggQgkggg+ANQgPAIgPANIgDACQgyAtgTBNIgFASQgMBCASA3QAWBAAyANQAzANAxgtQAXgVARgbIAAgBQATggALgoQACgHAFgHIABgBQAmANAqANgAqklZQCWhECwgMQiwAMiWBEgAgJl2IAHACIgHgCQgrgMgmgNQAmANArAMgASoI2IgCACQgjAfgiAMQAngTAggagAPZI8QhehehghjIgBgBIgXgbIDqDvQgKgIgKgKgASoI2IAAAAgAuUGGQALA6AXA9QgYg4gKg/gAuWF8QgPhYANhPQAEgaAGgZQgNBGAABAQAAAxAHAtIgCgKgAMDFfIgLgKIAAgBIAAAAIALALgAL4FUIAAAAIAAAAgAL4FUIAAAAgAv+AcIg0gTIBLAZgAy7goIgqgPIgFgCIAFACIgIgDIADABIAxARIgCAAgAy7goIAAAAgA0ziYIgCgQQgCgXAAgSIAAgMIADgqIAEgUIAAgCIAHgmQAEgTAGgRIACgGQgGAWgEAVQgGAcgEAaIgCAJIAABvIAAgEgAqrlUIAAAAg");
	this.shape_6.setTransform(133.6275,90.141);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(255,255,255,0.467)").ss(1,1,1).p("AgghgQBZgvAPA4IEyAAIkYAyQBfAThpAVQgBgFgBgFAgghgQgHgEgHgDQgBAAgBAAQh5g1gtBMQksAtD+AuQgzCLEPgqQAVgDAUgEAgxhXQACgBABgBQABAAAAAAQAHgEAGgDAgThbQgHgDgGgCAgoBsQA/AbAhgOQAvgTgPhjAjWhQQgFAIgEAKAhqBLQAjAUAfAN");
	this.shape_7.setTransform(46.0273,134.2067);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("ASmFbQggAagnATQgJADgIACIhkgaIjqjvIgKgKIgBgBIggC3IgeBbQgqBpg+BOQgvA7g6AsIgCADIAAgBI0ZlUAU1gDIAAABQABAAAAAAQAAABAAACQgFAogFAhQgCARgDAPIgJAuAT+DuQABgGAFgHQAEgIANgfAT9DuQAAABAAAAQgCADgBADQggA3gwAsAUYCwIADgKAjwqTQgBAGgJACQgJADgLgDQgHgCgGgEQgDgCgCgCQgBgBgBgBQAAgBgBgBQgBgCgBgCQAAgCAAgCQACgGAIgDQAAAAABAAQAJgCALADQALADAHAGQABABABACQACACAAACQABABAAABQAAACgBACgAiypFQgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgADqpOQgBADgBADQgDAEgFACQgBABgBAAQgKAEgMgDQgCgBgCgBQgGgCgFgEQgCgCgCgDQgHgIACgJQACgJALgEQAKgEALADQAMAEAHAJQACABABACQAEAHgCAHgAECn9QgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgA01luIAAAAIAAgBIAAhvQABgHABgCQADgaAHgcQAEgVAGgWQAGgUAIgSQABgDAAgDIACgDIAPgaIALgUIAAgCAucB2QgGhSARhcIAMgyIAMgoQgBgBgBAAIgtgPIhBgWIhLgZIiCgwIgHgCQgYgJgSgGIgFgCA01luIAAAAA01luIAAAEA01lpIABABAgiC3QgGAkgmAWQgFADgGADQguAXg6gGQgDAAgDgBQgQgCgOgEQgpgKgdgaQgWgUgHgWQAAgBAAAAQgDgKAAgLQAAgBAAgBQABgEAAgFQABgBAAgBQAIgnAugWQAugWA6AFQADABADAAQAVADASAFQAkALAZAWQAmAigHApg");
	this.shape_8.setTransform(133.8595,112.0306);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#303030").ss(1,1,1).p("AzznKQAfgwArgnQAagWAagQQBFgqBNAAQA5hRBLg2QAVgQAYgNQAtgbA0gSQAHgCAFgCQAogOApgKQAFgBAEgBQBAgQBCgJQDZgdEAArQEOAtEyCiQA0AcA1AfQAeARAeATQACACADABQA9AmA/AqQAQALAPAKQELC9A9DYQAZAWAUAeQAKAOAKAPQA1BbACBrALiA6QgagjgdghQgjgqgnglQh3h1iUhOAPqJOQgKgIgKgKQhehehfhjQgBgBgBAAQgMgOgLgNQgFgFgFgGQAAAAAAABQgBAKgBAJQgJBVgWBOAL2FUQg9hMACg/QABhPAihAAK3JmQgHAUgJAUQggBMg4BDQgIAKgIAJQgnArgyApQgBAAgBACAU2DYQAAAAAAABQAAACAAABQAAATgEAXQgFAWgFAiQAAADgBAEASqIzQgCACgCABQgBABgBABQgjAfgiAMAUYGLQgBAFgCAFQgHATgJATQgEAHgDAHIgBAAAUbGBQABgHACgHAhcmPQAlANArAMQAEABADABIAaAHQAlAKAlAJABql5Qg2gQg3gLQgugKgrgGAy2gmQgBgBgCAAQgBAAgCgBQAAAAgBAAA01iTQAAAAAAAAA00iNQAAAEABAEQAIA1APAFQACABAFACIAkANQABAAABABAzng3QgEgCgEgBIADABQAiAMAOAFAqzlPQABABAAACQACgEADgDQABgBAAAAAqqlWQgCABgBABQgDADgDACAqzlRQAAABAAABAqylMQAPBKABAqQABAZgCAlQgCAZgDAfQgJBKg0AvQg0AvgtAGQgTACgggGAueFQQgGhAAKg7QAEgaAFgZAuFBwQAEgUAGgVAlgmpQiwAMiWBE");
	this.shape_9.setTransform(133.8525,90.141);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.369)").s().p("AgoBsIApgHIgpAHQgfgNgjgUQAjAUAfANQkPAqAziLQj+guEsgtIgJASIAJgSQAthMB5A1IACAAIAOAHQBZgvAPA4IEyAAIkYAyQBfAThpAVIgCgKIACAKQAPBjgvATQgLAFgOAAQgdAAgqgSgAgthZIgBAAIgDACIADgCIABAAIANgHIANAFIgNgFIgNAHgAjWhQIAAAAg");
	this.shape_10.setTransform(46.0273,134.2067);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#663300").s().p("AOMKpIACgCIgCADgAuNlrIAAgBIAAgEIAAAAIABAGgAuNlwgAuNlwIAAAAIAAAAgAtop2QABgLAEgIQAHgSAQgOIAAACIgLAUIgPAaIgCADIACgDIgBADIANgYIgIAQIgHAOIABgGgAtMqnIABAAIgMAUg");
	this.shape_11.setTransform(91.475,112.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("ANVKGIAQgTQgvA7g5AsQAxgpAngrgAQLCqIABABIgCATQgJBVgWBOgABUE5QgRgGgTgBQgpgKgbgaQgXgUgGgWIgBgBQgDgKABgLIAAgCIABgJIAAgCICXAUIgJAQIAJAFIAAAAIBkA4IgMAGQgkASgsAAIgYgBgABqBzIAGABQAVADASAFIgbAvIAAAAIgTAhgAHNlTIgEgCIgEAAQgmgPgTgrQgWgwARg4QARg4AqgbQAqgbAXAEQAXADgOgDIABAAIAgAJQARAGAOAhQAVAxgPA6QgKAkgTAaIAAADIgCAAQgMAPgPALQgfAYggAAIgMAAgAHQn3QgQAFgDAOQgDANALAMIAGAHQAIAGAJADIAGACQATAFAQgGIADgBQAIgDAFgGQACgEABgEQADgLgGgKIgEgFQgLgNgTgFQgJgDgIAAQgJAAgJAEgAHTo6QgKAEgCAJQgCAJAHAIIAEAFQAFAEAGACIADACQAMADAKgEIACgBQAFgCADgEIACgGQACgHgEgHIgCgDQgHgJgMgEIgKgBQgGAAgGACgAAam2QghgJgSgjIgBgBIgFgJQgFgIgEgLQgSguAPg5QAPg5AlghQAnggAoAKQAjAJAgA/QASAvgOA5QgFAQgGAOQgJAVgNARQgJAMgMAKQgdAYgeAAQgKAAgKgCgAAbo/QgQAFgDAOQgDANALAMIAGAHQAHAGAKADIAGACQATAFAQgGIADgBQAIgDAFgGQACgEABgEQADgLgGgKIgEgFQgLgNgTgFQgJgDgIAAQgJAAgJAEgAgEp5IgBAAQgHADgCAGIAAAEIABAEIABACIADACIAEAEQAFAEAIACQALADAJgDQAIgCACgGIAAgEIAAgCIgDgEIgCgDQgHgGgLgDIgLgCIgIABgAv6o9QgIASgHAUQgIgGAXggg");
	this.shape_12.setTransform(106.0353,107.1468);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AitHZIAAAAIgJgFIAJgQIiYgUQAIgnAvgWQAugWA6AFIgCBZIATghIAAAAIAcgvQAjALAZAWQAnAigHApQgGAkgmAWgACwhbQgzgNgYgrQgZgrAUhMIADgKIABgBIAKgfQAXg8AmghQAlggA0AQQA0AQAXA7QAXA6gQBFIgCAMQgUBMgvAZQgeAPggAAQgRAAgSgEgACwlbQgqAbgRA4QgRA4AWAwQATArAmAPIAEAAIAEACQAnAFAkgdQAPgLAMgPIACAAIAAgDQAUgaAJgkQAPg6gVgxQgOghgRgGIgggJIgBAAQAOADgXgDIgFgBQgWAAgmAYgAkJijIgBgBIAAAAQgBAAAAAAQAAgBgBAAQgBAAAAAAQgBAAAAAAQgugPgVg8QgSg3AMhCIAFgSQAThNAygtIADgCQAPgNAPgIQA+gNAkAgQAlAgAGAaQAGAaABBGQgBAKACAKIgBABQgFAHgCAHQgLAogTAgIAAABQgRAbgXAVQgmAjgnAAQgLAAgMgDgAkInRQgmAhgPA5QgPA5ASAuQAEALAFAIIAFAJIABABQASAjAiAJQApAKAmggQAMgKAJgMQANgRAJgVQAHgOAEgQQAOg5gSgvQggg/gjgJQgJgCgKAAQgfAAgdAYgADQjKIgGgCQgJgDgIgGIgGgHQgLgMADgNQADgOAQgFQAQgGATAFQATAFALANIAEAFQAGAKgDALQgBAEgCAEQgFAGgIADIgDABQgIADgKAAQgIAAgJgCgAjkkSIgGgCQgJgDgIgGIgGgHQgLgMADgNQADgOAQgFQAQgGATAFQATAFALANIAEAFQAGAKgDALQgBAEgCAEQgEAGgJADIgDABQgIADgKAAQgIAAgJgCgADMkgIgDgCQgGgCgFgEIgEgFQgHgIACgJQACgJAKgEQAKgEAMADQAMAEAHAJIACADQAEAHgCAHIgCAGQgDAEgFACIgCABQgFACgHAAIgKgBgAkJlrQgIgCgGgEIgEgEIgCgCIgBgCIgCgEIAAgEQACgGAHgDIABAAQAJgCALADQALADAHAGIADADIACAEIAAACIAAAEQgCAGgIACIgJABQgFAAgGgBg");
	this.shape_13.setTransform(133.41,83.2396);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF0033").s().p("AszIyQAvgTgPhjQBpgWhfgTIEYgyIkyAAQgPg4haAvIgOgHIgBgpQAAhAANhGIALgyIAMgoIgBgBIgugPIAuAPQgVgEgagIIABgDIABgFIhCgRIhLgZIiCgvIgCgBIgDgBIADABIACABIgHgCIACAAIgxgRIgDgBIgCgBIgkgNIgHgDQgPgFgIg1IgBgIIAAgGIgBAAIAAgBIAAhvIACgJQAEgaAGgcQAEgVAGgWQAHgUAIgSIAHgOIAHgQIADgFIANgUQAegwAsgnQAZgWAagQQBFgqBNAAQA5hRBLg2QAWgQAXgNQAugbA0gSIAMgEQAogOApgKIAJgCQA/gQBDgJQDZgdD/ArQEOAtEzCiQA0AcA1AfIA8AkIAEADQA+AmA/AqIAfAVQELC9A9DYQAYAWAVAeIAUAdQA0BbADBrIAAABIAAAAIAAABIAAADQABATgFAXIgJA4IgCAHIAFggIAKhJIgKBJIgFAgIgIAuIgEAOIgCAKIgDAKQgNAfgFAIQgEAHgCAGIAAAAIgBABIgCAGQggA3gwAsIgFADQggAagnATIgRAFIhjgaIjqjvIgLgLIAAAAIAAAAIAAAAIAAABIAAgBIAAAAIALALIgLgKIgBgBIggC3IgdBbQgrBpg+BOQA+hOArhpIgQAoQghBMg4BDIgQATQgnArgxApIgCACgARYIOIAAgPQAAkAkVgwQEVAwAAEAIAAAPgAjjHcQATABARAGIAEABIAKAEIAFgCIAHABIABAAIACAAIADABIAEgDIABAAQAFgCAEACQADgBACABIABAAQACgCAFAAIAFABIADgBIARgDIAAgBIABgBIADgEQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIAAgBIAEAAIACgBIACgCIABABIAGgBIAAgBIADgCIAEgBIABAAIAAAAIABgBIACgCQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAIAAgBIAFgBQAAgCADgCIAEgCIABAAIABAAIADgDIABgBIAAgBIABgBIABgDIADgDIACAAIADgBIADgEIAAgBIAAAAQAAgHAHgDIACAAIABgBIgBgBIABgCIgBgBIABgCIAAAAIgBgBQAAAAABgBQAAAAAAgBQAAAAAAAAQgBgBAAAAIABgBQABgDADgCIAAgCIABgEIABAAIAAgBIAAAAIAAgCIABAAIgCgCIABgCQgBgBAAgBQAAgBABAAQAAgBAAAAQAAgBABAAIAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAABAAQAAgBABAAIAAgBIgBgCIgBgCIABgBIgBgBIABgDIAAAAIAAAAIABgFIgCgBQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIAAAAIgBgBIgDgEIgBgEIgDgDIAAgBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAABgBIgBgDIgCgCIAAgBIgCgCIABgBIgBgCIgDgDIgEgCIgBgCIgDgBIgCgDQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAgBAAAAIgBgBIAAgBIgCAAIgEgDIgCgCIgCgCIAAAAIgFAAIgEgCIgCgCIgBgDIAAAAIAAgBIAAAAIgRgIIgHgDIgHgEIgCgBIAAAAIgBABIgEAAIgEgBIgIgBIgEgCIgJgCIgIgDIAAgBIgBAAIgCABIgCgBIgBAAIgLgCIgBAAIgDABIgDAAIgSgCIgIAAIgBABIgBAAIgJABIgHAAIgKADIgHABIgIABQgCAAgFADQgFACgEABIgCAAIgBAAIgDADIgBgBIgDACIgBABIgGAFIgEADIgGADIgEACIgDACIAAABIgCABQgBAAAAAAQAAABgBAAQAAAAAAAAQgBABAAAAIgDABIgBABIgDABIAAACIAAAAIgBAAIAAACIgCADIAAABIgEAEIgBAAIAAABIgBAAIgEADIgBACIAAAAIgBADIgBAAIgBADIgCABIAAAAIABACIAAACIABADIgDAFIgBACIgBAAIgDAFIAAACIABABIADADQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIABADIAAACIgCACQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABIgBAAIADADIgBABIABACIgBADQAEABACAFIABABIgBAAIABABQAAADgCACIACACQABAAAAABQAAAAAAAAQAAAAAAAAQAAABgBAAIABACIAAACIACABIAAABIAAAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIAAAAIAAABIACABIACAEIgBAAIABACIABACIABABIADAAIADADQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABIABAAIADABIAFAEIAAABIABABIAAAAQADABADAEQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAIAAACIAAAAIABABIAAgBIAFACQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAABIACABIAAAAIADABQAFABADADIABACQAEAAAEACIABACIABAAIABABIAAABIABAAIACABQACAAADACIABABIADABIACACIAFAAIADAAIAJAAgAjEHiIAFABIgFgBQgQgCgPgEQAPAEAQACgAL4FUQg7hKAAg+IAAgDQAChPAhhAQghBAgCBPIAAADQAAA+A7BKgAtPBMIALAAQAtgGA0gvQA1gvAIhKIAFg4QACgbAAgUIAAgPQgCgqgPhKIAFgHIABgBIgBAAIADgCIgDACIgGADIABACIAAADQAPBKACAqIAAAPQAAAUgCAbIgFA4QgIBKg1AvQg0AvgtAGIgLAAIAAAAIgBAAQgQAAgXgEQAXAEAQAAIABAAIAAAAgAJkhZQAmAlAkAqQAcAhAbAjQgbgjgcghQgkgqgmglQh4h1iThOQCTBOB4B1gAucjcQBOAtBDBeQhDhehOgtIgCgBIgDgCIgBAAQhDgkhKAAIgBAAIAAAAIgCAAIgCAAQhkABhyA/QByg/BkgBIACAAIACAAIAAAAIABAAQBKAABDAkIABAAIADACIACABgAgJl2IAHACIAaAHIBJAUIgDAKQgUBMAZArQAYArAzANQAyANAvgYQAvgZAUhMIACgMQAQhFgXg6QgXg7g0gQQg0gQglAgQgmAhgXA8Qg1gQg4gLQgtgKgsgGQgBhGgGgaQgGgaglggQgkggg+ANQgPAIgPANIgDACQgyAtgTBNIgFASQgMBCASA3QAVA8AtAPQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAIAAAAIABABQAzANAxgtQAXgVARgbIAAgBQATggALgoQACgHAFgHIABgBQAmANAqANIAHACIgHgCQgrgMgmgNQAmANArAMgAqklZQCWhECwgMQiwAMiWBEgASoI2IgCACQgjAfgiAMQAngTAggagAPZI8QhehehghjIgBgBIgXgbIDqDvQgKgIgKgKgASoI2IAAAAgAL4FUIAAAAgAL4FUIAAAAIAAAAgAucFQQgGhAAKg7QAEgaAGgZQgNBGAABAIABApIgCgBgAUpFFIAAAAgAt4BHIABABIgMAoIALgpgAv+AcIg0gTIBLAZgAy7goIgqgPIgFgCIAxARIgCAAgAy7goIAAAAgAztg6IADABIAFACIgIgDgAztg6gA0ziYIgCgQQgCgXAAgSIAAgMIADgqIAEgUIAAgCIAHgmQAEgTAGgRIACgGQgGAWgEAVQgGAcgEAaIgCAJIAABvIAAgEgAqrlUIAAAAg");
	this.shape_14.setTransform(133.6275,90.141);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,1,1).p("ASmFbQggAagnATQgJADgIACIhkgaIjqjvIgKgKIgBgBIggC3IgeBbQgqBpg+BOQgvA7g6AsIgCADIAAgBI1HlgIALADIgMgDQAAAAABAAQAAABAAAAIgBgBIABAAAU1gDIAAABQABAAAAAAQAAABAAACQgFAogFAhQgCARgDAPIgJAuAT+DuQABgGAFgHQAEgIANgfAT9DuQAAABAAAAQgCADgBADQggA3gwAsAUYCwIADgKAjwqTQgBAGgJACQgJADgLgDQgHgCgGgEQgDgCgCgCQgBgBgBgBQAAgBgBgBQgBgCgBgCQAAgCAAgCQACgGAIgDQAAAAABAAQAJgCALADQALADAHAGQABABABACQACACAAACQABABAAABQAAACgBACgAiypFQgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgADqpOQgBADgBADQgDAEgFACQgBABgBAAQgKAEgMgDQgCgBgCgBQgGgCgFgEQgCgCgCgDQgHgIACgJQACgJALgEQAKgEALADQAMAEAHAJQACABABACQAEAHgCAHgAECn9QgBAEgDAEQgEAGgIADQgCABgBAAQgQAGgTgFQgDgBgDgBQgKgDgHgGQgEgDgDgEQgLgMADgNQAEgOAQgFQAQgGASAFQATAFALANQADACABADQAHAKgDALgA01luIAAAAIAAgBIAAhvQABgHABgCQADgaAHgcQAEgVAGgWQAGgUAIgSQABgDAAgDIACgDIAPgaIALgUIAAgCAtkFLQgIgVgIgUQgYg4gKg/QgRhpAWh6IAMgyIAMgoQgBgBgBAAIgtgPIhBgWIhLgZIiCgwIgHgCQgYgJgSgGIgFgCA01luIAAAAA01luIAAAEA01lpIABAB");
	this.shape_15.setTransform(133.8595,112.0306);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#303030").ss(1,1,1).p("AzznKQAfgwArgnQAagWAagQQBFgqBNAAQA5hRBLg2QAVgQAYgNQAtgbA0gSQAHgCAFgCQAogOApgKQAFgBAEgBQBAgQBCgJQDZgdEAArQEOAtEyCiQA0AcA1AfQAeARAeATQACACADABQA9AmA/AqQAQALAPAKQELC9A9DYQAZAWAUAeQAKAOAKAPQA1BbACBrALiA6QgagjgdghQgjgqgnglQh3h1iUhOAPqJOQgKgIgKgKQhehehfhjQgBgBgBAAQgMgOgLgNQgFgFgFgGQAAAAAAABQgBAKgBAJQgJBVgWBOAL2FUQg9hMACg/QABhPAihAAK3JmQgHAUgJAUQggBMg4BDQgIAKgIAJQgnArgyApQgBAAgBACAU2DYQAAAAAAABQAAACAAABQAAATgEAXQgFAWgFAiQAAADgBAEAUYGLQgBAFgCAFQgHATgJATQgEAHgDAHIgBAAASqIzQgCACgCABQgBABgBABQgjAfgiAMAUbGBQABgHACgHAhcmPQAlANArAMQAEABADABIAaAHQAlAKAlAJABql5Qg2gQg3gLQgugKgrgGAy2gmQgBgBgCAAQgBAAgCgBQAAAAgBAAA01iTQAAAAAAAAA00iNQAAAEABAEQAIA1APAFQACABAFACIAkANQABAAABABIADABQAiAMAOAFAzng3QgEgCgEgBAqylMQACgEADgDQABgBAAAAAqqlWQgCABgBABQgDADgDACQABABAAACQAPBKABAqQABAZgCAlQgCAZgDAfQgJBKg0AvQg0AvgtAGQgTACgggGAqzlRQAAABAAABAuFBwQAEgUAGgVQgUgEgagIAt0H9QgXg9gLg6QgBgFgBgFQgPhYANhPQAEgaAFgZAtkImIAAAAAlgmpQiwAMiWBE");
	this.shape_16.setTransform(133.8525,90.141);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#663300").s().p("AOMKpIACgCIgCADgAuNlrIAAgBIAAgEIAAAAIABAGgAuNlwgAuNlwIAAAAIAAAAgAtop2IACgDIgBADIANgYIgIAQIgHAOIABgGgAtjqJQAHgSAQgOIAAACIgLAUIgPAaIgCADQABgLAEgIgAtMqnIABAAIgMAUg");
	this.shape_17.setTransform(91.475,112.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF0033").s().p("AthImIALADIgLgDIgRgpQgXg9gLg6QgHgtAAgxQAAhAANhGIALgyIALgpIABABIgMAoIAMgoIgBgBIgugPIAuAPQgVgEgagIIABgDIABgFIhCgRIhLgZIiCgvIgCgBIgDgBIgCAAIgqgPIgFgCIAFACIgIgDIADABIAxARIgxgRIgDgBIgCgBIgkgNIgHgDQgPgFgIg1IgBgIIAAgGIgBAAIAAgBIAAhvIACgJQAEgaAGgcQAEgVAGgWQAHgUAIgSIAHgOIAHgQIADgFIANgUQAegwAsgnQAZgWAagQQBFgqBNAAQA5hRBLg2QAWgQAXgNQAugbA0gSIAMgEQAogOApgKIAJgCQA/gQBDgJQDZgdD/ArQEOAtEzCiQA0AcA1AfIA8AkIAEADQA+AmA/AqIAfAVQELC9A9DYQAYAWAVAeIAUAdQA0BbADBrIAAABIAAAAIAAABIAAADQABATgFAXIgJA4IgCAHIAFggIAKhJIgKBJIgFAgIgIAuIgEAOIgCAKIgDAKQgNAfgFAIQgEAHgCAGIAAAAIgBABIgCAGQggA3gwAsIgFADQggAagnATIgRAFIhjgaIjqjvIgLgLIAAAAIAAAAIAAAAIAAABIAAgBIAAAAIALALIgLgKIgBgBIggC3IgdBbQgrBpg+BOQA+hOArhpIgQAoQghBMg4BDIgQATQgnArgxApIgCACgAiPH+QA6AzBEAFQBCAFAPgiQAOgigVg2QgUg2gggvIh8g+IgOgEQgVgHgVgEIgXgDQgYgFgWgBIglgBQhjAYhDAlQhEAkAbBPQAbBPCCgcQAvgLAlAAQBDAAAlAhgARYIOIAAgPQAAkAkVgwQEVAwAAEAIAAAPgAL4FUQg7hKAAg+IAAgDQAChPAhhAQghBAgCBPIAAADQAAA+A7BKgAtPBMIALAAQAtgGA0gvQA1gvAIhKIAFg4QACgbAAgUIAAgPQgCgqgPhKIAFgHIABgBIgBAAIADgCIgDACIgGADIABACIAAADQAPBKACAqIAAAPQAAAUgCAbIgFA4QgIBKg1AvQg0AvgtAGIgLAAIAAAAIgBAAQgQAAgXgEQAXAEAQAAIABAAIAAAAgAJkhZQAmAlAkAqQAcAhAbAjQgbgjgcghQgkgqgmglQh4h1iThOQCTBOB4B1gAucjcQBOAtBDBeQhDhehOgtIgCgBIgDgCIgBAAQhDgkhKAAIgBAAIAAAAIgCAAIgCAAQhkABhyA/QByg/BkgBIACAAIACAAIAAAAIABAAQBKAABDAkIABAAIADACIACABgAgJl2IAHACIAaAHIBJAUIgDAKQgUBMAZArQAYArAzANQAyANAvgYQAvgZAUhMIACgMQAQhFgXg6QgXg7g0gQQg0gQglAgQgmAhgXA8Qg1gQg4gLQgtgKgsgGQgBhGgGgaQgGgaglggQgkggg+ANQgPAIgPANIgDACQgyAtgTBNIgFASQgMBCASA3QAWBAAyANQAzANAxgtQAXgVARgbIAAgBQATggALgoQACgHAFgHIABgBQAmANAqANgAqklZQCWhECwgMQiwAMiWBEgAgJl2IAHACIgHgCQgrgMgmgNQAmANArAMgASoI2IgCACQgjAfgiAMQAngTAggagAPZI8QhehehghjIgBgBIgXgbIDqDvQgKgIgKgKgASoI2IAAAAgAuUGGQALA6AXA9QgYg4gKg/gAuWF8QgPhYANhPQAEgaAGgZQgNBGAABAQAAAxAHAtIgCgKgAL4FUIAAAAgAL4FUIAAAAIAAAAgAv+AcIg0gTIBLAZgAy7goIACAAIADABIACABgAy7goIAAAAgA0ziYIgCgQQgCgXAAgSIAAgMIADgqIAEgUIAAgCIAHgmQAEgTAGgRIACgGQgGAWgEAVQgGAcgEAaIgCAJIAABvIAAgEgAqrlUIAAAAg");
	this.shape_18.setTransform(133.6275,90.141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_2,p:{regX:9.2,regY:45.6,scaleX:0.4066,scaleY:0.2653,rotation:29.9983,skewY:0,x:94.2,y:75.3}},{t:this.instance_1,p:{regY:45.8,scaleX:0.3022,scaleY:0.1889,x:162.65,y:81.3,regX:9.1,rotation:0,skewY:180}},{t:this.instance,p:{regY:45.9,scaleX:0.1429,scaleY:0.1243,x:106.55,y:88.9}}]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape},{t:this.shape_7},{t:this.instance_2,p:{regX:9.2,regY:45.6,scaleX:0.4066,scaleY:0.2653,rotation:29.9983,skewY:0,x:94.2,y:75.3}},{t:this.instance_1,p:{regY:45.9,scaleX:0.1429,scaleY:0.1243,x:106.55,y:88.9,regX:9.1,rotation:0,skewY:180}},{t:this.instance,p:{regY:45.8,scaleX:0.3022,scaleY:0.1889,x:162.65,y:81.3}}]},39).to({state:[{t:this.shape_18},{t:this.shape_5},{t:this.shape_4},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape},{t:this.instance_2,p:{regX:9.1,regY:45.8,scaleX:0.3022,scaleY:0.1889,rotation:0,skewY:180,x:162.65,y:81.3}},{t:this.instance_1,p:{regY:45.6,scaleX:0.4066,scaleY:0.2653,x:94.2,y:75.3,regX:9.2,rotation:29.9983,skewY:0}},{t:this.instance,p:{regY:45.9,scaleX:0.1429,scaleY:0.1243,x:106.55,y:88.9}}]},16).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-1,268.8,182.4);


(lib.happy_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eyeblack();
	this.instance.setTransform(450.8,132.3,1,1,0,0,0,12.7,24.2);

	this.instance_1 = new lib.eyeblack();
	this.instance_1.setTransform(340.25,132.3,1,1,0,0,0,12.7,24.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AkKgxIAIBVAEBAXIAAAjAEKg6IAAAR");
	this.shape.setTransform(395.45,123.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(4.4,1,1,3,true).p("A8+AVQiJh1iHhEQhYgthXgXQjIg2jFA2QjfA9jbDGQgWAUgWAVEAxxAE4QibqorbA+");
	this.shape_1.setTransform(407.5,248.8375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#303030").ss(1,1,1).p("EghiANhQguACg4gCQhTgDhsgMQk/gjjrgWQjcgUgwgFQgDAAgDAAQgogFg2iAQgthrgThPQgEgPgDgQQgShYgHhLQgEgzgBgxQgCgyADgxQAFhSAPhOQAMg8ASg5QAtiNBTh9QALgQALgPQAmg2ArgsQCPiXC8gyQBYjwCWi6QAsg2AwgxQBghhBzhPQAOgJAOgJQAQgLAQgLQBJgvBOgsQAKgGALgGQCRhQCehBQAmgQAngPQHoi8Jeg3QK2hANZDQQCRAjCXAsQAiAKAiAKQAzAPAzAQQAGACAHACQCvA3C2BBQAuAQAsARQMJEtEfH1QBLApBFA8QAjAeAhAjQCCCFBMCpQAjBNAYBVQALArAJAsQAPBIAHBLQASDMgoCzQgDANgDANQgaBpgvBiQghBDgqA/Qg4BVg+AyQisCKjViAQgIgFgHgFQkcirkii1QgCgBgDgCQg6gkgwglQjFiXglieQgvjGAqi3QhYhIhahBQhzhSh3hFQlxjYmchjAnvtIQBxAHBxAEQCMAECLAAAASuSQiNgFiSAIQh2AGhxAJEAgfAHOQAEAbAEAbQAbC8ACC6QABDRgeDNQgQBrggBqQgFAPgFAOQgmB0g6BzQhSCjh7CgIkVAAA9ukxQgIAHgHAGQACAGADAFQAFgMAFgMgAxrrwQm3CZlMEmA94kZQBUCvAeBpQATA+ARBeQAMBAALBPQAbDAhiCbQhiCZhqAsQgvAShVAFEgaEAg0IhOAAQizjehhjcQgZg4gTg4QgFgPgFgOQgtiMgNiKQgPivACiuQAAgNABgM");
	this.shape_2.setTransform(419.6675,210.031);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgEH6QirgIgtgGQgtgHlHhPQlHhQjhmIQjimJCPgWQCPgWB/BTQCABTGjAKIAAD3IGdgzIgLAvIAXAGIABAAIETBEIB4knIAKABIgKgBQB7gJA8gXQCIg0D3hWQD2hXAzCZQAyCYjUD0QjTD0hYA0QhXA0h1A8Qh0A8ikAdQiBAYiGAAQgjAAgjgCgAg9lQQBIAGAgAAQAgABAEABIhBCqg");
	this.shape_3.setTransform(399.7287,341.4851);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#33CCFF").s().p("AIkFFIgKABIgCAAIgBAAQhGAAgyhgQgyhfAAiHQAAiGAyhgQAyheBGAAIANABIANgBQBGAAAxBeQAyBgAACGQAACHgyBfQgxBghGAAIgNgBgAHbiXQgmBFAABjQAABjAmBFQAhA9AuAIQAsgIAgg+QAlhGAAhlQAAhkglhHQgZgvgggQIgFAAQg3AAgmBGgAqoDmQgxhfAAiHQAAiGAxhgQAyheBGAAQBGAAAyBeQAyBgAACGQAACHgyBfQgyBghGAAQhGAAgyhggAqDieQglBHAABkQAABlAlBGQAlBHA0AAQA1AAAlhHQAlhGAAhlQAAhkglhHQglhGg1AAQg0AAglBGg");
	this.shape_4.setTransform(395.725,131.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AA7TQIgBAAIgYgHIAMguImdAzIAAj4IC0AAICqgJIBKCzIBBiqQAIABgHgDIFLAZIh4EngAFanGQhdiRAAjNIAAgZQACguAGgrQATiFBChnQBeiRCDAAQCEAABeCRQBWCGAHC5IABAfQAADNheCRQg/BihQAgIgBAAQgJAAgIAGQgfAJgiAAQiDAAheiRgAI0nRQBGAAAyhgQAxhfAAiHQAAiHgxhfQgyhfhGAAIgNABIgNgBQhGAAgyBfQgyBfABCHQgBCHAyBfQAyBgBGAAIACAAIABAAIAKgBIANABgAECsoIAAgjgAELuMIAAgRgAscnGQhTiAgJiuQgCgXABgZQAAjNBdiRIAGgJQAcgpAggdQBHhCBYAAQCEAABeCRQBHBvARCPQAEAdABAbIABAoQAADNheCRQheCRiEAAQiDAAheiRgAqkv9QgyBfAACHQAACHAyBfQAxBgBHAAQBFAAAyhgQAyhfAAiHQAAiHgyhfQgyhfhFAAQhHAAgxBfgAkBs+IgIhWg");
	this.shape_5.setTransform(395.4,210.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0033").s().p("EAWrAg0MgwvAAAIhOAAQizjehhjcQgZg4gTg4IgKgdQgtiMgNiKQgPivACiuIABgZQBVgFAvgSQBqgsBiiZQBNh6AAiQQAAgogGgpQgLhPgMhAQgRhegTg+QgehphUivIAKgYQFMkmG3iZQAKCuBSCAQBeCRCEAAQCEAABdiRQBeiRAAjNIgBgoQBxAHBxAEQCMAECLAAIAAAZQAADNBdCRQBeCRCEAAQAhAAAfgJQAJgGAJAAIAAAAQBQggA/hiQBeiRAAjNIgBgfQgGi5hXiGQhdiRiEAAQiEAAheCRQhCBngTCFQiNgFiSAIQh2AGhxAJQgQiPhIhvQhdiRiEAAQhZAAhHBCQggAdgcApIgGAJQhdCRAADNQAAAZABAXQm3CZlMEmIgPANIAFALQBUCvAeBpQATA+ARBeQAMBAALBPQAGApAAAoQAACQhNB6QhiCZhqAsQgvAShVAFQguACg4gCQhTgDhsgMQk/gjjrgWIkMgZIgGAAQgogFg2iAQgthrgThPIgHgfQgShYgHhLQgEgzgBgxQgCgyADgxQAFhSAPhOQAMg8ASg5QAtiNBTh9IAWgfQAmg2ArgsQCPiXC8gyQBYjwCWi6QAsg2AwgxQBghhBzhPIAcgSIAggWQBJgvBOgsIAVgMQCRhQCehBIBNgfQHoi8Jeg3QK2hANZDQQCRAjCXAsIBEAUIBmAfIANAEQCvA3C2BBIBaAhQMJEtEfH1QBLApBFA8QAjAeAhAjQCCCFBMCpQAjBNAYBVQALArAJAsQAPBIAHBLQASDMgoCzIgGAaQgaBpgvBiQghBDgqA/Qg4BVg+AyQisCKjViAIgPgKQkcirkii1IgFgDQg6gkgwglQjFiXglieQgZhpAAhkQAAhaAUhWQhYhIhahBQhzhSh3hFQlxjYmchjQGcBjFxDYQB3BFBzBSQBaBBBYBIQgUBWAABaQAABkAZBpQAlCeDFCXIAIA2QAbC8ACC6QABDRgeDNQgQBrggBqIgKAdQgmB0g6BzQhSCjh7CggA2SNBQiPAVDhGJQDiGKFHBPQFGBQAuAGQAtAHCrAHQCrAICigdQCjgeB1g8QB0g8BYg0QBXg0DUj0QDUj1gziYQgyiYj3BWQj2BWiJA1Qg7AXh8AIIALABIgLgBIlKgYQAHACgHAAQgEgCggAAQgggBhJgGIiqAJIizAAQmkgKh/hSQhlhChvAAQgdAAgdAFgEAv3AK8IgBgEQiOpspwAAIAAAAIAAAAQg6AAg9AFQA9gFA6AAIAAAAIAAAAQJwAACOJsIABAEIAAAAgEgsEACbQjeA9jbDHIgtApIAtgpQDbjHDeg9QDFg2DIA2QBXAXBYAtQCIBECIB2QiIh2iIhEQhYgthXgXQhkgbhjAAQhjAAhjAbgA94kZIAAAAgAxrrwIAAAAg");
	this.shape_6.setTransform(419.6675,210.031);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]},22).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]},4).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72.3,-1,694.8000000000001,422.1);


(lib.garbege_phone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.tears();
	this.instance.setTransform(100.45,78,0.2747,0.2773,0,14.999,-165.002,8.9,45.9);

	this.instance_1 = new lib.tears();
	this.instance_1.setTransform(144.9,98.45,0.1376,0.1365,0,0,180,47.6,45.8);

	this.instance_2 = new lib.tears();
	this.instance_2.setTransform(159.7,88.35,0.3303,0.2827,14.9977,0,0,9.3,46.1);

	this.instance_3 = new lib.phone_sad_mouth();
	this.instance_3.setTransform(114.1,139,0.3894,0.4051,15.2561,0,0,104.2,49.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#535353").s().p("AgFARIAAAAIgBAAIAAgBIABgFIADgLIAAAAIAEgLIACgEIABgBIABAAIAAAAIABABIAAABIgCAEIgFAKIgCAMIgBAEIgBABIgBAAIAAAAg");
	this.shape.setTransform(143.9043,53.9457);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#303030").s().p("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AAAAAQABAAAAAAIABAAIADgBQAAAAABgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAAAIABAIQAIAxAMAFIAHADIAAAAIAkANIACABIABAAIABAAIgDABQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABQgBAAAAABQAAAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQABABAAAAQAAAAABABQAAAAABAAIAFACIgIgDgA0xiPIABgBIgBABgABdlSIAAgBIhqgcIAAAAIhUgbIgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAIADgBIAAABIBVAaIAAAAIBoAdIgBAFIAAABIABAAIAAAAIABAAIABgBIABgEIACABQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAAAABQgBAAAAAAIgDABIgBAAgABplyIACgFIAAgBIgBAAIAAAAIgBAAIgBAAIgCAFQg0gPg3gMQgtgKgrgGQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAAAgBIAEgBIAAAAQAsAGAtAKQA4AMA2AQIABABIACACQAAAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAIgDABIAAAAg");
	this.shape_1.setTransform(133.9146,89.963);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#663300").s().p("AgFAKQAFgMAIgKIgPAZIACgDg");
	this.shape_2.setTransform(5.3375,46.2375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("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IAAgBQgNgDgHgHQgIgGAAgHIAAgCIABgBQABgIAMgDIABAAIAAAAIAGAAIAAAAIABAAQAHAAAIACQAMADAHAGIABAAQAHAHAAAGIgBAEIAAAAQgBAIgMADIgBAAIgHAAIAAAAIgBAAgAClmrQAGAFAKADQAKACAIgBIAAAAQAEgBABgCIABgBQAAgDgEgDIAAAAQgGgFgKgDQgKgCgIABIABAAQgGABgBADIAAAAQAAADAEADgAjHmvQgJAAgIgCIgBAAQgUgFgMgPQgKgLAAgLIABgHIAAgBQAEgQASgGIAAAAIABgBIAAAAQAJgDAJAAIABAAIAAAAQAHAAAIACIABABIABAAIABAAQAUAFAMAOQAKALAAAMIgBAIQgEAPgSAHIgCAAIAAAAQgIADgKAAIAAAAIAAAAgAjonwQgOAFgDALQgCALAJAKQAKAMARAEQARAFAPgGIAAAAQANgEADgKIAAgBQADgLgJgKQgKgMgSgFQgHgCgIAAQgIAAgIADgAizmyIAAAAgAjzoJIgKgBIgCgBIAAABQgMgDgIgIQgHgHAAgHIABgEIAAAAQACgIALgEIABAAIAIgBIABAAIAAAAIANACIAAAAQAMADAIAHIAAABQAHAGAAAHIgBAEQgCAJgLADIAAAAIgKABIAAAAIgBAAgAkQokQAAAEAEAEQAGAGAJACIABAAQAJACAIgCIAAAAQAFgBACgEIAAAAQAAgDgEgEIAAAAQgGgGgJgDIAAABQgKgDgIACIAAAAQgFACgCADgAjooKg");
	this.shape_3.setTransform(133.8637,99.7359);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AivHTIAAAAIgJgFIAJgQIiigWIA5hkIAlABQAWABAYAFIAXADIAHADIgCBkIATghIAAAAIAgg3IB8A+IhAB6gACrg4QgygNgWhAQgIgXgCgZQgIglAOg2IABgFIABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAIgBgCIACgMIAFgLIADAAQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIgCgCIAMgVIABgCIAEgHIACgEQASgeAPgTQAVgaAzAGIAOABQALAfARAXQgLgJgOgEIgOgBQgXgDgoAcQgMAIgJAKQgYAcgKAoQgJAiAFAgQADARAIAQQAWAsAQAJQAPAIAAgBQAAgBAUADQARACAfgTIACgBIAHgFQANgKALgLQAUgbALgnIAAgBQANgqgHgfQgGgfgJgMIgGgKQAWAVAeALQAAAagCArIgDATIgDABQAAAAgBAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAQAAAAgBABQAAAAABABQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAIABAAIgBAGQgUBMgyAtQgmAjgnAAQgMAAgLgDgAkKipQgygNgWhAQgSg1ALg/IABAAQABAAAAAAQABAAAAgBQABAAAAAAQAAAAABgBQAAAAAAgBQABAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgBgBAAIgCgBIAEgNQAJgmARgeQAUgCARgFQgeAfgMAwQgPA5ASAuQAGAQAIAMQAUAUAOAHQAGADAFABQAMADAMgBQAYgGAdgVQANgKAKgLQAWgbAKgnIAAgBQANgqgHgfQgHgfgIgMQgSgkgjgJQgOgDgOABIAFgEQAQgOAMgTQAaAFAVAPQApAgAEAaQAEAagEBCIgDABQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQABAAAAABQAAAAABABQAAAAAAAAQABAAAAABQABAAAAAAIgBAKIgEAAQAAABgBAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQABABAAAAQAAABAAAAQAAABABAAQAAAAAAABQABAAAAAAQAAAAABABIAAAAIgCAKQgUBMgyAtQgmAjgnAAQgMAAgLgDgADai7QgRgFgLgLIAAAAQgIgKACgKQADgKAMgEIAAAAQAPgFARAFQASAEAJALIAAAAQAKAKgDAJIAAABQgCAKgNAEIgBAAQgHADgIAAQgIAAgIgCgAC4kEQgKgDgGgFQgEgDABgDIgBAAQACgDAFgBIgBAAQAIgBAKADQAKACAHAFIgBAAQAEAEAAADIAAAAQgBACgFABIAAAAIgHABIgLgCgAjUkbQgRgFgKgMQgJgKACgLQADgLAOgEQAOgGARAFQASAEAKAMQAJAKgDAMIAAAAQgCAKgNAFIgBAAQgIADgJAAQgHAAgIgCgAj5l1IAAAAQgKgCgGgGQgEgEAAgEQACgDAGgCIgBAAQAIgBAKACIAAAAQAJACAHAGIAAAAQADAEAAADIAAABQgCADgFACIAAAAIgHABIgKgCg");
	this.shape_4.setTransform(133.5496,83.8125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0033").s().p("AtVIlIgCgBIAAAAIAAAAIgJgCIgPgnQgXg8gLg5IAAgBQgRhoAXh6IALgxIAAgBIAAgBIAKgiQAeAFATgCQAugGA1gwQA2gxAJhMIAFg4IAAAAQADglgCgZQgBgqgOhJIADgFQCZhMC0gNQgLA/ASA1QAWBAAyANQAzANAxgtQAxgtAVhMIACgKIBUAaIABAAIBpAdIgBAFQgOA2AIAlQACAZAIAXQAWBAAyANQAzANAxgtQAygtAThMIACgGQCRBOB2ByQAmAmAjAqQAcAfAZAiQghBAgBBOQgCBAA8BLIggC3IgdBZIAAABQgqBog+BNIAAAAIgQATQgmAqgxAoIgBABgAlcHDIF4BlIAAi3IgagVIh7g+IgOgEQgVgHgVgEIgXgDQgZgFgVgBIgmgBQgWgCgYACIAWAAIAAARIgoAAgAPtJJIjkjnIgEgGIgBAAIgJgKIgBgBIAAAAQg7hKABg+QABhNAig/IAAgDIgBgDQgbgjgcghQgkgqgngmQh3h0iShOIgBgBIADgTQACgrAAgaQAmAPAyAAQARAAANgNQAMgMAAgRQAAgSgMgMQgMgNgSAAQhrgCgNh1QgDgRgNgLQgOgLgRACQgSACgLAOQgKANABASQAFAoAMAgIgOgBQgzgHgVAbQgPATgSAeIgCAEIgEAHIgBACIgMAVIgBAAQg2gRg4gLQgugKgrgGIgBAAQAEhCgEgaQgEgagqggQgUgPgagFQATgcAKgmQAEgRgIgPQgJgQgRgEQgRgEgPAIQgPAJgFARQgJAjgUAVQgNAHgOAMQgkAOg3gIQgSgDgOAKQgOALgDARQgCARAKAOQAKAOARADQAtAHAlgEQgRAegJAmIgEANIgBAAQi3ANicBNIAAAAIgBABIgGADIgCACIgBADIABAEIAAABQAPBJABAqQABAZgCAlIgFA3QgIBIgzAuQgzAugsAGQgSACgegGIgCgBIk7hsIgEgCIgBAAIgCgBIgvgRIgBAAIgCgBIAAAAIgDgBIgjgMIAAAAIgHgDQgNgGgHgxIgBgIIgBgCIAAgCIAAgBIAAgCIAAhtIACgIIAAgBQAEgaAGgcQAEgVAGgWIAAAAQAGgTAIgSIAAgBIABgGIAcguIABgBQAegwArgmQAZgWAZgPQBEgqBMAAIACAAIACgCQA5hQBKg2QAVgQAYgNQAtgbAzgRIAAAAIAMgEIAAAAQAogOApgKIAAAAIAIgCIABAAQA/gQBCgJQDZgdD+ArQEOAtExCiQA0AcA1AfIA7AjIAFADQA+AmA/ArIAfAVQEJC7A9DWIABADQAYAWAUAdIAAAAIAUAdIAAAAQA0BaACBpIAAABIABACIAAACIAAAAIgKBJIgFAgIgIAtIAAABIgEANQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAIgBAFIgBAGIgEAAQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAAAABIgBABIgCAJIAAAAIgBACQgMAcgEAHQgFAIgBAFIgBACIgDAGQggA2gvArIAAAAIgEAEIgCACIgBAAQgeAXglATIgPAEgAM0C+QgHAFgCAJQgCAIAGAIQAFAHAJACQEKAugHD7QAAAJAGAGQAGAHAKAAQAIAAAHgGQAHgGAAgJQAIkhkwg0IgEgBQgGAAgGAFgAsfhEQAFAHAJACQAJABAHgFQAHgFACgJQABgJgFgHQhFhjhTgvIAAAAQhMgqhWABIAAAAQhqAAh3BCQgIAFgCAIQgDAJAFAIQAEAIAIACQAJADAIgFQBsg8BggBIAAAAQBLgBBCAlIAAAAQBKArBABag");
	this.shape_5.setTransform(133.85,90.1189);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-1,268.8,182.4);


(lib.noki_friend = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.noki_hand();
	this.instance.setTransform(214.3,128.75,0.8662,0.8695,0,7.3259,3.6027,39.5,45.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:36.8,regY:45.3,skewX:9.6453,skewY:5.9235,x:212.85,y:131.25},0).wait(1).to({skewX:11.9643,skewY:8.2424,x:213.85,y:133.7},0).wait(1).to({skewX:14.2832,skewY:10.5613,x:214.8,y:136.15},0).wait(1).to({skewX:16.6021,skewY:12.8802,x:215.75,y:138.65},0).wait(1).to({skewX:18.921,skewY:15.1991,x:216.75,y:141.1},0).wait(1).to({skewX:21.2399,skewY:17.518,x:217.7,y:143.55},0).wait(1).to({skewX:23.5588,skewY:19.837,x:218.65,y:146.05},0).wait(1).to({skewX:25.8777,skewY:22.1559,x:219.6,y:148.5},0).wait(1).to({skewX:28.1966,skewY:24.4748,x:220.6,y:151},0).wait(1).to({skewX:30.5155,skewY:26.7937,x:221.6,y:153.5},0).wait(1).to({skewX:27.56,skewY:23.8382,x:220.35,y:150.35},0).wait(1).to({skewX:24.6045,skewY:20.8827,x:219.1,y:147.2},0).wait(1).to({skewX:21.649,skewY:17.9271,x:217.8,y:144.1},0).wait(1).to({skewX:18.6935,skewY:14.9716,x:216.6,y:141},0).wait(1).to({skewX:15.738,skewY:12.0161,x:215.3,y:137.85},0).wait(1).to({skewX:12.7824,skewY:9.0606,x:214.1,y:134.7},0).wait(1).to({skewX:9.8269,skewY:6.1051,x:212.85,y:131.65},0).wait(1).to({skewX:6.8714,skewY:3.1496,x:211.65,y:128.5},0).wait(1));

	// Layer_1
	this.text = new cjs.Text("", "40px 'Haettenschweiler'", "#FF0033");
	this.text.lineHeight = 44;
	this.text.parent = this;
	this.text.setTransform(87.3,-18.65);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAAAHIgFAPIgJgHIAJgMIgOgDIAEgLIAMAHIgBgRIAKAAIgCARIAMgHIAEALIgOADIAKAMIgJAHg");
	this.shape.setTransform(135.9,261.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgZACQAAgWAHgLQAHgLAMAAQAZAAAAAqQAAAVgHALQgHALgMAAQgZAAAAgpgAgJABQAAAcAJABQAKgBAAgdQAAgcgKAAQgJAAAAAdg");
	this.shape_1.setTransform(105.675,263.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAAAmIACgUIgKAAIgDAUIgLAAIAEgUIgJAAIABgLIAKAAIACgNIgKAAIACgLIALAAIADgUIAJAAIgCAUIAKAAIADgUIAKAAIgDAUIAJAAIgCALIgJAAIgCANIAKAAIgDALIgKAAIgDAUgAgGAHIAKAAIADgNIgLAAg");
	this.shape_2.setTransform(71.95,263.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgUAoIAAgPQAGAFAIgBQAHABAEgHQAFgHAAgMIgBAAQgEAIgJAAQgIAAgGgHQgGgGAAgLQAAgOAHgIQAHgJAKAAQALAAAHALQAHAKAAATQAAAWgIAMQgIAMgOAAQgJAAgGgDgAgGgZQgDAFAAAFQAAAHADAEQADADADAAQAEAAADgDQACgDAAgGQAAgGgCgFQgDgEgEAAQgDAAgDADg");
	this.shape_3.setTransform(136.325,247.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgSAlQgGgGAAgLQAAgOAOgHIAAAAQgMgGAAgNQAAgJAGgHQAHgHAJAAQALABAGAFQAGAHAAAJQAAAOgNAGIAAAAQAHACAEAGQAEAFAAAHQAAALgHAHQgHAGgLAAQgLAAgHgGgAgJATQAAAFADADQADADADAAQAFAAADgDQACgDAAgFQAAgJgKgEQgJAEAAAJgAgFgbQgCAEAAAEQAAAHAHAEQAJgEAAgHQAAgFgDgDQgCgCgEAAQgCAAgDACg");
	this.shape_4.setTransform(105.525,247.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgQAqIAYhEIggAAIAAgPIAxAAIAAAIIgZBLg");
	this.shape_5.setTransform(71.875,247.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgRAhQgHgKAAgSQAAgVAJgNQAIgOAOAAQAJAAAEADIAAAPQgGgDgGAAQgIAAgEAHQgEAHAAAMQAEgJAJAAQAJAAAGAHQAFAGAAAMQAAAMgHAJQgHAIgKAAQgMAAgGgKgAgFAGQgDADAAAGQAAAFADAFQACAFAEAAQAEgBACgEQADgEAAgGQAAgNgKAAQgDAAgCAEg");
	this.shape_6.setTransform(136.45,231.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgVAnIAAgQQAHAGAIAAQAGAAADgEQADgDAAgGQAAgNgNAAIgMABIAAguIAmAAIAAAPIgZAAIAAARIAGAAQAKAAAGAHQAGAFAAAMQAAANgHAIQgHAIgMAAQgKAAgHgEg");
	this.shape_7.setTransform(105.625,231.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAEAqIAAgSIgeAAIAAgLIAdg2IAPAAIAAA0IAJAAIAAANIgJAAIAAASgAABgQIgOAbIARAAIAAgZIAAgIIAAAAIgDAGg");
	this.shape_8.setTransform(71.825,231.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgWAnIAAgQQAIAGAJAAQAFAAADgCQAEgEgBgFQAAgGgDgDQgDgDgIAAIgGAAIAAgNIAGAAQANAAgBgLQAAgKgJAAQgIAAgGAFIAAgPQAIgEAJgBQAKAAAGAHQAHAGAAAIQAAARgPAEIAAABQAHAAAFAFQAEAFAAAIQAAAMgHAGQgHAIgMAAQgLAAgHgFg");
	this.shape_9.setTransform(136.45,215.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgXArIAAgPIAUgXQAGgGACgEQADgFAAgFQAAgMgKAAQgJAAgIAJIAAgQQAJgIALAAQAKAAAHAHQAFAGAAALQAAAPgOAPIgOAPIAcAAIAAAQg");
	this.shape_10.setTransform(105.5,215.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgVArIAAgPIAPAAIAAgzIgQAEIAAgPIAegIIAABGIAPAAIAAAPg");
	this.shape_11.setTransform(72,215.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(0.1,1,1).p("AmoynQCYhLC7gSQANgEACAKIADARQACAKgMADQizAPigBOQgHACgEgCQgDgCgBgEIgDgRQgCgIAJgEQABgBACAAgAnoFLQHYCSHXiwQAlCZgDCmQgCBfgOBkQgNBcgZBgQgUBOgbBSQmXD2lDj2QgdhagYhYQgahggThgQgRhagLhaQgSiNgCiNg");
	this.shape_12.setTransform(102.183,158.3671);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(4.9,1,1).p("AhNAAICbAA");
	this.shape_13.setTransform(93.75,10.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(2.7,1,1).p("AAMAAQAAAGgEADQgDAFgFAAQgDAAgEgFQgEgDAAgGQAAgEAEgEQAEgEADAAQAFAAADAEQAEAEAAAEg");
	this.shape_14.setTransform(111.25,8.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#535353").ss(0.1,1,1).p("AGy10IA/AAAGy10QAODYALDYQA7SOgVR9Qh4AuhzAZAm1VHQhayMAkydQAFjJALjJQBfgmCOgLQD/gUGhBFAh2WkQgZgEgXgDADQWYQiqAdiagRAjgWRQhtgYhogyIgmAA");
	this.shape_15.setTransform(101.4249,146.1097);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(3.6,1,1).p("ALhDJIgFBvQgdILiCH+QgaALgbAJQnPCknWikQhVgfgsgUQihqTgdq0ArhjEQgLogBEo1QB0gvBxgeQB3ghB1gQQFXgvFKBgQBaAdAbAJQC5MLgXLyArcgqIgFiZ");
	this.shape_16.setTransform(99.0893,144.7011);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#535353").ss(1.3,1,1).p("AJbCEQAAAHAAAGADWvvIAuAAQAvhBApBBIAfAAAiqvrQA0gzA1AyAnSwIIhBgCQgkg5gjA2ABgm9QAFgCAFgDQgOANAAgCQgeAvgcAyQg0BuA2BMQihA3hvhUQgzhWAIhmQAAgCAAgBQACgkALgmQBPAsBTAFQBSAEBVgiQAQgGARgIgABgm9QAAABgBABQgBACgCACABfm7QABgBAAgBAo7K1QHWBLHnhEAofNpQHAA7HQglAnyP+QGfBKGfg5");
	this.shape_17.setTransform(112.5,150.3718);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1.3,1,1).p("AGSyVQCLAPCNBMQAIAEAIAFIgPALIgIAFQiAhPiYgHgAKCvVIguB7QhyAehngrQgTg7ABgwgAEAvSQABAygMAyQh/AchfgKQgvgpgMhIQgCgQgBgSQBgg9C8AEQALArAAArIkkAFAFpvSQABgsARgjQBcgqC1BWIgKAgAorNFQggp5CPmuIAAgBAm3hJIAAAFQglFtgRJMIgFAAIARAPQBdHNhyk6QgnD6gekGQjLB1CmjJQjJAJD+h6IAAgBIA5Aw");
	this.shape_18.setTransform(69.7977,147.824);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF0000").s().p("AhnhUQBNhfB9AgQBnBXg1CJIj/BQQh5hsB8iFg");
	this.shape_19.setTransform(128.0297,178.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00CC00").s().p("AiIBQQhmgjBxiPQA0hGCpBGQBrBWgWCSQjZgVhkghg");
	this.shape_20.setTransform(71.7047,178.6125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CCCCCC").s().p("AlWT6QgdhagYhYQgahggThgQETAkEYAAIAAAAIABAAQCxAAC0gOQgNBcgZBgQgUBOgbBSQjMB7i3AAQi2AAihh7gABLRHQCvAACwgXIADgBIACAAIAEgBIgEABIgCAAIgDABQiwAXivAAIAAAAIAAAAQjrAAjrgqQDrAqDrAAIAAAAIAAAAgABzOsQkYAAkTgkQgRhagLhaIAXAEQDrAjDvAAIAAAAIABAAQDeAADigeIAAAAIALgCQgCBfgOBkQi0AOixAAIgBAAIAAAAgAHZOeIAAAAgAm4OIIAAAAgAAdL7QjvAAjrgjIgXgEQgSiNgCiNQHYCSHXiwQAlCZgDCmIgLACIAAAAQjiAejeAAIgBAAIAAAAgAHpLbIAAAAgAmrAtIAAwYIAAgpQAEACAHgCQCghOCzgPQAMgDgCgKIgDgRQgCgKgNAEQi7ASiYBLIgDABIAAi+IMIAAIAJDBQiNhNiLgPIgHAfQCYAHCABPIAIgFIAEBQIAzP9gAiwlZIAAACIAAABQgHBmAzBWQBvBUChg3Qg3hMA1huQAbgyAegvQAAACAPgNIgKAFIgBAAIABAAIgCACIABgCIgBACIggAMIAhgOIghAOQhWAihRgEQhTgFhOgsQgMAmgCAkgAC1tIQApAAArgKIAHgCIAuh8IAtAAIgtAAIAKgfIgDgCIgEgBIgDgCQhyg1hOAAIgBAAIAAAAQgmAAgeAMIgBABIgBAAQgRAkgBArQgagZgZAAIAAAAIgBAAQgaABgaAZQAAgrgLgsIgCAAIgSAAIAAAAIAAAAQirAAhbA4IgBABIgBAAIgBABQABARACAQIElgEIAAAIQAAAugLAuIgCAAIgBABIgDAAIgBAAIgJACIAAAAQhTARhGAAIAAAAIAAAAQgcAAgZgDQgwgpgMhIQAMBIAwApQAZADAcAAIAAAAIAAAAQBGAABTgRIAAAAIAJgCIABAAIADAAIABgBIACAAQALguAAguIAAgIQAagZAagBIABAAIAAAAQAZAAAaAZIAAAFQAAAuASA5QA9AZBAAAIAAAAIABAAgAjUvDQgLACgIAJQgJAIgDAMQgEAMACANQACANAGAKQAGAIADACQAQAMASgEQATgGAIgUQAJgSgGgWQgFgSgOgIQgJgGgKAAIgKABgAlrvpIhAgCgADImegAC0tIQhAAAg9gZQgSg5AAguIAAgFIEZgDIguB8IgHACQgrAKgpAAIgBAAIAAAAgACeu+QgRAGgIARQgKARAGAVIAEANQAGANAMAGQAKAGAMgCQAMgBALgJQAJgJAEgOQAEgNgDgPQgDgOgJgKQgIgJgKgDQgGgCgFAAQgGAAgFACgAlrvpIABgBIABAAIABgBQBbg4CrAAIAAAAIAAAAIASAAIACAAQALAsAAArIklAEQgCgQgBgRgAhDvMIAAAAgAAlvNIAAAAgAAlvNIAAAAgAA3wcIABAAIABgBQAegMAmAAIAAAAIABAAQBOAAByA1IADACIAEABIADACIgKAfIkZADQABgrARgkgAE+vQgABS1eQgDgDAAgGQAAgFADgEQAFgEAEAAQAFAAADAEQADAEAAAFQAAAGgDADQgDAFgFAAQgEAAgFgFg");
	this.shape_21.setTransform(102.183,147.2625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999999").s().p("Ah0WkIgCAAIgwgHIAAgPIg6AAIAAADQhtgYhogyQHXCkHPikQh4AuhzAZIg2AAIAAAKQhrAShlAAQg6AAg6gGgAm1VHQhayMAkydQAFjJALjJQBfgmCOgLQh1AQh4AhQB4ghB1gQQD/gUGhBFQAODYALDYQA7SOgVR9QjoBSjpAAQjpAAjshSgAnMLgQALBaARBZQATBhAaBgQAXBYAdBZQFDD3GYj3QAbhRAUhPQAYhgANhcQAPhkACheQACingkiYQnYCvnYiRQACCNATCNgACiDwQh8CFB5BsIEAhQQA1iKhnhXQgggIgcAAQhWAAg5BIgAmmDiQhxCQBmAjQBkAhDaAVQAWiThrhWQhVgjg4AAQg3AAgaAjgAmkA4INJAAIgyv8QAvhCApBCQgphCgvBCIgEhRIAPgLIgQgJIgKjAIsIAAIAAC+QgJADACAJIADARQABAEADACIAAApIAAgBQgSgcgSAAIgBAAIAAAAQgRAAgQAYIAAAAIgBABIAAABIAAgBIABgBIAAAAQAQgYARAAIAAAAIABAAQASAAASAcIAAABgABa1kQgDADAAAGQAAAFADAEQAEAEAFAAQAEAAAEgEQADgEAAgFQAAgGgDgDQgEgFgEAAQgFAAgEAFgAAC1OIicAAgAm1VHIAAAAgAmkvfIAAAAg");
	this.shape_22.setTransform(101.4249,146.1097);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#003366").s().p("AHjuNIAeAAIgeAAQgLjYgOjYIB1AmQC5MLgXLyIAAAMIgFBvQgdILiCH+QgaALgbAJQAWx9g7yOgAoeVLQihqTgdq1IAAgEIgFiZIAAgBQgLogBEo1QB0gvBxgeQgLDJgGDJQgkSdBbSMQhVgfgsgUgAHjuNgAjX1uQFXgvFKBgQmhhFkAAUg");
	this.shape_23.setTransform(99.0893,140.6136);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("Ah5Y0QgqgSgCgXQgEgYAkgQQAlgQAzAAQAfAAAYAGIAAoAIAAgDIA5AAIAAAPIAAIHQARAcgHAQQgFAQgiAMQghANgpADIgHAAQgnAAgngQgAHHYyQgggRAAgYQAAgTATgPIAAoHIAAgKIA3AAIACAAIAAH6QARgCASAAQAtAAAhASQAgARAAAYQAAAYggARQghASgtAAQgvAAgggSgApEHOIg5gwQggp4CPmvIAFCZIAAAFQglFugRJLgABtpGQgzhWAHhmQC0AxCHgSQg1BtA3BNQhAAVg4AAQhWAAhDgygAG2tFIACgEIACgCIAKgEQgNALgBAAIAAgBgAGX0gQgHgDgHgHQgFgJAAgKQgBgKAFgIQAFgJAIgCQAIgDAJAEQAIAEAEAIQAEAJAAAKQgCAKgGAHQgIAJgJAAIgGAAgAAQ0sIgFgHIgBgIIAAgEQAAgJAFgHIABgCQAGgJAJgCQAPgCAJAPQAFAJAAAJQAAAKgGAHQgHAMgMAAQgMAAgHgMgAi53BQgDgBgBgEIgDgRQgCgJAJgEIADgBQCYhKC6gTQANgDACAKIADAQQACAKgMADQiyAPigBPIgGABIgFgCgAE54eIAHgeQCLAPCNBMIAQAJIgPALIgIAFQiAhPiYgHg");
	this.shape_24.setTransform(77.9657,190.1356);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AmlOyQgnD6gdkHQjMB2CmjKQjIAJD9h6IAAgBIA5AxIASAPQA3ERgSAAQgNABguh/gADlnBIAAgDQACgkALgmQBOAsBTAEQBSAFBWgiIAhgMIgDAEQgfAugbAzQglAFgoAAQhrAAiCgkgADknCIABgCIAAADgADlnEIAAAAgAItvMQgMgGgHgNIgEgNQgFgVAJgRQAIgRASgGQAKgEALAEQALADAIAJQAIAKADAOQADAPgEANQgEAOgJAJQgLAJgLABIgGAAQgJAAgHgEgAI4wYQgIACgFAIQgEAJAAAJQAAALAGAIQAGAHAIADQAMAEALgMQAFgHACgKQABgLgFgIQgEgIgIgFQgFgCgEAAQgEAAgEACgACxvVQgEgCgFgIQgHgKgCgNQgCgNAEgMQAEgMAIgIQAJgJALgCQAOgEAPAJQANAIAFASQAHAWgKASQgHAUgUAGIgJABQgNAAgLgJgADDwaQgJACgGAIIgCACQgFAIAAAJIABADIAAAJIAGAHQAHALAMAAQALAAAHgLQAGgHABgLQAAgJgFgJQgIgNgMAAIgEABg");
	this.shape_25.setTransform(61.6369,157.999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(19));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-20.6,269.4,371.1);


(lib.Iphone = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.updatedIphone("synched",0);
	this.instance.setTransform(66.1,88.4,1,1,-7.1869,0,0,70.4,95.6);

	this.instance_1 = new lib.ringaffect();
	this.instance_1.setTransform(-12.85,206.9,0.3786,0.6158,180,0,0,127.2,-91.4);

	this.instance_2 = new lib.ringaffect();
	this.instance_2.setTransform(174.95,-17.25,0.4284,0.4816,29.9986,0,0,127.7,-91.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{regX:127.7,regY:-91.3,scaleX:0.4284,scaleY:0.4816,rotation:29.9986,x:174.95,y:-17.25}},{t:this.instance_1,p:{regX:127.2,regY:-91.4,scaleX:0.3786,scaleY:0.6158,rotation:180,x:-12.85,y:206.9}},{t:this.instance,p:{regY:95.6,rotation:-7.1869,x:66.1,y:88.4}}]}).to({state:[{t:this.instance_2,p:{regX:127,regY:-91.8,scaleX:0.3786,scaleY:0.6158,rotation:180,x:-12.7,y:206.65}},{t:this.instance_1,p:{regX:127.9,regY:-91,scaleX:0.4284,scaleY:0.4816,rotation:29.9986,x:174.9,y:-17.05}},{t:this.instance,p:{regY:95.5,rotation:4.4783,x:85.65,y:86.8}}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.8,-34,211.9,247.4);


(lib.fly = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flywing();
	this.instance.setTransform(-20.5,-64.85,10.1111,12.2621,-7.2151,0,0,-11.8,-55.9);

	this.instance_1 = new lib.flywing();
	this.instance_1.setTransform(34.7,-72.35,10.5162,12.2778,0,0,0,-11.1,-56.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(0.1,1,1).p("ARgAAQAAD3lICuQlICunQAAQnPAAlIiuQlIiuAAj3QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2g");
	this.shape.setTransform(3,45.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333300").s().p("AhABCQgbgbAAgnQAAgmAbgbQAagbAmAAQAmAAAbAbQAbAbAAAmQAAAngbAbQgbAbgmAAQgmAAgagbg");
	this.shape_1.setTransform(-84.75,47.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AsXGlQlIiuAAj3QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2QAAD3lICuQlICunQAAQnPAAlIiugAuugvQgbAbAAAmQAAAmAbAbQAbAbAmAAQAnAAAbgbQAbgbAAgmQAAgmgbgbQgbgbgnAAQgmAAgbAbg");
	this.shape_2.setTransform(3,45.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#666666").ss(0.1,1,1).p("ARgAAQAAD3lICuQlICunQAAQnPAAlIiuQlIiuAAj3QAAj1FIivQFIiuHPAAQHQAAFICuQFICvAAD1g");
	this.shape_3.setTransform(25.15,32.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333300").s().p("AhABBQgbgbAAgmQAAglAbgbQAbgbAlAAQAmAAAbAbQAbAbAAAlQAAAmgbAbQgbAbgmAAQglAAgbgbg");
	this.shape_4.setTransform(-62.6,34.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AsXGkQlIiuAAj2QAAj1FIivQFIiuHPAAQHQAAFICuQFICvAAD1QAAD2lICuQlICvnQAAQnPAAlIivgAuugvQgbAbAAAlQAAAnAbAbQAbAbAmAAQAnAAAbgbQAbgbAAgnQAAglgbgbQgbgbgnAAQgmAAgbAbg");
	this.shape_5.setTransform(25.15,32.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333300").s().p("AhABBQgbgaAAgnQAAglAbgbQAbgbAlAAQAnAAAaAbQAbAbAAAlQAAAngbAaQgaAbgnAAQglAAgbgbg");
	this.shape_6.setTransform(-34.95,59.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AsXGkQlIitAAj3QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2QAAD3lICtQlICvnQAAQnPAAlIivgAuugvQgbAbAAAmQAAAmAbAbQAbAbAnAAQAmAAAbgbQAbgbAAgmQAAgmgbgbQgbgbgmAAQgnAAgbAbg");
	this.shape_7.setTransform(52.8,57.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333300").s().p("AhBBCQgbgbAAgnQAAgmAbgaQAbgcAmAAQAnAAAbAcQAbAaAAAmQAAAngbAbQgbAbgnAAQgmAAgbgbg");
	this.shape_8.setTransform(7.75,29.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333300").s().p("AhBBCQgbgbAAgnQAAgmAbgbQAbgbAmAAQAnAAAbAbQAbAbAAAmQAAAngbAbQgbAbgnAAQgmAAgbgbg");
	this.shape_9.setTransform(69.4,78.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AsXGlQlIivAAj2QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2QAAD2lICvQlICunQAAQnPAAlIiugAuugvQgbAbAAAlQAAAnAbAbQAbAbAmAAQAnAAAbgbQAbgbAAgnQAAglgbgbQgbgbgnAAQgmAAgbAbg");
	this.shape_10.setTransform(157.15,77.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#666666").ss(0.1,1,1).p("ARgAAQAAD2lICvQlICunQAAQnPAAlIiuQlIivAAj2QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2g");
	this.shape_11.setTransform(212.5,14.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333300").s().p("AhBBBQgbgaAAgnQAAgmAbgbQAbgbAmAAQAnAAAbAbQAbAbAAAmQAAAngbAaQgbAcgngBQgmABgbgcg");
	this.shape_12.setTransform(124.75,16.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AsXGlQlIivAAj2QAAj1FIivQFIiuHPAAQHQAAFICuQFICvAAD1QAAD2lICvQlICunQAAQnPAAlIiugAuugvQgbAbAAAlQAAAnAbAbQAbAbAmAAQAnAAAbgbQAbgbAAgnQAAglgbgbQgbgbgnAAQgmAAgbAbg");
	this.shape_13.setTransform(212.5,14.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333300").s().p("AhABCQgbgbAAgnQAAgmAbgaQAagcAmAAQAmAAAbAcQAbAaAAAmQAAAngbAbQgbAbgmAAQgmAAgagbg");
	this.shape_14.setTransform(192,74.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333300").s().p("AhABBQgbgaAAgnQAAgmAbgbQAbgbAlAAQAnAAAaAbQAbAbAAAmQAAAngbAaQgaAbgnABQglgBgbgbg");
	this.shape_15.setTransform(238.65,3.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AsXGkQlIiuAAj2QAAj1FIivQFIiuHPAAQHQAAFICuQFICvAAD1QAAD2lICuQlICvnQAAQnPAAlIivgAuugvQgbAbAAAlQAAAnAbAbQAbAbAnAAQAmAAAbgbQAbgbAAgnQAAglgbgbQgbgbgmAAQgnAAgbAbg");
	this.shape_16.setTransform(326.4,2.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333300").s().p("AhABBQgbgbAAgmQAAgmAbgaQAbgbAlAAQAnAAAaAbQAbAaAAAmQAAAmgbAbQgaAbgnAAQglAAgbgbg");
	this.shape_17.setTransform(131.1,64.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333300").s().p("AhBBBQgbgbAAgmQAAgmAbgbQAbgbAmAAQAnAAAbAbQAbAbAAAmQAAAmgbAbQgbAcgnAAQgmAAgbgcg");
	this.shape_18.setTransform(-15.95,71.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333300").s().p("AhABCQgbgbAAgnQAAgmAbgbQAbgbAlAAQAmAAAbAbQAbAbAAAmQAAAngbAbQgbAbgmAAQglAAgbgbg");
	this.shape_19.setTransform(-56.3,-11.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AsXGlQlIiuAAj3QAAj2FIiuQFIiuHPAAQHQAAFICuQFICuAAD2QAAD3lICuQlICunQAAQnPAAlIiugAuugvQgbAbAAAlQAAAnAbAbQAbAbAmAAQAnAAAbgbQAbgbAAgnQAAglgbgbQgbgbgnAAQgmAAgbAbg");
	this.shape_20.setTransform(31.45,-13);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333300").s().p("AgKALQgFgEAAgHQAAgGAFgEQAEgEAGgBQAHABAFAEQAEAEAAAGQAAAHgEAEQgFAFgHgBQgGABgEgFg");
	this.shape_21.setTransform(332.725,79.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AiKBHQg6gUgBgqQABgoA6gdQA5gdBRAAQBSAAA6AdQA6AdgBAoQABAqg6ATQg6AThSABIgKAAQhKAAg2gTgAilABQgFAFAAAGQAAAHAFAEQAFAFAGAAQAHAAAFgFQAEgEABgHQgBgGgEgFQgFgDgHAAQgGAAgFADg");
	this.shape_22.setTransform(348.2,78.1801);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2,p:{x:3,y:45.5}},{t:this.shape_1},{t:this.shape,p:{x:3,y:45.5}},{t:this.instance_1,p:{x:34.7,y:-72.35,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:-20.5,y:-64.85,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3,p:{x:25.15,y:32.85}},{t:this.instance_1,p:{x:56.85,y:-85,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:1.65,y:-77.5,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_3,p:{x:52.8,y:57.35}},{t:this.instance_1,p:{x:84.5,y:-60.5,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:29.3,y:-53,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_2,p:{x:95.5,y:27.3}},{t:this.shape_8},{t:this.shape,p:{x:95.5,y:27.3}},{t:this.instance_1,p:{x:127.2,y:-90.55,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:72,y:-83.05,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_3,p:{x:157.15,y:77.1}},{t:this.instance_1,p:{x:188.85,y:-40.75,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:133.65,y:-33.25,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:212.5,y:14.65}},{t:this.instance_1,p:{x:244.2,y:-103.2,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:189,y:-95.7,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_2,p:{x:279.75,y:73.2}},{t:this.shape_14},{t:this.shape_3,p:{x:279.75,y:73.2}},{t:this.instance_1,p:{x:311.45,y:-44.65,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:256.25,y:-37.15,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_16,p:{x:326.4,y:2.05}},{t:this.shape_15},{t:this.shape,p:{x:326.4,y:2.05}},{t:this.instance_1,p:{x:358.1,y:-115.8,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:302.9,y:-108.3,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_16,p:{x:218.85,y:62.9}},{t:this.shape_17,p:{x:131.1,y:64.65}},{t:this.shape_11,p:{x:218.85,y:62.9}},{t:this.instance_1,p:{x:250.55,y:-54.95,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:195.35,y:-47.45,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_16,p:{x:137.4,y:4.4}},{t:this.shape_17,p:{x:49.65,y:6.15}},{t:this.shape,p:{x:137.4,y:4.4}},{t:this.instance_1,p:{x:169.1,y:-113.45,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:113.9,y:-105.95,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_16,p:{x:71.8,y:70}},{t:this.shape_18},{t:this.shape,p:{x:71.8,y:70}},{t:this.instance_1,p:{x:103.5,y:-47.85,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:48.3,y:-40.35,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape,p:{x:31.45,y:-13}},{t:this.instance_1,p:{x:63.15,y:-130.85,scaleX:10.5162,scaleY:12.2778}},{t:this.instance,p:{x:7.95,y:-123.35,scaleX:10.1111,scaleY:12.2621,rotation:-7.2151,skewX:0,skewY:0}}]},3).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.instance_1,p:{x:353.8,y:59.35,scaleX:1.8545,scaleY:2.0612}},{t:this.instance,p:{x:344.1,y:60.6,scaleX:1.7817,scaleY:2.0602,rotation:0,skewX:-7.5748,skewY:-6.8718}}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110,-198.9,549.4,336.5);


(lib.Scene_1_טלפון_ושולחן = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// טלפון_ושולחן
	this.instance = new lib.happy_phone("synched",0);
	this.instance.setTransform(637.85,466,1,1,0,0,0,419.7,210);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#663300").s().p("EhePAuqMAFxgqmMC32AAAMAIfAqmgEhn1gudIgBgCIADgFIABgCIADgBIAJgCIAEAAIABACIAEAEIACACIABACQAAAHgEAFIgRADQgEgGgCgHg");
	this.shape.setTransform(615.3,421.375);

	this.instance_1 = new lib.blink("synched",0);
	this.instance_1.setTransform(556.45,387,0.9995,0.9995,0,0,0,24.4,52.1);

	this.instance_2 = new lib.blink("synched",0);
	this.instance_2.setTransform(669.95,386.15,0.9997,0.9997,0,0,0,23.7,51.3);

	this.instance_3 = new lib.tears();
	this.instance_3.setTransform(549.5,474.8,0.4889,0.3372,0,0,0,9.3,46.1);

	this.instance_4 = new lib.tears();
	this.instance_4.setTransform(528.95,450.15,0.8694,0.7691,0,0,180,9.2,46.1);

	this.instance_5 = new lib.tears();
	this.instance_5.setTransform(717.3,528.75,0.709,0.6302,0,0,180,9.2,46.3);

	this.instance_6 = new lib.sad_phone("synched",0);
	this.instance_6.setTransform(613.65,494.95,0.996,0.996,0,0,0,398.5,229.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#663300").s().p("EhjCAVTMAFxgqlMC31AAAMAIfAqlg");
	this.shape_1.setTransform(646.075,583.675);

	this.instance_7 = new lib.flower();
	this.instance_7.setTransform(174,477.55,1.1956,1.2249,0,0,0,27.1,46.8);

	this.instance_8 = new lib.flower();
	this.instance_8.setTransform(835.2,571.65,1,1,0,0,0,27,46.6);

	this.instance_9 = new lib.garbege_phone("synched",0);
	this.instance_9.setTransform(1236.2,389.15,1,1,0,0,0,242.6,97.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance,p:{startPosition:0}}]}).to({state:[{t:this.shape},{t:this.instance,p:{startPosition:27}},{t:this.instance_2},{t:this.instance_1}]},23).to({state:[]},21).to({state:[{t:this.shape_1},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]},91).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]},58).wait(153));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_טלפון_בהר_זבל = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// טלפון_בהר_זבל
	this.instance = new lib.stink();
	this.instance.setTransform(871.7,412.2,0.2165,0.2984,0,0,0,58.6,72.7);

	this.instance_1 = new lib.stink();
	this.instance_1.setTransform(584.2,291.3,0.2398,0.3643,0,0,0,58.8,72.5);

	this.instance_2 = new lib.fly();
	this.instance_2.setTransform(558.5,527.1,0.0762,0.0592,0,0,0,4.6,-16.9);

	this.instance_3 = new lib.fly();
	this.instance_3.setTransform(565,259,0.0994,0.0763,0,0,180,2.5,-17.1);

	this.instance_4 = new lib.fly();
	this.instance_4.setTransform(745.05,152.3,0.1148,0.0805,0,0,0,3.9,-16.1);

	this.instance_5 = new lib.mounten_garbege_phone2("synched",0);
	this.instance_5.setTransform(1206.25,347,0.4662,0.4808,0,0,0,134.1,90.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3.8,1,1).p("AlpwlQBPjnE2CaAg/R+QBEgDAtASQAfANAUAWAiHSwQAUgRAbgSQAMgIANgHQjykAifDEAC+SwQAPgTAOgQQB2iACABX");
	this.shape.setTransform(559.025,385.558);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(14,1,1).p("Ag2AOQAQgfAgAEQAZADAkAY");
	this.shape_1.setTransform(767.775,558.8077);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000033").ss(11.3,1,1).p("AhJAbQAEgJAHgIAgqgIQApgdBLAS");
	this.shape_2.setTransform(725.925,343.4171);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(11.3,1,1).p("AjHACQADAOADARAjohFQAVAWAKApADFA6QBRiUBiC8AAQBDQAghVCjAeAl3hSQBNgdAtAZ");
	this.shape_3.setTransform(772.175,355.0016);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(11.2,1,1).p("AHsFXQgSi4DBBKAndiaQAglQDEELQAchyD3CpQA7hdBoA9QBBAmBTBhAqaglQANibCRgW");
	this.shape_4.setTransform(622.6,244.6466);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(12.2,1,1).p("AyHrTQArjIDVBGANLNbQBLgrDSAhQAEABAFABQABAAAAABQADADAEADQAIAHAHAH");
	this.shape_5.setTransform(775.875,392.333);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(9.4,1,1).p("ABahLQAGgDAGgCQADgBADgBQALgCAKgDQA0gLBQApAkDBaQATi1DRBTQgBAoASghQATgpBKgc");
	this.shape_6.setTransform(632.35,304.3837);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(7.6,1,1).p("ACehJQAggPB2AZQAKACALADICZAvAD1hGQA1AJC4AyQhEggBFAZAjyAWQAAgBAAgBAjyAMQADgMAFgSAkUAMQAEgCAKgEAniBnQBDh+CYANQBCiRFjBSABYgXQAeggAogS");
	this.shape_7.setTransform(624.45,448.3087);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(8.5,1,1).p("AEchKQAoADAyAOAl1ASQAmgpA3gJAkAgjQB0gFC0BzABEBNQAUifCpAG");
	this.shape_8.setTransform(627.475,330.1141);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#333300").ss(14,1,1).p("AmymHQADgegNgXQAcACAMgbQANAgAlAYQARAMAYAJQABgCABgCQgXgLgUgGQg3gOgZAkQgPAWgGApQACAAACgBQAsgaB1geQgeADAHgKQALAEAMADQgKgFgLgGQCjjnEGHAQBAAIA2ALQBqAVBIAjQEMCCjWFBQgbApgbAiQg6BMg0AlAmUnVQAPgfgIhFQgYA6ARAqgAm8m8QgZgvhZgPAotn4QBJA7AoABAnHlCQABgEADgDQAPgiACgcAERIoQh5BAhPihQgWgwgUhDQmggwg6lRQiMivBlhYQAHgHAJgFQAGgEAFgE");
	this.shape_9.setTransform(779.7276,434.3725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(2,1,1).p("AIeotQgnADgLApAocBWIALgSIAFgIIASANICRBtIAKAHIALDcIAHCVAlvIuIgKifIgLjDIiZhxAkIEsIAFgBIBygsAh/EiIhtApIgXBjIgeCAAlIIuIAgiJIAeh9AiMEEIAOAY");
	this.shape_10.setTransform(822.85,504.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(0.1,0,0,3).p("Aj3h6IgCgbIAPgPIAIACIAyAoIATAEIgCgkIAJACQAKAHAJAFAhdiVIgBgUIAIACAg+ibIAHgRIAfAGIANgGIAXgGIANACABBi3IAVgDIAEAAQAIgEAAgBQANADABgDADGhFIAAAMIgWgFABPA2QAFAEAEADIAXgTIAIACQAFAHACAAQARgHAPAKQAGAEAFADIgCggIASAEQAJAGAAADADMAeIAAgGIAIACIAAAJQAKACgKgLIAbAFQADgTAKAIABbiDQAEAAAEADQAHgDAAgCIAdAGIAAgJIAKACACIg8IABAKIglgHIAAANIgHgBIAAAIAghheQAJgFAJgCQAIgCgBgEIAeAGQAXgEAFgWQAFADADABAiXhIIAQgIIANADIAKgdQARgJAOARIAhAHIgBgGQAFgEAAgDAgVgGQACgSASgGIAOADIAAAGIANACIAbAPIANACQADgDAAgDAhnBOIASgJIAJALIAAgNIBDANQAHADgDgLIAHgIIAJABIAAgCIAiAHACfB+IgHgCIAAAHIgUgEIAAAMQgGABgGgBIABAPIgggGQgEgLgFgDIAUAsIgOgDAAoCpIgUgEIAAALIgbgFQABAGAAACIgMgDIAAALIgWAGAD7BfQgagFgQAMQgRANABAWAiHAXQgCgWAagKQAagLAmAI");
	this.shape_11.setTransform(612.5687,412.1616);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CCCCCC").ss(12.2,1,1).p("Am0kNQBYgxGdgUQBnAXBsCwQBUCJBYDlQAEAJAIArAiXFTQgQklj4jwQgsgYAAgV");
	this.shape_12.setTransform(613.325,413.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#663300").ss(12.2,1,1).p("Aaxj4QAHADAGADAc3iHQAFAKAEAKQABAAgDAUQgFAigPBVASQNAIAAgIIANAAIMTAAAdyLEQAHAFAIAGQAEADAEAEA3oPwIDtAAIBZAAIUxAAIAAIiIAAABA6E3uQjcg/g6AxQgcAXAJAy");
	this.shape_13.setTransform(696.7103,404.8455);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,1,1).p("AgpABQAAgDACgDQAFgIALgFQALgFAOABQAPAAAOAGQADABABABAAqAAQgBAAAAACQgFAMgMAGQgNAFgSgCQgTgCgIgJIgBAA");
	this.shape_14.setTransform(622.275,248.7433);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#006600").ss(1.9,1,1).p("AgZADQACgBADAAQACAAABAAQADAAABgBQAAABAAgBIAEAAQABAAACgCAALgDIAFgBQACAAAEgBIAEgBAAQAAQgBAAgCAAQgCABAAAAIgFAAQgBACAAgBQgBABgBABQAAABAAABAAFgBIgDABQgBAAgBACQgCACAAADAAFgBQAAgBABAAIAFgBIgFAAQAAABAAAAAgSAGQAIgCACAAIAEgDQADgBAGgB");
	this.shape_15.setTransform(624.15,256.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#006600").ss(9.4,1,1).p("AAAADQAAgDABgD");
	this.shape_16.setTransform(624.575,276.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#663300").ss(9.4,1,1).p("AApgcQAGgCAFgCQAFgDAEgEQAFAAAFgBAhFAbQAAADAAADQAIAEAJAE");
	this.shape_17.setTransform(636.1,300.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#666600").ss(9.4,1,1).p("AhIgtQAFAtAZAwQAEAFABAFQAJAPAKAPAhJg2QArAeAxg/IA3CfIAAAD");
	this.shape_18.setTransform(632.825,290.0375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#006600").ss(11.2,1,1).p("AgujhQAoBYBABeQAyBJAQBqQgBAEABAOAhsjXQAjBZgoBkQgkBaBeCKAguDWQAEAGAFAG");
	this.shape_19.setTransform(632.8746,280.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#663300").ss(11.2,1,1).p("AB4hCQhugJgfBSQgGAbgKAQIgBAAIAAAAAhVBEQgQgDgTgL");
	this.shape_20.setTransform(541.9,247.5355);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#333300").ss(11.2,1,1).p("AirihIAmBoACsACQibA9iWh4QANCDBCBX");
	this.shape_21.setTransform(535.375,236.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#333300").ss(7.5,1,1).p("AFQnfQsEDwEGLjABLnzQnlDPBZMK");
	this.shape_22.setTransform(563.6368,185.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#333300").ss(11.3,1,1).p("AJVgkQi7k6kGhNQh7gjiJAQQhxANh6AwQkYCVgkGoQgEBwAZBsAJOG/QBnhlgnjCQgPhJgiheAgFEiQDXlzCfDvQCeDvh2A3");
	this.shape_23.setTransform(582.4962,179.8265);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#999999").ss(11.3,1,1).p("AjfifQBqhrBUgrQBpg1BJAvQAdASAYAiQBOBuAaEVAkqDrIgDAPAkHAuIgjC8AjfifIgiCyAjfifQCkDXDiA0QBBAPBGABIhYBkIg6BBIgrAxAjfifQDfgzCeCPQBQBGBAB5");
	this.shape_24.setTransform(693.275,170.1775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#663300").ss(11.3,1,1).p("AkohPQAHgCAHAAQAQgBARADACcBQQAphLBkA7AjbhFQA6AbA6BPQATg9BiBQQA6gfBIA5");
	this.shape_25.setTransform(678.925,203.8113);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FFCC66").ss(11.3,1,1).p("Al9oHIJOB5IhHDzIgOArAl9oHIiJBqIEdGKICZhBIiPG6IlKlQIBhlDAIfATIALC8IhbgSAgVBeIHkBfIhiE6ADqIIIjJgoAIfATIpYh1IlEmlAD+lyIEhGFAhQhUIA3Cu");
	this.shape_26.setTransform(750.525,303.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#663300").ss(16.9,1,1).p("AvWtoQgFgHgEgGQACgBAJgIAvft1QAAgBgBAAQgegmgUAMQgTAMBFAOAtvtRQhLhvgmBKAAMk4QAdABANAjABXi7QCHAxgOBaAmGpCQAzhNBOBmQCOgmBQD8AJoJ/QAtAAAoATQARAHAQAMQAsAdAjA2QEbBBg8BcAMtL4QAMATAMAX");
	this.shape_27.setTransform(750.6104,268.382);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(0.1,1,1).p("ABXiIQAFAJAEAIQAaAzAKAsQAGAaABAYQgBALAAAJQgEAjgRAdQgLATgSARQgJAIgKAHAhYBdQAAgBgBAAIAAAAQAAAAAAgBQgSgWgLgXQgTgpgBgrQAAhHAvgmQAGgFAGgDQASgMAUgEAA6ifQADABACABIAAAAQACAAABABQABABAAAAQALAFAFAHQADAEABADQACAGgCAFQgBAJgDgbQgCANgDALQgMAwgbAnQgZAjAIArQACARAIASQAbBAAKAQQgBADgCACQgLAKgcgHQgngJghgZAg7B9IAAAAQgBgCgBgBQgJgHgHgJAgxCEQgBgBgBAA");
	this.shape_28.setTransform(880.7747,459.003);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAYgTAiADIAIgFQAIgIAHgFQAYgMAhADQgCgMAAgIQABgHADgIIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCQAMgCAOAGQAUAHAKAUIABADQARAFAPAHIADAAQAbACAbARQAPAKANAMIADABQAXADASgLIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hzC9QB0CgBCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAPETLQgFgQADgOQACgPAHgLIADgEQAHgJALgEQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAIMTAAIsTAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgKgbAKgWQACgHAFgGQgGgQACgQQACgWAPgOQALgJAMgCIAAAAIgOgJQgXgPgLgXQgLgWADgXIAAgBIgRgJQgVgOgMgYQgKgRgBgSQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAFgSIAFgXQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAAGgBAEQgDAHgEAHIACACQAGgHAJgEQAMgDAOADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFQANAEAKALQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgAzrLsQgGALgKAHQgFAPgOAJQgJAGgKADIgIAJQgDAIgGAIQgEAGgHAGQAFAKADAMQADANABAOQAKgBAIgCQAGgZATgXQAOgOAUgOQAOgJAZgOQAdgPAQgDQAPgCAZAEIARADIAGABIAMADIAMAFQALACAJAFIgBgGQgCgJACgIQAAgJACgJIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOQADgNAJgKQAMgPAWgCQAWgDAVAKIAOAHQAHgGALgEQAOgGARADIAKACIACgCQAMgMAVgDQAUgCAVAJQATAJAQASQAQASAFAVIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQANgGAPADQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwQi5gyg0gKQA0AKC5AyIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQgggPAEAAQAEAAAZAJIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQgZgJgEAAQgEAAAgAPIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANQgHALgLAHIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAcgXAOQgOAHgSAAIgNAAQgNAEgPgBIgDACIgBAAIgCAEgAxFMJIAAgDIAAADgADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgAlwLnIAAAAgAlwLngAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgAquEJIAAAAg");
	this.shape_29.setTransform(709.5948,372.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("Ah6gdIAegyIDXCfg");
	this.shape_30.setTransform(770.225,417.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AA4GYQgWgwgUhDQmggxg6lQQiMiwBlhXQAHgHAJgGIALgHIAEgCIgEAHIAEgHQAsgaB1gdQgeADAHgKIACgEIAVALIgXgHIAXAHIgVgLQCjjnEGHAQBAAHA2ALQBqAWBIAjQEMCCjWFAQgbAqgbAiQg6BLg0AlQgFABgFADQgKAEgHAJQgjATgfAAQhNAAg5hzgAjqj6ID1BuIjXiggAnNnrQAcABAMgaQANAgAlAYQg3gPgZAkQADgegNgWg");
	this.shape_31.setTransform(781.4155,439.1181);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CCFF00").s().p("AhkCXIAgiIIAeh9IAHADIgFABIAFgBIBxgsIAFAFIAOAZIgBAFIhsApIgXBiIgeCAg");
	this.shape_32.setTransform(800.025,545.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FF9933").s().p("ABGD5IgKifIgMjDIiXhwIABgGIALgRIAFgIIASANICQBtIAJAGIALDcIAICVgABVh4gABMh+IAJACIAAAEg");
	this.shape_33.setTransform(779.05,535.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#660000").s().p("AgHAaQgDgDgCgEIgBgFQgBgIADgGQAEgHABgOQABgNAFAOIAHASIADAGQAEAJAAAEIAAACQgCADgGAEQgEACgCAAIgBAAQgDAAgDgCg");
	this.shape_34.setTransform(892.0125,461.7281);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFCC").s().p("AgvBIQgHgRgDgRQgHgrAYgjQAbgoANgwIAEgXQACAaACgIQABgGgBgGIAIARQAaAzALAsQAGAcAAAWIgBAVQgDAigRAeQgMASgRARIgTAPQgKgQgbhAgAAagDQgBANgEAHQgDAHABAIIABAGQACAEADACQADADAEAAQADAAAEgDQAGgDACgDIAAgDQAAgDgEgKIgDgHIgHgRQgDgHgBAAQgCAAgBAGg");
	this.shape_35.setTransform(888.7121,459.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#CC3333").s().p("AA1CpQgogJghgZIgBgBIgDgCIgBgBIAAgBQgCgDgCgBIgEgBIAAAAIgCgDQgJgHgIgJIgBgCIgJgKIAAgBIgBgBIgBAAIAAgBQgSgWgKgXQgUgpAAgrQgBhHAwgmIAMgIQARgMAVgEQAeAGAaADIArADIAEACIABAAIADABIABABQALAFAFAHQADAEABADQABAGgBAFQgCAJgCgbIgFAYQgNAwgbAnQgYAjAHArQADARAHASQAbBAAKAQIgDAFQgHAGgMAAQgJAAgKgDgAg9g7QALgpAngDQgnADgLApg");
	this.shape_36.setTransform(878.2372,459.003);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#990000").s().p("AgFA3IAJgCIAEgDIAKgDIgDACIgDACIgCAFIgHAAIgIgBgAAMAzIADgCIADgCIABgBIAGgBIAEgBIAGgBIAEgBIgEABIgGABIgEABIgGAAIAAABIgBABIgKADIgEADIgJACIgHgDIAFgBIAEAAIABAAIAAAAIAAAAIACgBIAAAAIAAAAIAAAAIADAAIADgDIgDADIgDAAIAAAAIAAAAIAAAAIgCABIAAAAIAAAAIgBAAIgEAAIgFABIgDgCIgCAAIgJgLQgCgRgEgOQgDgMgFgMIAAAAQAIAJAUACIAAAAIAJABIAAAAIABAAQAKAAAKgEIAAAAQANgGAEgMIABgCIgBACQgEAMgNAGIAAAAQgKAEgKAAIgBAAIAAAAIgJgBIAAAAQgUgCgIgJIAAAAIgGgLIgHgMQAEgSBKACIAFAMIgEgCQgOgGgPAAIgEgBIgBAAIAAAAQgLABgJADIgBABQgKAFgFAIQgCADAAAEQAAgEACgDQAFgIAKgFIABgBQAJgDALgBIAAAAIABAAIAEABQAPAAAOAGIAEACIAGAPQAGAMAKANQgCADAEAEIAAAAIgBABIgBACIAAANIABABQgBAKgDAJIgLAGQgLAGgJACIgCABIAAgCIACgCIAAAAIAAAAIAAAAIABgBIABAAIAEAAIACgBIADgBIgDABIgCABIgEAAIgBAAIgBABIAAAAIAAAAIAAAAIgCACIAAACIgGABIACgFgAATAuIAAAAgAATAtIAGAAIgGABIAAgBgAAZAtgAgogQgAAegrIAAAAg");
	this.shape_37.setTransform(622.825,251.6347);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#006600").s().p("AgnDlQgGgCgDgEIgDgDQgEgEgDgFIAAgDQgDgFADgHQAAgEACgCIgEAAQgKgDgHgJQgIgJACgKQABgFAEgEIgBAAIAAgBIgDgHQAAgGgEgIIgGgPIgCgMIgKgqQgBgHABgDIABgBIAAAAQgJgHgCgKQgCgJAFgGIABgBQgFgGAAgHQgBgHAEgFQAEgFAJgDIANgEIADgBIgBgGIABgCQAAgEABgOIABgVIAAgJIgEgNQgGgNgBgJQABgGADgHQAEgGAHgCIgKggIgGgMIgHgNQgCgHAEgHIACgCIgBAAIgDAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQgBAAAAgBQgDgCgBgCIgBgCIgCgBQgEAAgCgCIgCgEIgBgDIABAAIAEADIAHADQAHABAJgBIAGAAIACgBQAJgDAKgFQABAAAAAAQABABAAAAQABABAAAAQAAABABAAQABAEgBACQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAEgCABIgDABQAFADAFAGQADAHAFAMIAOAsQAHAAAGADQAGADAEAGQAFAFADAMIAJAfIABABIAFAFIAEAGIADAHIAFACQAHADADAGQAFAGABAHIAAAGQAFAFAEAFQAEAHAAAGIABABQADABAFACQAFADAEAFQAFAGADALQAIAgAEAVIAFARIADAMQAEAJACAMQAJACAGAIIADAKQgBAEABAOIgVAFIgKABQgFgCgFgGQgEgFgBgGIgBgDIgJgCQgEgFgBgJIgBgNIgGgOIgHgiIgJgjIgGgQIAAgIIgKACQgHACgVAJIgJACQAAAKgGAFQgGAEgGgBQgCADgDACQgIAGgLgEQgHgEgFgGIgCAEQgBAEgDADIgCABQgGADgHgCIgBAAIAAADIANA2IAEALQAEAJAEANIABABQADAAAEABQAGACAFAEIADAEQAEAEABAGIABAIQAAAGgDAFQAFAAAGACQAGAEAEAFIAAABQAFAGABAHQABAHgEAFQgDAGgFABIgHABIgGgBgABeCqIAGgCIAVgFQgCAEgEABIgDABQgFADgFAAIgIgCgABaCpIAKgBIgGACIgEgBg");
	this.shape_38.setTransform(633.15,279.2625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333300").s().p("AgBBaQgNgDgIgKQgFgGAAgIIgEAAQgIgDgEgFQgGgGgCgIIAAgEIAAgGQABgEACgDIgGgRQgEgJgEgGQgCgFgFgHQgHgJgBgDQgIgMAAgJQgEgGgCgGQgDgIADgGQACgGAGgDQAGgDAHACQAGACAHAFIANAKIAPAJQAIAEAEAGQADADABAEIABAAIATAKQAKAHAJABQAHADAQABIAAAAIABgCQgBgGADgEIACgDQAFgEAHAAQAFAAAGADQAFADAFAFQAEAEABAGQADAGgCAFQgBAFgDAEQgDACgGABIgDABIAAADQgCAGgHAIIgQAQIAAAAQAEAFACAGQADAGAAAGQgBAEgDAEQgEAFgGABIgFAAQgDAEgFAEQgNALgOAAIgIgBg");
	this.shape_39.setTransform(532.5963,243.4383);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFCC99").s().p("AERH8QgLgBgLgGIgCgBIgKgBQgQgDgMgMIgGgHQgDADgEABQgKAEgOgCIgMgGQgGADgHAAQgKABgJgEQgKgEgJgJQgKABgMgDQgNgFgJgKIgBgBQgEAEgGACQgKAEgMgEQgMgDgKgJQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQgFAAgFgCIgDgBQgJgEgIgJIgEgFQgGgIgEgJIgBgEIgEgBQgKgEgKgKIgBgBIgFABIgFABIgBABQgHAFgIACQgJABgKgDQgKgDgIgGIgCgCQgIACgIgCQgJgDgJgGIgEgDQgMgJgEgNQgFgMABgMQACgMAIgHIADgDIADgNIABgHQACgMAIgHIAFgPIAEgLQgFgMACgMQACgMAIgHQAFgEAGgBQABgTALgeQAEgMAFgGQgBgFABgFIAAgEQgBgLAFgIQgFgIgCgKQgBgNAFgKQAEgJAJgFIACAAQgCgEAAgDQgBgHADgFQADgFAGgCIAAAAIgBgCQgEgGAAgHQAAgHAEgEQAEgFAHAAQAHgBAGADQAGADAFAHQAFAGAAAHIAAAHIAGAIQADAHAAAGQgBAHgFAEQgCADgDABQAJAJAGAKIADAKQAGACAGAEIAEADIADAEQAFAEADAFIAGAMIF0BJIAFgDQAIgGAKABQAKAAAKAFQALAGAIAJQALAMABAPQACAPgHALQgEAFgEADQADAMgCAKQgDALgJAHIgGADQACAJAAAIQgBALgHAIQgEAEgFADIADAIQABAMgEAKQgEAJgIAFIgGACQAEAJABAKQAAALgGAJQgGAJgKACIgDABQAHANAAAMQgBAMgHAJQgHAJgMABQgKACgLgEIgEACQgJAFgLgBQgEAHgHAEQgIAFgJAAIgDAAgAjuEzQgMgEgJgKQgJgJgEgLQgDgJAAgJIgCgDIgEgKQgHgDgGgEIgPgQIg0g5QgHgIgGgEIgOgQIgDgCIgMgEQgLgFgJgJQgIgJgEgKIgLgIQgGgFgJgMIgNgRQgLgDgJgHQgKgIgGgKQgHgLAAgMQgBgKAFgJIACgCIADgLIAFgPIAGgPIAEgZIAGgYQAGgOACgIIADgJIADgIQAEgKAIgFIAEgBIAFgiIACgUIAEgVIADgWQACgLAEgHQAFgHAFACQAEAAADAEQACADABADIgBAEIAHALIAEAGIAGAFQAHAIAEAIIACAEIADADQAGAFAEAHIAFAJIAEAHIAJALIAEAGIA7BPIALAQIAEAEQAOAOAJAQIAEAHQACAEADADIALAJIAQASQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAABAAIAKgFIAOgGIAFgHQAMgUATgCQAKgBAKAEIAAgBQAIgCAEgCQAIgFAEACQADAAAFAEQAFAGABADQACAHgGAIIgEAFQADAFABAGQAFALgDAKQgBAGgEAHIgHAMIgMAXIgFALQAEANgCAOQgDAOgLAVIgaA1QgOAcgLAhIgCAHIAEAJQAEALgBAKQgCALgHAGQgHAIgKABIgGABQgIAAgIgEgAHxgFQgGgBgGgEIgGgIIgBAAQgEABgOgEQgMgEgdgGQgwgJgagCQgLgBgFgBQgIgCgGgEQgIgGgCgIIgwgDIgZgBIgVgEIgWgFIglgHIglgKQgXgJgMgDIg2gPIgPgDIgBACQgDAFgEACQgDACgGAAQgGgBgFgDQgFgEgEgFIgDgGIgBAAIgJgBQgGgBgHgFIgKgLQgQgQgHgJIgNgTIgSgVQgZgcgTgcQgFgGgXglQgRgbgNgPIgQgTIgQgUQgKgPAAgMIAAgBQgIgEgFgFQgGgGgDgJQgFgBgEgFQgEgEgCgGQgEAAgDgCQgGgCgEgGQgGgGgBgGQgBgHADgFQABgGAGgCQAEgDAIABQAGABAFAEQAGAEADAHIABABIABAAIAFACIAFgDQAHgCAFACQAHACANAHQAFADAIABQAEACAJACIAUACQANACAGACIASAEIASAFIBEAOIAEABQAHgEAMACIAMACQAHADAEAAIALABIALACIASAGQAKADAQABIAbADQAMADAHAFIAFAEIAaABQAKABAFABQAIADAFAEIABAAIAIgBQAQAAAIAFQAGACADAGQAFAFABAGQABAFgBAGQgCAFgEADQgEAEgHAAIgBAJIgCAJIgCAHIgEAQQgCAKgCAFIgEAKIgBAPIgHAVIgGATIgDAVIgIAcIgEALIAJABIAGAEQAAAAABAAQAAAAAAABQAAAAAAABQAAABAAABIgNArQAVgtACAAQAEgEAJACIADAAIABgFIADgWIAGgaQAEgUAEgKIAHgRQAFgNAEgZQADgcAFgLIAGgRIABgHIADgHQAFgJAKAAQAKABAIAJQAFAGACAHIACADIAHAQQACAEAIANIAfAzIAaAiIA1BEIAbAlIAhApQAKANACAJIAAADQAGgBAGADQAGADAEAFQAEAFACAHIABACQADABADADQAFADADAFQAEAGABAFQABAHgCAFQgDAGgFACQgDACgFAAIgEgBg");
	this.shape_40.setTransform(749.187,304.5535);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFCC66").s().p("AG9FaInkhfIgDgEIg4ivIiZBBIkcmJICIhqIFEGkIJZB2IAKC8g");
	this.shape_41.setTransform(752.275,287.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#999999").s().p("AASD3QgDgBgBgCIgCgCIgHgDIgMgFIgIgDQgDgCgEAAIgfgGIgNgCQgGgBgGACIgMAFQgHADgGgBQgFgCgCgDQgDgCgBgEIgBgBIgNgGIgigLIgOgCIgQgDIgMAAQgKACgGAAQgGAAgEgDQgDgDgBgFIgEgCQgIgEgFgGQgFgHgDgIIgDgFQgBgDgCgCIgFgDQgGgCgCgCQgDgCgBgEQgBgEACgCQADgDAFAAIAAgOIAAgCQAAgIADgFIgBgBIAki8IAAgBQgDgJABgFQgBgIAGgDIADgBIAIABIAHABIAAgBQgBgKADgDQACgCAEABIgBgEQgEgNABgMQABgNAGgKIAFgGQgDgCgBgEQgCgEABgFQAAgFACgDQACgEAFgEQACgCAAgDIAAgFQABgFADgCIAAgDQAAAAAAgBQAAgBAAAAQABgBAAAAQAAgBABAAQAEgFAHADIAGAEIADAHIAGAPIABABIACAAQADAAAFACQAFABADADQACABACADIACAGQABADAIAKIAFAHIAEADQAMAKAMAQIABgEQACgEAEABQAGABACAHIACAKIABABIAAABIACACIABgBQACgCAFABIAHAEQAFAFAGAKQAHAKARAJQAUALAGAGIAHAEIAEgCQAEgCAEAFQAFADADAFQAEABAFAEIAIAHIADAAQAEAAAHAFIATAMIAHAEIAfALQASAGAeAHIA5AOQAGABADABIAEADIAQAAIANACIAFABIAFABQADAAAEAEQACADAAAEIgCAGIgDAGIgHAGIgJAFQAEAEgBAFQAAACgEADIgEAEIgHABIgKABQACAHAAAIIgBAKIg6BBIgmAcIAAACQAAAGgDABIABABIgCAKIgBACQgDAKgJAAIABACQAEAEgBAEQAAAEgEABQgEABgFgCQgEgCgFgEIgGgEIgEgCIgCAAIgGAEIgLgBQgHgBgDACQgDABgFAEQgFAGgDABIgJACIgEAEQgCADgDAAQgFAAgBACIgEACIAAADQgDADgDAAIgEgBgAhjDRIABAAIgBAAgAkRBxIADgPgACLALIAAABIABgBIgBAAgAC4CXgADyBWQgDAPgKAOQgJAKgQAMIgIAFIgMAJgADyBWIAAAAg");
	this.shape_42.setTransform(690.4899,183.9233);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(0.1,0,0,3).p("Aj3h6IgCgbIAPgPIAIACIAyAoIATAEIgCgkIAJACQAKAHAJAFAhdiVIgBgUIAIACAg+ibIAHgRIAfAGIANgGIAXgGIANACABBi3IAVgDIAEAAQAIgEAAgBQANADABgDADGhFIAAAMIgWgFABPA2QAFAEAEADIAXgTIAIACQAFAHACAAQARgHAPAKQAGAEAFADIgCggIASAEQAJAGAAADADUAaIAAAJQAKACgKgLgADMAeIAAgGIAIACIAbAFQADgTAKAIABbiDQAEAAAEADQAHgDAAgCIAdAGIAAgJIAKACACIg8IABAKIglgHIAAANIgHgBIAAAIAghheQAJgFAJgCQAIgCgBgEIAeAGQAXgEAFgWQAFADADABAiXhIIAQgIIANADIAKgdQARgJAOARIAhAHIgBgGQAFgEAAgDAgVgGQACgSASgGIAOADIAAAGIANACIAbAPIANACQADgDAAgDAhnBOIASgJIAJALIAAgNIBDANQAHADgDgLIAHgIIAJABIAAgCIAiAHACfB+IgHgCIAAAHIgUgEIAAAMQgGABgGgBIABAPIgggGQgEgLgFgDIAUAsIgOgDAAoCpIgUgEIAAALIgbgFQABAGAAACIgMgDIAAALIgWAGAD7BfQgagFgQAMQgRANABAWAiHAXQgCgWAagKQAagLAmAI");
	this.shape_43.setTransform(612.5687,412.1616);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#663300").ss(11.2,1,1).p("AAHgJQgGAZgJAQIgBAAIAAABAg4AzQgQgDgTgLABcgyQhBgBgiAkQgPAPgJAX");
	this.shape_44.setTransform(539.0375,249.2618);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#333300").ss(11.2,1,1).p("ACRASQgdANghgBQgPAAgPgDQhGgOhZhGAiQihIAmBoQANCDBCBX");
	this.shape_45.setTransform(532.675,236.8);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#006600").ss(11.2,1,1).p("AgujVQAoBYBABeQAyBJAQBqAhsjLQAjBZgoBkQgkBaBeCK");
	this.shape_46.setTransform(632.8746,278.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(9.4,1,1).p("AkDBdQATi1CsBBQAkA6ASgiQATgpBVggQAGgDAGgCQADgCADgBQALgCgCgKQBAgDBQAp");
	this.shape_47.setTransform(632.35,304.1112);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#666600").ss(9.4,1,1).p("AhHgtQAFAtAZAwQAEAFABAFQAJAPAKAPAhIg2QArAeAxg/IArBlIAKAZ");
	this.shape_48.setTransform(632.7375,290.0375);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#006600").ss(1.9,1,1).p("AgZADQACgBADAAQACAAABAAQADAAABgBQAAABAAgBIAEAAQABAAACgCAAQAAQgBAAgCAAQgCABAAAAIgFAAQgBACAAgBQgBABgBABQAAABAAABAALgDIAFgBQACAAAEgBIAEgBAAFgBIgDABQgBAAgBACQgCACAAADAAFgBQAAgBABAAIAFgBIgFAAQAAABAAAAAgSAGQAIgCACAAIAEgDQADgBAGgB");
	this.shape_49.setTransform(624.15,256.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#333300").ss(11.3,1,1).p("AJVgZQi7k6kHhNQh7gjiJAQQhwANh6AwQkYCVgkGoQgEBwAZBsAJZG5QBbhUgmjCQgQhJgiheAA3DlQCbkrCeDvQCeDvh+gD");
	this.shape_50.setTransform(582.5425,178.7015);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#CCCCCC").ss(12.2,1,1).p("Am0jvQBYgxGdgUQBnAXBsCwQBUCIBYDmQAEAJAIArAi7EnQgTkcjujqQgDgCgDgDAmfikQgsgYAAgV");
	this.shape_51.setTransform(613.325,410.375);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(7.6,1,1).p("ABtg8QAUgQAXgLQAhgPB2AZQAKADAKACICZAvADwhUQA0AJC4AyQhEgfBFAZAjLhDQAWgWAigIQApgJA5ALQAmAHBZAmABtg8QARACATACQAyAIA6ANAlEgtQAAAAABAAQAugUBFgCQACAAADAAAlEgtIAAABQAFAEAEAHQAfgNAlgCQADgBADgBQANgEARgEQAEgFAEgEAj9gDQAOAHAQAKQACABADACAkNggQACACABACQADAHADAFQAEAIADAFAkNggQAAAAAAAAQADgIATgIAk4gbQARAEATAJIABAAQAHgBAIgBQAVgCAZgDAkNggQgCAEgBAFQACAAACAAQABgDABgCAkTgOQAKAFAMAGAlCgdQAFAAAFACAlCgdQADgDAEgBQABACACAEAlfgdQACgCACgBQACAAADAAQAJAAALADAnKBmQACgLACgJQAWhcA5gSQANgEAPAAQALgHAMgGAncAwIAAAAABTgkQAMgNAOgLAmAgbQAjgsAZAa");
	this.shape_52.setTransform(625.0375,449.6747);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#663300").ss(12.2,1,1).p("Aayj4QAGADAHADAc3iHQAFAKAEAKQABAAgDAUQgFAigOBVASdPvIBxAAIAAhkAUOPvIKiAAA3nPwIDsAAIBZAAIUyAAIAAIiIAAABA6D3uQjdg/g6AxQgcAXAKAy");
	this.shape_53.setTransform(696.6853,404.8455);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#333300").ss(14,1,1).p("AnCmHQADgegNgXQAcACAMgbQANAgAlAYQARAMAYAJQABgCABgCQgXgLgUgGQg3gOgZAkQgPAWgGApQACAAACgBQAsgaB1geQgeADAHgKQALAEAMADQgKgFgLgGQCjjnEGHAQBAAIA2ALQBqAVBIAjQA0AZAlAcQBSA8AJBHQABAHAAAIQABAxghA2QgFAGgEAHQiBC6hzBeQhpBWBTgjQAHgDAJgEAmknVQAPgfgIhFQgYA6ARAqgAnMm8QgZgvhZgPAo9n4QBJA7AoABAnXlCQABgEADgDQAPgiACgcAEBIoQh5BAhPihQgWgwgUhDQmggwg6lRQiMivBlhYQAHgHAJgFQAGgEAFgE");
	this.shape_54.setTransform(781.3378,434.3725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(12.2,1,1).p("AyKrcQAsjIDUBGAN7NuQAMgkA8gJQA6gJBpAQQAEABAFABQAAAAAAABQAEADAEADQAHAHANAZ");
	this.shape_55.setTransform(776.15,393.208);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(11.2,1,1).p("AHpFXQgSi4DBBKAngiaQAglQDEELQAPg+BDAlQA5AfBfBnQASgaARgUQBThbBhAiQA2A3BTBhAqXg4QAVAMgBgMQgCiKCFgU");
	this.shape_56.setTransform(622.9,244.6466);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#663300").ss(16.9,1,1).p("AvWtpQgFgHgEgGQACgBAJgIAvft2QAAgBgBAAQgegmgUAMQgTAMBFAOAAMk5QAdACANAiABXi8QCHAxgOBbAmGpDQAzhNBOBmQCOglBQD8AJoJ/QAtAAAoASQARAIAQALQAsAeAjA2QEbBBg8BbAMtL4QAMATAMAW");
	this.shape_57.setTransform(750.6104,268.406);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333300").s().p("AgBBaQgNgDgIgKQgFgGAAgIIgEAAQgIgDgEgFQgGgGgCgIIAAgEIAAgGQABgEACgDIgGgRQgEgJgEgGQgCgFgFgHQgHgJgBgDQgIgMAAgJQgEgGgCgGQgDgIADgGQACgGAGgDQAGgDAHACQAGACAHAFIANAKIAPAJQAIAEAEAGQADADABAEIABAAIATAKQAKAHAJABQAHADAQABIAAAAIABgCQgBgGADgEIACgCIAAgBQAFgEAHAAQAFAAAGADIAHAFIADADQAEAEABAGQADAGgCAFQgBAFgDAEQgDACgGABIgDABIAAADQgCAGgHAIIgQAQIAAAAIAFAHIABAEQADAGAAAGQgBAEgDAEQgEAFgGABIgFAAQgDAEgFAEIgCABQAJgXAQgQQgQAQgJAXQgMAKgNAAIgIgBgABUgjQgPAAgPgDQAPADAPAAg");
	this.shape_58.setTransform(532.5963,243.4386);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#006600").s().p("AgnDlQgGgCgDgEIgDgDQgBAAgYAFQAUgKgCgEIAAgDQgDgFADgHQAAgEACgCIgEAAQgKgDgHgJQgIgJACgKQABgFAEgEIgBAAIAAgBIgDgHQAAgGgEgIIgGgPIgCgMIgKgqQgBgHABgDIABgBIAAAAQgJgHgCgKQgCgJAFgGIABgBQgFgGAAgHQgBgHAEgFQAEgFAJgDIANgEIADgBIgBgGIABgCQAAgEABgOIABgVIAAgJIgEgNQgGgNgBgJQABgGADgHQAEgGAHgCIgKggIgGgMIgHgNQgCgHAEgHIACgCIgBAAIgDAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQgBAAAAgBQgDgCgBgCIgBgCIgCgBQgEAAgCgCIgCgEIgBgDIABAAIAEADIAHADQAHABAJgBIAGAAIACgBQAJgDAKgFQABAAAAAAQABABAAAAQABABAAAAQAAABABAAQABAEgBACQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAEgCABIgDABQAFADAFAGQADAHAFAMIAOAsQAHAAAGADQAGADAEAGQAFAFADAMIAJAfIABABIAFAFIAEAGIADAHIAFACQAHADADAGQAFAGABAHIAAAGQAFAFAEAFQAEAHAAAGIABABQADABAFACQAFADAEAFQAFAGADALQAIAgAEAVIAFARIADAMQAEAJACAMQAJACAGAIIADAKQgBAEgLAHQAKALgEABIgDABQgFADgFAAIgIgCIAGgCQAJgCAAgHIAAgDIAAADQAAAHgJACIgGACIgEgBQgFgCgFgGQgEgFgBgGIgBgDIgFgBIgKgYIAAgEIgGgOIgHgiIgJgjIgGgQIAAgIIgKACQgHACgVAJIgJACQAAAKgGAFQgGAEgGgBQgCADgDACQgIAGgLgEQgHgEgFgGIgCAEQgBAEgDADIgCABQgGADgHgCIgBAAIAAADIANA2IAEALQAEAJAEANIABABQADAAAEABQAGACAFAEIADAEQAEAEABAGIABAIQAAAGgDAFQAFAAAGACQAGAEAEAFIAAABQAFAGABAHQABAHgEAFQgDAGgFABIgHABIgGgBgABBCRQgEgFgBgJIgBgJIAKAYgAA7B6g");
	this.shape_59.setTransform(633.15,279.2625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#990000").s().p("AgFA3IAJgCIAEgDIAKgDIgDACIgDACIgCAFIgHAAIgIgBgAAMAzIADgCIADgCIABgBIgBABIgKADIgEADIgJACIgHgDIAFgBIAEAAIABAAIAAAAIAAAAIACgBIAAAAIAAAAIAAAAIADAAIADgDIgDADIgDAAIAAAAIAAAAIAAAAIgCABIAAAAIAAAAIgBAAIgEAAIgFABIgDgCIgCAAIgJgLQgCgRgEgOQgDgMgFgMIAAAAQAIAJAUACIAAAAIAJABIAAAAIABAAQAKAAAKgEIAAAAQANgGAEgMIABgCIgBACQgEAMgNAGIAAAAQgKAEgKAAIgBAAIAAAAIgJgBIAAAAQgUgCgIgJIAAAAIgGgLIgHgMQAEgSBKACIAFAMIgEgCQgOgGgPAAIgEgBIgBAAIAAAAQgLABgJADIgBABQgKAFgFAIQgCADAAAEQAAgEACgDQAFgIAKgFIABgBQAJgDALgBIAAAAIABAAIAEABQAPAAAOAGIAEACIAGAPQAGAMAKANQgCADAEAEIAAAAIgBABIgBACIAAANIABABQgBAKgDAJIgLAGQgLAGgJACIgCABIAAgCIACgCIAAAAIAAAAIAAAAIABgBIABAAIAEAAIACgBIADgBIgDABIgCABIgEAAIgBAAIgBABIAAAAIAAAAIAAAAIgCACIAAACIgGABIACgFgAATAuIAGgBIAEgBIAGgBIAEgBIgEABIgGABIgEABIgGAAIAAABIAAAAgAATAtIAGAAIgGABIAAgBgAAZAtgAgogQgAAegrIAAAAg");
	this.shape_60.setTransform(622.825,251.6347);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AAoGYQgWgwgThDQmhgxg6lQQiMiwBlhXQAHgHAJgGIALgHIAEgCIgEAHIAEgHQAsgaB1gdIgVgLIAVALIgXgHIACgEQCjjnEGHAQBAAHA2ALQBqAWBIAjQA0AZAlAbIABADQANAXAVAOIARAKIgBAAQgCAXAKAWQALAVAVAPIABAQIgHAFQgPAOgDAWQgCAQAGAQQgEAGgDAHQgDAIgBAIIgJAOQiBC5hzBeQhpBXBTgkQgGAEgFAGQgjATgfAAQhNAAg5hzgAj6j6ID2BuIjYiggAlam3IAXAHIgMABQgQAAAFgIgAlDmwIAAAAgAlDmwIAAAAgAndnrQAcABAMgaQANAgAlAYQg3gPgZAkQADgegNgWg");
	this.shape_61.setTransform(783.0255,439.1181);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAPgLASgEQAJgBAJAAIAHAAIAIgFQAIgIAHgFQAYgMALgVQAUACABgCIADgLIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCIADgBQALAAAMAFQAUAHAKAUIABADQARAFAPAHIADAAQAbACAbARQAPAKANAMIADABIAOAAQAOAAANgIIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hMFJQBNAUBCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAcvUvIqiAAgASNUvIAAhkIAABkIhxAAIBxAAgAPETLQgFgQADgOQACgPAHgLIADgEQAFgGAGgEIAHgDQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgHgRACgQQABgJAEgHQACgHAFgGQgGgQACgQQACgWAPgOIAIgGQAHgEAIgBIAAAAIgOgJIgCgBQgJhHhTg9QgIgRgBgQQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAPZSFIAQgHIgQAHgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAKAAIAAgpQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAADAPALQAJgCALADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFIABAAQAMAFAKAKQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAYVQ5QAMgjA7gKQg7AKgMAjgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgA0pNaQAJgBALgIIACABQAeAHAAgIQAHACgcgLIADgFIABgBIACgBQANgOATgNQADgCgKgQQAKACAIgFQAIgGAVgKQAVgKAQADIAcADIATACIARADIAGABIAMADIAAAAIAMAFIAMADIAGADIACABIgBgGIgBgIIABgJQAAgJACgIIAAgBIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOIAAgBIADgJQADgHAGgGQAMgPAWgCQAJgBAKABQAMACAMAFIAOAHQAHgGALgEQAOgGARADIAKACIABgBIABgBQAMgMAVgDQAUgCAVAJQATAJAQASIAKAOIAHANIAEAMIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQAGgDAGgBQAIAAAIABQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwQi5gyg0gKQA0AKC5AyIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQgggPAEAAQAEAAAZAJIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQgZgJgEAAQgEAAAgAPIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANIgDAEIgGgGIAGAGQgHAIgIAGIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAUgMAMIAAABIgBgBQgJgJgKAAIgBAAIAAAAQgRAAgTAYIgBABIgBAAIAAABIgBABQgLADgNgBIgDACIgBAAIgCAEQgGALgKAHQgDAHgEAGIgCADIgJAHIgBABQgJAGgKADIgIAJIAAAAIAAAAIABAAQABABAIgDIgHAGIAAAAIgEAEIAAAAIALAHIgHAFIgGgCIgGgCIgDAIIgDALIAAABIAAABIAAACIADALQADANABgBQAKAPgCgbgA0XNmIAEgUIgEAUgATsMtQAhg1AAgwIAAgCIAAACQAAAwghA1gApQLcQg6gNgygIQAyAIA6ANgAr/LNQhaglglgIQAlAIBaAlgAwhLFIAIgJQAXgWAigIQgiAIgXAWIgFAAIAFAAIgIAJgADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgA3l06IAAAAIAAAAQAAAGgFAAQgGAAgKgGQAKAGAGAAQAFAAAAgGgAt010QARgaASgUQgSAUgRAaQhghng5ggQA5AgBgBnIAAAAgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgAlwLnIAAAAgAlwLngAzMLjIAAgBIABAAIABgBQATgYARAAIAAAAIABAAQAKAAAJAJIABABIAAgBIAAABIAAAAIAAAAQgFAFgGAEIgIADIgEAAQAKgHANgFQgNAFgKAHIgBAAIgBAAQgNAAgMAEIgBAAIgBAAIgEAAIgEABIABgBgAzFLjIABAAIABAAQAMgEANAAIABAAIABAAIgFADQgHABgIAAIgJAAgAyoLfIAEAAIgJADIAFgDgAyoLfIAAAAgAyRLTgAyRLSIAAAAgAwZK8IAAAAgATsKSQgLgWADgXIAAgBIgRgJQgVgOgMgYIgCgCQBTA9AJBHQgVgPgLgWgAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgASwIzIAAAAgAquEJIAAAAg");
	this.shape_62.setTransform(709.5948,372.85);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#333300").ss(7.5,1,1).p("ABLnzQnlDPBZMKAFQnfQsEDwEGLj");
	this.shape_63.setTransform(563.6368,185.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(3.8,1,1).p("AlpwlQBPjnE2CaAiHSwQAUgRAbgSQAMgIANgHQBEgDAtASQAfANAUAWAC+SwQAPgTAOgQQB2iACABXAg/R+QjykAifDE");
	this.shape_64.setTransform(559.025,385.558);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#333300").ss(11.2,1,1).p("AirihIAmBoQANCDBCBXACsACQibA9iWh4");
	this.shape_65.setTransform(535.375,236.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#006600").ss(1.9,1,1).p("AgZADQACgBADAAQACAAABAAQADAAABgBQAAABAAgBIAEAAQABAAACgCAALgDIAFgBQACAAAEgBIAEgBAAQAAQgBAAgCAAQgCABAAAAIgFAAQgBACAAgBQgBABgBABQAAABAAABAAFgBIgDABQgBAAgBACQgCACAAADAALgDIgFAAQAAABAAAAgAAFgBQAAgBABAAAgSAGQAIgCACAAIAEgDQADgBAGgB");
	this.shape_66.setTransform(624.15,256.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").ss(7.6,1,1).p("ACehJQAggPB2AZQAKACALADICZAvQhEggBFAZAD1hGQA1AJC4AyAjyAWQAAgBAAgBAjyAMQADgMAFgSAkUAMQAEgCAKgEAniBnQBDh+CYANQBCiRFjBSABYgXQAeggAogS");
	this.shape_67.setTransform(624.45,448.3087);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(2,1,1).p("AIeotQgnADgLApAocBWIALgSIAFgIIASANICRBtIAKAHIALDcIAHCVAlvIuIgKifIgLjDIiZhxAkIEsIAFgBIBygsAlIIuIAgiJIAeh9Ah/EiIhtApIgXBjIgeCAAiMEEIAOAY");
	this.shape_68.setTransform(822.85,504.425);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#663300").ss(12.2,1,1).p("Abpj4QAHADAGADAdviHQAFAKAEAKQABAAgDAUQgFAigPBVA2wPwIDtAAIBZAAIUxAAIAAIiIAAABA5M3uQjcg/g6AxQgcAXAJAy");
	this.shape_69.setTransform(691.1183,404.8455);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#333300").ss(14,1,1).p("AmymHQADgegNgXQAcACAMgbQANAgAlAYQg3gOgZAkgAk3mMQgXgLgUgGQARAMAYAJQABgCABgCQCjjnEGHAQBAAIA2ALQBqAVBIAjQEMCCjWFBQgbApgbAiQg6BMg0AlAmUnVQAPgfgIhFQgYA6ARAqgAkimBQgeADAHgKQALAEAMADQgKgFgLgGAotn4QBJA7AoABQgZgvhZgPAnHlIQACAAACgBQAPgiACgcQgPAWgGApgAnHlCQABgEADgDQAsgaB1geAERIoQh5BAhPihQgWgwgUhDQmggwg6lRQiMivBlhYQAHgHAJgFQAGgEAFgE");
	this.shape_70.setTransform(779.7276,434.3725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#FFCC66").ss(11.3,1,1).p("Al9oHIJOB5IhHDzIgOArAl9oHIiJBqIEdGKICZhBIiPG6IlKlQIBhlDAIfATIALC8IhbgSIhiE6ADqIIIjJgoAgVBeIHkBfAhQhUIA3CuAD+lyIEhGFIpYh1IlEml");
	this.shape_71.setTransform(750.525,303.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#663300").ss(16.9,1,1).p("AvxtzQgGgHgDgGQACgBAJgIAgOlDQAcABAMAjAA8jGQCHAxgOBbAmipNQAzhNBPBmQCNgmBQD9AJMJ1QAuAAAoASQARAIAQALQArAeAjA1QAMAUANAWAMRLtQEcBBg8Bc");
	this.shape_72.setTransform(753.374,269.45);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#999999").ss(11.3,1,1).p("AjfifQBqhrBUgrQBpg1BJAvQAdASAYAiQBOBuAaEVIhYBkIg6BBIgrAxAkqDrIgDAPAkHAuIgjC8AjfifIgiCyAjfifQCkDXDiA0QBBAPBGABAjfifQDfgzCeCPQBQBGBAB5");
	this.shape_73.setTransform(693.275,170.1775);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#990000").s().p("AgFA3IAJgCIAEgDIAKgDIgDACIgDACIgCAFIgHAAIgIgBgAAMAzIADgCIADgCIABgBIAGgBIAEgBIAGgBIAEgBIgEABIgGABIgEABIgGAAIAAABIgBABIgKADIgEADIgJACIgHgDIAFgBIAEAAIABAAIAAAAIAAAAIACgBIAAAAIAAAAIAAAAIADAAIADgDIgDADIgDAAIAAAAIAAAAIAAAAIgCABIAAAAIAAAAIgBAAIgEAAIgFABIgDgCIgCAAIgJgLQgCgRgEgOQgDgMgFgMIAAAAQAIAJAUACIAAAAIAJABIAAAAIABAAQAKAAAKgEIAAAAQANgGAEgMIABgCIgBACQgEAMgNAGIAAAAQgKAEgKAAIgBAAIAAAAIgJgBIAAAAQgUgCgIgJIAAAAIgGgLIgHgMQAEgSBKACIAFAMIgEgCQgOgGgPAAIgEgBIgBAAIAAAAQgLABgJADIgBABQgKAFgFAIQgCADAAAEQAAgEACgDQAFgIAKgFIABgBQAJgDALgBIAAAAIABAAIAEABQAPAAAOAGIAEACIAGAPQAGAMAKANQgCADAEAEIAAAAIgBABIgBACIAAANIABABQgBAKgDAJIgLAGQgLAGgJACIgCABIAAgCIACgCIAAAAIAAAAIAAAAIABgBIABAAIAEAAIACgBIADgBIgDABIgCABIgEAAIgBAAIgBABIAAAAIAAAAIAAAAIgCACIAAACIgGABIACgFgAATAtIAGAAIgGABIAAgBgAAZAtgAgogQgAAegrIAAAAg");
	this.shape_74.setTransform(622.825,251.6347);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AA4GYQgWgwgUhDQmggxg6lQQiMiwBlhXQAHgHAJgGIALgHIAEgCIgEAHIAEgHQAsgaB1gdIgVgLQCjjnEGHAQBAAHA2ALQBqAWBIAjQEMCCjWFAQgbAqgbAiQg6BLg0AlQgFABgFADQgKAEgHAJQgjATgfAAQhNAAg5hzgAjqj6ID1BuIjXiggAlKm3IACgEIAVALIgXgHIAXAHIgMABQgQAAAFgIgAkzmwIAAAAgAnNnrQAcABAMgaQANAgAlAYQg3gPgZAkQADgegNgWg");
	this.shape_75.setTransform(781.4155,439.1181);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAYgTAiADIAIgFQAIgIAHgFQAYgMAhADQgCgMAAgIQABgHADgIIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCQAMgCAOAGQAUAHAKAUIABADQARAFAPAHIADAAQAbACAbARQAPAKANAMIADABQAXADASgLIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hHDpQBIB0BCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAPETLQgFgQADgOQACgPAHgLIADgEQAHgJALgEQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgKgbAKgWQACgHAFgGQgGgQACgQQACgWAPgOQALgJAMgCIAAAAIgOgJQgXgPgLgXQgLgWADgXIAAgBIgRgJQgVgOgMgYQgKgRgBgSQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAFgSIAFgXQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAAGgBAEQgDAHgEAHIACACQAGgHAJgEQAMgDAOADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFQANAEAKALQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgAzrLsQgGALgKAHQgFAPgOAJQgJAGgKADIgIAJQgDAIgGAIQgEAGgHAGQAFAKADAMQADANABAOQAKgBAIgCQAGgZATgXQAOgOAUgOQAOgJAZgOQAdgPAQgDQAPgCAZAEIARADIAGABIAMADIAMAFQALACAJAFIgBgGQgCgJACgIQAAgJACgJIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOQADgNAJgKQAMgPAWgCQAWgDAVAKIAOAHQAHgGALgEQAOgGARADIAKACIACgCQAMgMAVgDQAUgCAVAJQATAJAQASQAQASAFAVIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQANgGAPADQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQg5gbA6AVIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQg6gVA5AbIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANQgHALgLAHIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAcgXAOQgOAHgSAAIgNAAQgNAEgPgBIgDACIgBAAIgCAEgAxFMJIAAgDIAAADgAlwLnQi5gyg0gKQA0AKC5AygADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgA4gT9IAAAAgAlwLngAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgAquEJIAAAAg");
	this.shape_76.setTransform(709.5948,372.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").ss(0.1,0,0,3).p("AhdiVIgBgUIAIACAj3h6IgCgbIAPgPIAIACIAyAoIATAEIgCgkIAJACQAKAHAJAFAg+ibIAHgRIAfAGIANgGIAXgGIANACABBi3IAVgDIAEAAQAIgEAAgBQANADABgDADGhFIAAAMIgWgFABPA2QAFAEAEADIAXgTIAIACQAFAHACAAQARgHAPAKQAGAEAFADIgCggIASAEQAJAGAAADADMAeIAAgGIAIACIAAAJQAKACgKgLIAbAFQADgTAKAIABbiDQAEAAAEADQAHgDAAgCIAdAGIAAgJIAKACACIg8IABAKIglgHIAAANIgHgBIAAAIAiXhIIAQgIIANADIAKgdQARgJAOARIAhAHIgBgGQAFgEAAgDAghheQAJgFAJgCQAIgCgBgEIAeAGQAXgEAFgWQAFADADABAgVgGQACgSASgGIAOADIAAAGIANACIAbAPIANACQADgDAAgDAhnBOIASgJIAJALIAAgNIBDANQAHADgDgLIAHgIIAJABIAAgCIAiAHACfB+IgHgCIAAAHIgUgEIAAAMQgGABgGgBIABAPIgggGQgEgLgFgDIAUAsIgOgDAAoCpIgUgEIAAALIgbgFQABAGAAACIgMgDIAAALIgWAGAD7BfQgagFgQAMQgRANABAWAiHAXQgCgWAagKQAagLAmAI");
	this.shape_77.setTransform(612.5687,412.1616);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#333300").ss(11.3,1,1).p("AJVgiQi7k6kGhMQh7gkiJAQQhxAOh6AvQkYCWgkGoQgEBwAZBsAJOHBQBnhkgnjCQgPhJgihfAgFElQDXl0CfDvQCeDwiDgH");
	this.shape_78.setTransform(582.4962,179.5515);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#000000").ss(7.6,1,1).p("ACehJQAggPB2AZQAKACALADICZAvAD1hGQA1AJC4AyQhEggBFAZAjyAMQADgMAFgSAjyAWQAAgBAAgBAkUAMQAEgCAKgEAniBnQBDh+CYANQBCiRFjBSABYgXQAeggAogS");
	this.shape_79.setTransform(624.45,448.3087);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(11.2,1,1).p("AHsFXQgSi4DBBKAndiaQAglQDEELQAahqDBCPQAQAMARAOQAAgBAAAAQBShkBoA9QBBAmBTBhAqaglQANibCRgW");
	this.shape_80.setTransform(622.6,244.6466);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#663300").ss(16.9,1,1).p("Av6uAQACgBAJgIAgOlDQAcABAMAjAA8jGQCHAxgOBbAmipNQAzhNBPBmQCNgmBQD9AJMJ1QAuAAAoASQARAIAQALQArAeAjA1QEcBBg8BcAMRLtQAMAUANAW");
	this.shape_81.setTransform(753.374,269.45);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AA4GYQgWgwgUhDQmggxg6lQQiMiwBlhXQAHgHAJgGIALgHIAEgCIgEAHIAEgHQAsgaB1gdIgVgLIAVALIgXgHIACgEQCjjnEGHAQBAAHA2ALQBqAWBIAjQEMCCjWFAQgbAqgbAiQg6BLg0AlQgFABgFADQgKAEgHAJQgjATgfAAQhNAAg5hzgAjqj6ID1BuIjXiggAlKm3IAXAHIgMABQgQAAAFgIgAkzmwIAAAAgAkzmwIAAAAgAnNnrQAcABAMgaQANAgAlAYQg3gPgZAkQADgegNgWg");
	this.shape_82.setTransform(781.4155,439.1181);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAYgTAiADIAIgFQAIgIAHgFQAYgMAhADQgCgMAAgIQABgHADgIIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCQAMgCAOAGQAUAHAKAUIABADQARAFAPAHIADAAQAYACAYAOIAGADQAPAKANAMIAAAAIADABQAXADASgLIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hhEdQBiBABCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAPETLQgFgQADgOQACgPAHgLIADgEQAHgJALgEQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgKgbAKgWQACgHAFgGQgGgQACgQQACgWAPgOQALgJAMgCIAAAAIgOgJQgXgPgLgXQgLgWADgXIAAgBIgRgJQgVgOgMgYQgKgRgBgSQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAFgSIAFgXQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAAGgBAEQgDAHgEAHIACACQAGgHAJgEQAMgDAOADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFQANAEAKALQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgAzrLsQgGALgKAHQgFAPgOAJQgJAGgKADIgIAJQgDAIgGAIQgEAGgHAGQAFAKADAMQADANABAOQAKgBAIgCQAGgZATgXQAOgOAUgOQAOgJAZgOQAdgPAQgDQAPgCAZAEIARADIAGABIAMADIAMAFQALACAJAFIgBgGQgCgJACgIQAAgJACgJIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOQADgNAJgKQAMgPAWgCQAWgDAVAKIAOAHQAHgGALgEQAOgGARADIAKACIACgCQAMgMAVgDQAUgCAVAJQATAJAQASQAQASAFAVIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQANgGAPADQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwQi5gyg0gKQA0AKC5AyIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQgggPAEAAQAEAAAZAJIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQgZgJgEAAQgEAAAgAPIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANQgHALgLAHIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAcgXAOQgOAHgSAAIgNAAQgNAEgPgBIgDACIgBAAIgCAEgAxFMJIAAgDIAAADgADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgAti2iIAAgBIAAABIgigaIAiAaIAAAAgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgAlwLnIAAAAgAlwLngAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgAquEJIAAAAg");
	this.shape_83.setTransform(709.5948,372.85);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#333300").ss(11.3,1,1).p("AJVgiQi7k6kGhMQh7gkiJAQQhxAOh6AvQkYCWgkGoQgEBwAZBsAJOHBQBnhkgnjCQgPhJgihfAgFElQDXl0CfDvQCeDwhbgR");
	this.shape_84.setTransform(582.4962,179.5515);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#000000").ss(7.6,1,1).p("ACehJQAggPB2AZQAKACALADICZAvQhEggBFAZAD1hGQA1AJC4AyAjyAMQADgMAFgSAjyAWQAAgBAAgBAkUAMQAEgCAKgEAniBnQBDh+CYANQBCiRFjBSABYgXQAeggAogS");
	this.shape_85.setTransform(624.45,448.3087);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#663300").ss(16.9,1,1).p("AvUt/QgJAIgCABQAAgBgBAAQgegmgUAMQgTAMBFAOAAMk5QAdACANAiABXi8QCHAxgOBbAmGpDQAzhNBOBmQCOglBQD8AJoJ/QAtAAAoASQARAIAQALQAsAeAjA2QEbBBg8BbAMtL4QAMATAMAW");
	this.shape_86.setTransform(750.6104,268.406);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAYgTAiADIAIgFQAIgIAHgFQAYgMAhADQgCgMAAgIQABgHADgIIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCQAMgCAOAGQAUAHAKAUIABADQARAFAPAHIADAAQAbACAbARQAPAKANAMIADABQAXADASgLIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hHDgQBIB9BCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAPETLQgFgQADgOQACgPAHgLIADgEQAHgJALgEQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgKgbAKgWQACgHAFgGQgGgQACgQQACgWAPgOQALgJAMgCIAAAAIgOgJQgXgPgLgXQgLgWADgXIAAgBIgRgJQgVgOgMgYQgKgRgBgSQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAFgSIAFgXQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAAGgBAEQgDAHgEAHIACACQAGgHAJgEQAMgDAOADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFQANAEAKALQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgAzrLsQgGALgKAHQgFAPgOAJQgJAGgKADIgIAJQgDAIgGAIQgEAGgHAGQAFAKADAMQADANABAOQAKgBAIgCQAGgZATgXQAOgOAUgOQAOgJAZgOQAdgPAQgDQAPgCAZAEIARADIAGABIAMADIAMAFQALACAJAFIgBgGQgCgJACgIQAAgJACgJIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOQADgNAJgKQAMgPAWgCQAWgDAVAKIAOAHQAHgGALgEQAOgGARADIAKACIACgCQAMgMAVgDQAUgCAVAJQATAJAQASQAQASAFAVIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQANgGAPADQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQg5gbA6AVIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQg6gVA5AbIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANQgHALgLAHIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAcgXAOQgOAHgSAAIgNAAQgNAEgPgBIgDACIgBAAIgCAEgAxFMJIAAgDIAAADgAlwLnQi5gyg0gKQA0AKC5AygADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgA4gT9IAAAAgAlwLngAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgAquEJIAAAAg");
	this.shape_87.setTransform(709.5948,372.85);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#663300").ss(16.9,1,1).p("Av6t1QAAgBgBAAQAmhKBLBvAv6t1QACgBAJgIAvxtoQgFgHgEgGAgOk4QAcABANAjAA8i7QCHAxgOBaAmhpCQAzhNBOBmQCOgmBQD8AJNJ/QAtAAAoATQARAHAQAMQAsAdAjA2QAMATAMAXAMSL4QEbBBg8Bc");
	this.shape_88.setTransform(753.324,268.382);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#663300").s().p("EggbAdTIAAnGIghAAIAAlSIAKgkIAJggIACgIQgFgDgCgOQgKh/ADhBQAAgJADgDQAFgJAHAEQADgNgCgVIgFghQgCgSABgnQABhPgMhOQgBgQADgFQACgEAFgCQAFgDAEADIACACQgJhUgRiLIAAraIACgBQAGgGAGgEQgGgagHgMIgBgCIAAleQAChSAFguQAEgjAAgNQABgJgCgUIAAgeQABgOAEgLQAFgTANgOIAKgKQAdgcArgEQApgEAmASQAPAHAMAKQAHgCAIAAQAbgBAeAOIAKAGIAUgJIAXgJIAvgSIABAAIAAAAIAogOQABgKADgJQAHgXARgNQAYgTAiADIAIgFQAIgIAHgFQAYgMAhADQgCgMAAgIQABgHADgIIAFgPQAJgXAEgGQAFgHAMgLQATgPAIgJIAKgMQAHgHAFgEQAKgFANAAQAOABALAHQAOAJALAQQAHALAFALQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABgBIgBgCQgCgMAEgNIAHgWQAFgQADgJIAFgOQAEgJABgHQABgEgBgUQAAgIADgOQADgYAIgIQAIgIANgBQANAAAOAFQALAEAPAIIAZAQIARAKIAQALQAJAJAIAPQAFAHAHASIACAHQALgBAOACIAIACIABgFQAKgOAXgCIAEgHQAHgKANgCQAMgCAOAGQAUAHAKAUIABADQARAFAPAHIADAAQAbACAbARQAPAKANAMIADABQAXADASgLIAOgLQAJgIAGgDQAWgMAjALQAWAHAlAVIAoAXQAjATARAOQAcAYALAXIAFAQIABAAQAEABAJAAQgDgMgCgLQgCgQAEgQIABgFIgHgGIgggZQgXgVgOgbIgDgBIgEgCIgDgEIgBgFIABgBIgCAAQgJgBgEgFQgCgDgBgEIACgFQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAEgCAFABQgFgRAAgQQACgdARgXQAIgJAKgHIgBgHQABgXAIgRQAIgQAPgLIAAhfIAAgEQAAgGACgEQgEAAgEgDQgJgGgBgOQAAgLgBgFIgDgNIgDgMQgBgGAEgGQADgGAGAAQAFAAAIAEQAIAGAFgBQAAgKAHgFQAEgCAEgBQAFAAADADQAFAFAAANIAAAlQgBATgFAFQgDAGgHACQgHABgEgEIgCACQACABAEAEQAHAJAEAMQAFARAAAXIgBAHIABAAQAAAAAAAAQAAABAAAAQABAAAAgBQAAAAAAAAQAJAAACAIIABAEIgCAGQgCAEgCABQATgBAUAHQAXAIATAQIAJAHIAOAAIAEAAQAHABAPAAQANAAAJABQARAEAVAKIAmAVIAAABQAYgGANAAQAjABAoASIAKAFQAGgIAHgFIAEgCQARgJAYAAQASAAAcAFQAjAGAWALQAJgHANgDIAEgBQAZgFAdAJQAbAIAZAQIAQAMQAPgBASAEQAcAHAbASQAaAUAUAZIANATIANATIAXAbQAPASAIALQAFAIADAIIAKACIAFACQAYAIAYARQANAJANAMIAPAPQAMAOAIAOQAQAfgCAeIgBAKQgDATgJANIARAAIATAEQAGACAEADIAGAGIACAGIAHACQAMAFAFAHQADAEABAGQgBAFgDACQgCACgIgBIgGgBIADACQABAHgEADQgEACgIgCQgJgDgKgGIgTgKIgLgHIgLgCIgOAAQgLAAgKgCIgFgDQgNACgNgCQgbgCgkgWIgGgDIgBABIgHgBIgIgCQgJgEgUgCIgigFQgugFgWgGIgqgLQgKgDgsgFQgigFgVgIIgEgCQgFgCgCgEIgbADIAAAAQgBACgEAEIgSAPIg/AuQgYARgMAMIgLAMQgMAMgCADIgDADIAGAGIADAHIAIALIAHANIAFAIIAMAQIAPAZIAFAJIAAACQAEADABAEQACAEgCAEIgEAHQgDAFgGAVIgGAVIgIAXIAAADQAFACABAHQABACgBAIQgEASgGAOQABAFgBAFQABAZgNAUQgIAOgOAIIgBAGQABADgBAEIgBABIgBANIgEATIgCAGQgDANgHALIgFAGIABABQAFAGgEAFIgHAHIgDADIABACIACADQACAEgCACIgFAEIABADIACAHIAEAGQAEAHABAIQAEAAAEAEIAEAIIABACIAFAEIAeAWQAHAEADAFQADACABADQAaAQAQAZQAFAIAEAIIAKABQAUAFASANQARAOALATIADAHIALANQAKARADARQAEADAIAIIADAEIARAJQAKAGAIAHQAOAPAIASQAHASAAARQgBAPgHAMIgCADQgHALgLAFIgGADIgGACIgEABIAEAHIACAEIACAFIADgDQAIgJAKgDQADgLAHgIQALgNARgGQASgDAVAGQAUAGARAPQANALAJAQIABADIAGANQAJgGANgBQAOAAARAEIAFgDQAQgFARAEQARADAQAJQAQALAMAOQALAQAFARIABABIABAIQACAMgBALIgCAGIABADQADgBADgBIAAAAQAEgNAKgJQAOgMATgCQATgDAUAKQALAFAKAHQALgDAPACQASADAQAKQANAIAJAJQANAKAIANQAFAFAEAIIAEAIIAIgDIAKgGQAGgFAIgOQAMgPAdgHQAcgHAYAGQAZAFASAQIAHAIQAGgUANgMQAOgOATgEQATgEAVAIQAXAHAQARQALANAQAdQAKASAFAPIAWgZIAAgBIgCgDIgGgIQgDgFAAgHQABgHgCgEIgEgEIgEgEIgHgLIgJgLQgHgHgCgFIgEgHIgEgIQgEgEgHgEQgIgFgDgDIgHgIIgHgDIgKgHIgLgIIgBAAIgOgCIgGgBIgJADQgGABgHgDIgCAAIgOAIQgFAAgDADIAAAAQgBAGgGABIgBABQgDACgFgCIAAAAQgFAEgGgEQgHgFAAgMQACgKAEgIQAHgJACgFQADgGABgLIAFgZQACgHAEgBIACAAQgDgPAEgNQADgPAKgKQACgNAFgJQACgFADgDQgDgRAEgPQACgHADgFIAAgHQABgTAMgPQAMgOATgDQATgDAVAHQAVAHAQASQAQAQAIAVIADANQABAKgBAIQAVAGAQAIQAbAKAWAPQAMAIALAJIAPAOQANANATAZIAfAoIAUAVIAdgIQA2gKAvATQAWAJASAQQAVARAIAVQAFALAAAMIAKAEIACABQALAHAMAKQAIAHAOAOQABAAAAAAIhEAAIAAACIAxAAQATAXAHALQATAfANArQARADANANQAOANAHAUIACAHIABABQAEgCAGAAQAJgDAMADQAZAEgFgMQgEgNAeArIApA/QAMATAAADIAHAoIgTB4QAiBeguAsIACAEQCYCBgpAZQAxBAAZBBQBJC5hhDyQBiBrBCB8QDyHHmogIIufAAIgCgDIgMgIQgIgDgCgFQgBAAAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBIgBABQgDADgKgBQgHgBgEgDQgGgEACgHIACgEIgBAAQgEgGAEgFIADgFQACgDABgIIABgLIADgVQAEgPAEgIQABgFADgCIAAAAIgGgCIAXhjIBsgoIABgGIgNgZIgGgEIhyAsIgHgEIgdB+IgJgDIgDAXIgCAMIgBAIIAAAAQABAGgGACIgBAAIABADIgBAEIADAFIAAAGQgCAFgGAAQgFAAgDgFQgDgDAAgEIACgFQgDgDgBgDQgBgFADgDIADgBIAAgDIgCgDIgDgFQgBgEAEgDIABAAIAAgBQgDgDAAgDIAAgFIAAgCIgCgEIABgDIABgDQgDgDAAgEIAAgBIgEgBIgLjdIAAgEIgJgCIiShtIAGACIABgBIgDgDIgGgFIgEgEIAAAAQgHACgFgGIgCgDIgEABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIAAABIAAAHIADAAIgLASIgBAFICYBwIAMDEIgDgBIACAhIAABAIgBALIACAWIAEAeIhuAAQgPgGgOgKQgKgJgIgJQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBIgHgCIgMgDQgWgJgRgUIgBAAIgCAJQABAQgHAOQgJARgRAHQgPAHgRgDIgBABIAAADInJAAIAAoiI0yAAQAPgUAPgPIABgCIAAAAQBFhLBJAAIABAAIAAAAQAxAAA0AiIABABIgBgBQg0gigxAAIAAAAIgBAAQhJAAhFBLIAAAAIgBACQgPAPgPAUIhZAAQgUgXgegMIgBgBIgEgBQgmgOg3AAIAAAAIAAAAIgQAAIgLgLQiCiFhrgBIAAAAIAAAAQhSAAhDBPIAAABIgDACIgCADIACgDIADgCIAAgBQBDhPBSAAIAAAAIAAAAQBrABCCCFIALALIgaAQQgbARgTASIDsAAIBZAAIUyAAIAAIiIAAABgAPETLQgFgQADgOQACgPAHgLIADgEQAHgJALgEQAEgDAFgBQAJgDAJABQALAAAKADIAAgIIAMAAQACgLAGgJQAJgPASgGQAGgCAGgBQAAgQAGgNQACgFAFgFQAIgJANgGQARgFASACQAAgRAIgMQACgFAbgdQgFgWAIgRQAIgSASgHQAGgEAGgBQAEgNABgJQAAgLADgIQAEgLAIgHIgBgFQgKgbAKgWQACgHAFgGQgGgQACgQQACgWAPgOQALgJAMgCIAAAAIgOgJQgXgPgLgXQgLgWADgXIAAgBIgRgJQgVgOgMgYQgKgRgBgSQgTgFgRgNQgUgPgKgYIgEAAIgEgEIgFADIgMACQgbAFgZgOQgSgKgNgRIgLgEQgMgEgLgIQgFAIgJAHQgPAKgTAAIgLgBQgRgDgRgLQgHgEgGgHQgMAAgNgEQgagJgSgUQgTgVgDgbIAAgDQgKgGgJgIQgZgWgGgfQgDgPADgPQgLgCgLgHQgRgKgNgQQgMgQgFgTIAAAAIgIgGQgPACgQgEQgWgGgSgQQgRgQgJgUQgSAEgXgIIgHgCIgCAEQgMAQgXAEIgPABQgJAWgUAHQgRAHgUgFQgSgDgPgLIAAADIAEACIAEACQADABABAFQABAEgBACIgFACIgKAAIgEACQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAABIgCAHIgEACIgFAAQgJgCgBgEQgEgCABgGQAAgHACgDIAEgDIAFgEIACgBIgBgRIAAgEQgHgJgGgKQgLgVAAgTQAAgTAKgOIAGgHQgCgIABgHQgWgHgLgCIgNgBQgIAHgMAHQABADgCAFQgFAOgEAFQAAACgEADQgDADgBAEIAAAJQACAIgBABIgFAJQgDAFAAAEIACAHQAAAEgBADQgBACgDABIgGACIgFAHQgEAEgHgCQgGgCgEgFQgGgIAFgJIAEgEIhQgRIgHAIQAGAGAFAJQAEAGADAIIABADIAEAMIAHACQAcANAQAZQAIAOAEAPIAFACIAFAAIAAABIAGAGQAPARAFAXQAEAXgIARQgDAIgEAFQgJAGgIAGIgBABIgGADQgFAJgJAIQgOALgTACQgNAAgNgDIgFALQAIAIAGAKQAKAPACATIABABQAMARADASQAFAUgGARQgDAGgEAGIAHAIQALAPAFAPQADAHABAIQAIAHAHAIQANAPAHAUQAEAQgCAPQAIATgBARQAMAJAKANQAOATADAWIAAAFIAEAEQAXATAIAaIADALQAIAJAHAJQAGAGAEAIQAMAFAKAJQARANAJATIADAGQAQAFANALQAHAEAFAHQANgBARAFQAXAIARATIAIAKQAHgEAKAAQAUgCAUAIQAPAIANAMIAJAJQANgIAPgBQATgBAVAKQAVAJAOATQAKAKAFAOQAGAGAFAJQALARADARIABADIAFAIQAJAJAGALIAEAJQAHARgBAQIgBAJQAXALAdAMIB0AvIATAIIAAAAgAb5QrQAJABAJAFQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQAHAEAGAHIAFgSIAFgXQgEgIgEgDIgEgEIgBgBIgCgDIgCgCIgCABIgFAAIgDgDQgDgFACgEIAAgBIACgDIABgBIABAAIABgCIABAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAABAAIAFgFQAFgIAHgLIAFgHIACgCIAEgIQAEgGADgGIAAgCQAFgOAAgRIAAgIIABgDIABgHIAAgDIAAgEIABgLIAAgIIABgCIgBgDIAAgEIgEgSIgCgHIgBgHIgCgGIgEgPIgFgNIgCgIIgDgGQgBgDACgCQgFgBgCgHIgDgMIgUgmIgBgBIgDgDIgBAAIgBgBIgFgFIAAAAIgGgEIgCgBIgBAAIgDAAIgDgCIAAAAIgBgBIgEgBIgrgCQgZgDgggGIgJgCIgIACQgRAGgIAGIgCAEIgIAHIgKAHIgGAHIgLARQgFAIgGAOQgFALgCAHIgCASQgCApAEAbIACADQAAAAAAAAQABABAAAAQABAAAAABQAAAAABABIABAFIADAFIAEANIABAAIAEAIIABABIAFAMIAHALQAKAOAIAHIAAACIAAAAIABAAIAAABIAKALIABACIACAFIABABIADADIACACIABAAQAFADABAEIADAAIAAABIAEABQADABABADIAAABIABABIABAAIADACIABABIACADIAAADIAAAEQAAABgBABQAAAAAAABQAAABgBAAQAAAAgBABQgCABgDgBQgCgCgCgEIgBgDIgBgBIgEAAIgCAAIg0ABQgdABgMACQgFABgCgCIAAAAIgFAAQgFADgFAAIgCABIgCAJQgGAPgLAHIgFACIAAACQAAAGgBAEQgDAHgEAHIACACQAGgHAJgEQAMgDAOADIACABIADgCQALgLAOAAIAJABQAHgLANgDQANgDANAFQANAEAKALQALgCALAFQAFACAIAFIABABQALgEALABIABAAIAKAAQAJgGANAAQANABALAGQAFADADAEIAGgBIAGABgAcpP+IABAAIAAgBIgBABgAVKP9IACABIABgFIgDAEgAzrLsQgGALgKAHQgFAPgOAJQgJAGgKADIgIAJQgDAIgGAIQgEAGgHAGQAFAKADAMQADANABAOQAKgBAIgCQAGgZATgXQAOgOAUgOQAOgJAZgOQAdgPAQgDQAPgCAZAEIARADIAGABIAMADIAMAFQALACAJAFIgBgGQgCgJACgIQAAgJACgJIADgEQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQgDgOAEgOQADgNAJgKQAMgPAWgCQAWgDAVAKIAOAHQAHgGALgEQAOgGARADIAKACIACgCQAMgMAVgDQAUgCAVAJQATAJAQASQAQASAFAVIABACQADAPgDAPIADgFQAIgOANgGQAKgPAQgGQANgGAPADQAXgOAegMQAJgDARAAQAYABApAHIATAEICZAwIgBgBIgBAAIgBgBIAAAAIAAAAIgDgBIAAAAQg5gbA6AVIAAAAIABAAIAAAAIAAABIABAAIADABIABAAIgBAAIgDgBIgBAAIAAgBIAAAAIgBAAIAAAAQg6gVA5AbIAAAAIADABIAAAAIAAAAIABABIABAAIABABIiZgwIgVgFQgigQADAAQAOgBASACIAhAHIAHACQAlAHAXAGQAlAIAeALIAQAGIAAgFQgBgTgqgMQgjAEgWgRQgWgQALgKQAMgKgHAAQgEgBgHABIgKAAQgOABgOgGQhYjmhViJIgLghIgQgjIgPgaIgRgZIgHgOIgBAAQgWgEgUgQQgQgNgJgRIgCgBIgLgCQgSgCgQgMQgQgLgMgPIgEgGIhJADIikAIQgbACgMADIgUAFIgVAGQgbAHglADIgzABQgJANgPAFQgSAHgWgGIgFgCIgBABQAEAKAAAJQACAPgDAMIgGANQgHALgLAHIgDABQgMAGgPgBIAKAZQANgBAOACQAVAEATAPQASAOALAUIACAHIAJAFQAPALAIAMQAMAQAEATQADALgBAKQAFAEAEAFIAGAGQASARAHATQAGARgBARQANAKAJANQALASADATIABAIIAHARQAHAKADAKQAEAKABALQAKAQADAPQAEAJACAJQADAMAAALIACAGQAFAMABAMIACAGQAEAOgBAPQgCAcgXAOQgOAHgSAAIgNAAQgNAEgPgBIgDACIgBAAIgCAEgAxFMJIAAgDIAAADgAlwLnQi5gyg0gKQA0AKC5AygADaBMIABACIAAgBIAAgBIgCAAIABAAgACLA5IAdAGIgBgBQgHgFABgFIgVAAIgBAFgADrAkIAAABIABgCIgBABgANlj8IACAAIgCgCIAAACgANWkQIAAACQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAIgBgDIgBADgArYlYIAAgCQAAgEADgBIgBgCQACgDACgCIgBgEQgIgXACgWQADgXAMgQQAPgUAYgGQAVgGAYAFIABAAIAEgBIAOgFQACAAAFAAIAEgBQATgLAXABQgEgGgBgHIgBgFQAAgJgBgEIgCgDIgCgBIgGACQgKAEgKABIgRABQgMAAgHABIgPAEQgaAJgfABIgBABIgDALIgBAMQgBAFgDACQgDACgFgCQgEgCgCgEIgBgBIgDAKQgMAkgLALIgMAKIACACQACADAAAGIgCAIQgCAIgCABQgBABgEABQgBAFgGAAQgFABgFgGIgDACQgEACgFgDQgFgBgDgEQgEgFgCAAIgGgCIgLgIIgQgKQgKgGgFgFIgEgEIgEgBQgDgBgEgDQgFgDgCgBQgKgBgEgEQgEgDgBgEIgPgFIgdgIQgUAGgYgLQgKgDgIgGQgWgFgNgBIgGgBIgHAIQgIAHgLADIgKACIgOAAQgKgBgKgDQgMgDgJgIIgDAAQgCAEgGADIgMAIIgGADIgHALQgCABgFADIgKAHQgHADgEAAIgFAAQgBALgGAKQgFAHgGAFIAIAVIANgQIAOgOQARgRAUgKQAggRAjgBQAcgBAmAKIBCARIAqAMQAYAHARALQAWAPARAWIAEACQAQAJAFAAQAFACAPgDIALgBQANgBAPACQALACANAEIAAAAgAsTmUIAEABIABgBIgFAAgAnQndIAEACQAIgBAJgBIgDgIQgFgKgDgLQgHgbAHgXQADgMAHgKIAJgLIAHgNQAMgSAXgJQAIgHAMgEQAVgIAYADQAQACAQAIQAJgDAMAAQAYABAYALIAEABIACgEQAFgBACgCIACgFIAGgNIABgJQAAgEgEgGIgIgKIgJgHIgEgGQgSABgRgGQgGgCgFgDQAAAEgDABQgDACgFgBIgKgEQgFgBgIAAIg0gDQgJAAgFgDQgCgEgBgDIgKACIgLACIgLABQgEABgGAEIgJAJIgKAFIgQAJQgDACgEABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAIABAFQAFARgFARQgEAPgKALQgLAJgQAEIgIACIgDAUIABAHIgBALQAAAOgBAEQgCAGgGAIIgCADIgEAKIgEANIgBAFQAAAGgCADIAFABQAJgCAKAAIADgBQAXAAAZANgAwdpZQABAJACAFIAFAJIAEgGIAJgKQAKgGANgDQAAgEAEAAQAEgCAEACQAAgJACgGIgCgCQgCgGADgHIACgDIADgGQADgDAAgEIgEgIQgCgKAHgHQAHgHAHgEQAIgEAMgDQAOgDAIABQAJACAEAFIAAACIAEgCIANgDIARgBQASABAKAHQAEACAKAJIABAAIAFAAQACAAADABQADABACAEQADAEAAACIgBAEIADADIAKAKIACAAQAOgIAmgTIgBgEIAFgJIAGgIQAHgJAGgDIAOgIIALgFIAMgFQAGgCADAAIACgBIAIgDQAGgDADACIAEABIACAAIALgFIADgBIABgBIAFgDIALgCQAFgCAJACIAMABIADgBIAGAAQAEAAAEADQAGgEAIgCQAPgEASADQASAEAPALQALAGAJAKIABgFIgCgIIACgJQgOgIgOgLIgUgUIgDAAIgkgIQgCADgDABQgHABgIgGIgDgFQgDABgDgBIgGgEQgEgFABgFIABgFQgEgegLgeIgOgeQgJgRgEgMIgFgOIgIgNQgFgIABgGIAAAAQgJgNgEgIIgEgHIgGgFQgEgEgEgHIgDgGIgGgHIgJgPIgGgJIgFgHIgHgIIgOgZQgGgJAAgFIgGgOIgEgKIgDABQgEgBgCgDQgDgBgCgEQgBgDABgEQABgEADAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAAAIgGgNQgGAAgFgHIAAgDIgHgGIgDgBIgEgDIgBgCQgEgEgBgDIgBgBIAAgOIABgCIAAAAIAAAAIAAAAQgDgFABgEQgJgMgGgNIgHgOIgEgMIAAgDIgFAAIgvADIgIADIgGABIgGABIgIAHIgBABIACACIAGAMIAGAMQAFAMADANQAEAOADARQADAWAAAeQAABigYA9IgIAWQgFAMAAAKQgCAKADAPIADAYIABALIABAAQAEAAAEADIACAHQABAEgCACIAAABIADAGQACAFABAJIACAOQACALAHALIAHAKIAGAKIAEAKIACAAQAFAAAFAEQAEAFgCAFQAAAFgHABQgFgBgEgFQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQgFAGgRgDIgSgDQgJgBgGABIgJAFIgIAAIgJgBIgRADIgKAFIgFAGQgEADgKADIgHACIACAFQABAGgLAEIgHACIgEAFQgFALgHAJIgBABIACABQAGAEACAGQAAAGgFACQgFABgFgDQgDAWACAigAljxBQgSAIgGAIQgFAHgDALIgFAUQgDAHgJANIgKASIACAEIADAHIABAFIACAJIABASIABAPQABAKAEAJQACACAAACIABABIAFABIAFAEQAEADAHAAIALACIAEABIAHglQAEgYADgJQACgIADgGIACgFIABgEIAAAAQgDgDAAgGQAAgEACgDQACgGAGgDIAMgGIANgGQAGgCALAAQAbAAAVAGQATAFARAKIADgCQACAAAFAAIAGAAIAKgUQAEgFAEgCIgGgOIgEgIQgBgFgEgDQgDACgGAAQgFAAgJgDIgKgDIgNgFIgFgEQgIgBgEgDQgDgCgBgDQgLgCgHABQgHAAgEgCIgOgBIgSAAQgPgBgaAMgA9KumIABgDQAviHCBAAIAAAAIABAAQBXAAB8A+Qh8g+hXAAIgBAAIAAAAQiBAAgvCHIgBADgAuz0FIABAAIgCgBIABABgAoL6XIABgBIgBAAgAIodSIAHgFIALgEQAKgDALABQATAAARAKIABABgA0jUwgA18UwgA5oUwQATgSAbgRIAagQIAQAAIAAAAIAAAAQA3AAAmAOIAEABIABABQAeAMAUAXgA5oUwgA4gT9IAAAAgAlwLngAoOJzQgWgNgNgTQgMgPgLghIgbhMQgLgfgEgOQgGgTgBgOIgBgCQgJgTgBgSQgZgvgQgoIgBgCQBVCJBYDmIgNgFgAquEJIAAAAg");
	this.shape_89.setTransform(709.5948,372.85);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#CCFF00").s().p("AhkCXIAgiIIAeh9IAHADIBxgsIAFAFIAOAZIgBAFIhsApIgXBiIgeCAgAgkhqIAFgBg");
	this.shape_90.setTransform(800.025,545.1);

	this.instance_6 = new lib.overwelmed_phone("synched",0);
	this.instance_6.setTransform(1186.9,369.5,0.5598,0.5437,0,0,0,139,109.5);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#000000").ss(3.8,1,1).p("AtV0UQgBkQGNC2AEgUOQBKgDA3AWQBfAkAqBsQARhZAdg3QBSiWCsBlADOW4QgWhPBRhIQALgJAMgKQllkshmDm");
	this.shape_91.setTransform(577.9249,470.152);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(14,1,1).p("Ag7ARQAIhCBvBC");
	this.shape_92.setTransform(842.475,668.025);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#000033").ss(11.3,1,1).p("AhGAfQABgKAEgJAgzgJQAigjBYAV");
	this.shape_93.setTransform(737.275,415.1527);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(11.3,1,1).p("ADqBFQAhiuCwDdAjaACIAAACQAJARAIASAm6hgQBKgjA5AfAkZhQQAfAaAaAvAAoBPQADhjC9Aj");
	this.shape_94.setTransform(792.05,428.7399);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#000000").ss(11.2,1,1).p("AJ3GSQhYjXDtBXAphi1QhXmLE3E7QgMiHFMDGQAdhtCIBHQBUAuB/BxAsCgrQgsi3CWgZ");
	this.shape_95.setTransform(591.301,299.2497);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(12.2,1,1).p("A4StQQgPiCBHghQAwgXBaAXQAQAEATAGAS4PwQBCgyDwAnQAGABAGAAQAAABABABQAPALAPAN");
	this.shape_96.setTransform(812.2111,472.575);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#000000").ss(9.4,1,1).p("Aj8BqQgKg0AHgjQAUhnDDBJQAPAwAGgnQAEgfAegZQARgOAYgLABDhYQAGgEAFgCQADgCAEgBQALgCAKgDQA1gNBkAw");
	this.shape_97.setTransform(621.135,369.4198);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(7.6,1,1).p("ACHhWQAkgWA1gFQBogLCoA6ABOgbQAVgmAkgVAkvgOQAgALAkANAnvB6QAaiWCmAOQAXioGfBg");
	this.shape_98.setTransform(666.375,538.3194);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#000000").ss(8.5,1,1).p("AEhhXQAuAEA6APAmIAVQAZgwA5gLAkcgpQB8gHDuCIABuBbQgli7C6AG");
	this.shape_99.setTransform(624.375,399.6141);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#333300").ss(14,1,1).p("AI4KIQiLBijLlbQnXg4i7mMQjajOBOhmQAGgJAHgGQAFgFAFgDQABgCACgBQADgogHggQgJgkgVgaQAfACADgfQAEglgihSQgFBFAjAyQAaAlAxAcQhBgRgOArQgKAaALAxQAAACABAEQAAgFACgEQAlgeB1gjQgfAEAFgMQANAFANADQgNgGgNgGQBckQHDIOQLgBaihIPQgwCeg9A+ApEoJQgtg3hngSArWpQQBmBGAsABAminQQgdgOgYgHQAXAOAeALQgBgDABgBg");
	this.shape_100.setTransform(822.6117,521.9139);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#000000").ss(2,1,1).p("AHXqOQgqAEACAwAAdExIAYAdAnWBlIAGgVIACgJIAYAPIDHCAIAMAIIBeECIAPAnAhaFgIAEgBIBsg0AidIHIgTgzIhVjlIjPiEAhNIHIgDgZIgPiTAA2FUIhmAwIALB1IACAOAk2KPIg3iIAkMKPIgRiIAlGIHIA1CIAjzIHIASCI");
	this.shape_101.setTransform(893.475,604.175);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(0.1,0,0,3).p("ADKhRIAFAOIgagFACKhGIAFALIgrgIIAGAQIgKgCIAEAKAA/iaQAFABAFADQAGgDAAgCIAhAGIgDgKIAMACAD9AfIAEALQAKACgOgNIAgAGQgFgWAOAJAB3A/QAGAFAGAEIARgWIALACQAHAIACAAQAQgJAVANQAHAEAGAEIgNgmIAVAFQANAHAAAEAD1AlIgCgIIAKACADoCUIgJgCIADAIIgXgEIAFAOQgHABgGgCIAGATIgkgHQgJgNgIgFIAnA0IgPgDAFABwQgdgGgNAOQgOAPAJAaAiRivIgIgXIAKADAhxi1IACgVIAkAIIAMgIIAYgHIAPADAkuiPIgNggIALgRIAKACIBFAvIAXAEIgPgpIALADQAMAHANAGAizhTIAOgLIAQAEIABghQAOgLAWAUIAmAIIgDgIQAEgEgBgEAAPjXIAVgEIAGACQAGgFABgDQAOAEAAgEAg7huQAJgGAIgDQAIgCgCgFIAkAHQAWgEgCgaQAHAEACAAAgNgGQgEgWAQgIIARAEIADAHIAOADIAkASIAOACQACgEAAgDAh/AbQgJgaAYgMQAZgMAsAJAhGBdIAPgMIAPAOIgFgQIBMAQQAJADgHgNIAGgJIAKABIgBgCIAoAIAB3DHIgZgFIAGANIgggGQACAIAAACIgNgEIAEANIgWAI");
	this.shape_102.setTransform(637.9712,495.8468);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#CCCCCC").ss(12.2,1,1).p("AAJGNQh4lWlnkaQg5gdgIgXAoIk7QBNg6G7gXQDYAwFAKG");
	this.shape_103.setTransform(635.15,497.175);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#663300").ss(12.2,1,1).p("AeQgZQAIACAIAFEAhLABrQAJAKAIAMQACADADAEEAnDARIQAKAHAKAHQAGAEAGADEgilgXsQmEhuBXCzA6fVSQAGAEAFAEQARANARAOQAYATAXAUQBCA7A1BA");
	this.shape_104.setTransform(711.7283,460.6779);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#000000").ss(1,1,1).p("AgsABQgCgDABgEQADgKAKgGQAKgGARACQAQAAARAHQADABACABAAuAAQgBAAAAACQAAAPgMAGQgLAGgVgCQgVgCgNgLIgBgB");
	this.shape_105.setTransform(589.3583,304.0835);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#006600").ss(1.9,1,1).p("AAMgDIAEgCQACgBAEgBIAEgBAAEgCQABAAABAAIAGgBIgGgBQAAABAAABAAEgCIgBACQgCAAgBACQAAACAAAEAgRAIQAIgEACAAIAEgDQACgBAFgCAARgBQgBABgBAAQgCABAAAAIgDAAQgCAAAAAAIgBACQgBAAAAACQAAAAgBACAgZAEQACgBACgBQACAAABAAQAEABAAgBIAAgBQAAAAACAAIADAAQACAAABgC");
	this.shape_106.setTransform(594.225,313.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#006600").ss(9.4,1,1).p("AAAAEQAAgEAAgD");
	this.shape_107.setTransform(602.175,336.775);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#663300").ss(9.4,1,1).p("AAkghQAGgCAEgDQAFgEADgDQAGgBAEgBAg/AhQABACACAEQAJAEAMAF");
	this.shape_108.setTransform(623.175,364.35);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#666600").ss(9.4,1,1).p("Ahjg1QAXA1AtA5QAFAFADAFQAPASARATAhohAQA7AkAehLIB2C7IACAE");
	this.shape_109.setTransform(616.475,352.5625);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#006600").ss(11.2,1,1).p("AjDj8QBIBogGB0QgGBnCOCaQAFAFAFAGIAAAAAiCkJQBMBnBoBuQBTBXA4B8QABAFAGARAAfD7QAHAGAIAJ");
	this.shape_110.setTransform(612.175,341.025);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#663300").ss(11.2,1,1).p("ABthOQh6gKgEBgQADAggGASIAAABAhBBQQgSgEgZgN");
	this.shape_111.setTransform(501.225,302.6533);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#333300").ss(11.2,1,1).p("AjYi8IBPB5QBACbBmBlADZADQiRBHjRiN");
	this.shape_112.setTransform(487.45,290.05);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#333300").ss(7.5,1,1).p("AEMozQrvEZItNlAgWpKQnED0F/OR");
	this.shape_113.setTransform(494.0985,229.35);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#333300").ss(11.3,1,1).p("AIzgrQlAlxk4hZQiTgqiRATQh1AQh0A3Qj4CwB2HyQAkCEBDB+ALeIMQBKh2hyjjQgrhWhIhwAAcFVQBhm1EFEZQEEEZhrBB");
	this.shape_114.setTransform(527.9187,223.1648);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#999999").ss(11.3,1,1).p("AFTCSIg7B1IgnBMIgcA6AlSi7QDhg8DgCoQByBTByCOAlSi7QEDD8EJA+QBMASBNABAlSi7QBLh9BOgzQBeg/BhA5QAmAUAlAoQB/CCCDFFAkREUIACASAkxA2IAcDeAlSi7IAeDR");
	this.shape_115.setTransform(641.15,211.8143);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#663300").ss(11.3,1,1).p("ADKBfQARhZCEBGAlehcQAIgDAIAAQBdgHCRCTQgBhJCHBfQA1glBjBD");
	this.shape_116.setTransform(634.125,251.2863);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#FFCC66").ss(11.3,1,1).p("ApMphIhtB8IHIHPICNhMIAJIGInjmKIgOl6ApMphIKvCOIANEdIABAzAhkhiIB8DMAAeBuIIzBwIAKFwACfmyIHLHJIq6iKIn8nuAJqAXIBQDcIhpgVAHSJjIjpgv");
	this.shape_117.setTransform(747.175,368.15);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#663300").ss(16.9,1,1).p("Ap8qnQAbhbB7B5QCMgtC0EoAAdjcQCkA6ASBqAhjlvQAgACAaApASRN8QFLBMgfBsASRN8QATAWAWAbAOMLuQCBAACECOA17wPIgBgBQgvgugRAPQgRANBRASA1twAQgIgJgGgGQACgBAHgKAz0vlQh8iCgMBX");
	this.shape_118.setTransform(736.0023,327.143);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#000000").ss(0.1,1,1).p("Ag7BtQgBgBAAAAQgBAAgBgBQgbgagUgbQgkgwgSgzQgahTAngtQAEgFAFgFQAPgNAUgFAAHi7QADABADABQACABACABIABAAQAOAHAIAIQAEAEADAEQAEAGABAIQABAJgNgfQACAOABAOQAFA5gPAtQgPAqAZAyQAJAUAPAUQA1BMARATQAAAEgCABQgHAMghgHQgvgLgugdAAvigQAIAKAIAKQAvA8AbAzQAYAsAJAnQAOBEggAwQgGAKgJAJAgPCSQgCgCgCgBQgLgIgMgLAgDCaQAAAAgBgB");
	this.shape_119.setTransform(948.127,550.8656);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#663300").s().p("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BAIQAAAJgBAIIgDAKIgCAIIABACQAHAGgBAGIgDAEIgDAEIgBADIABACIADAFQADAEAAADIgEAEIABADQABAFAEAEIAFAGIABABQAIAIAFAKQADAAAGAFQADACAEAGIACADIAHAFIApAaQAIAEAGAGQAEADACADQAiATAcAeIAPASIALACQAXAEAZAQQAYAQATAWIAGAJQAJAHAJAKQAQASAJAVQAGACAMALIAEAEIAWAKQAMAHAMAJQAUARAQAWQAPAUAGAUQAEASgDAOIgBADQgEAMgJAHIgGADIgGADIgDABIAHAIIADAEQABAEADADIABgEQAHgKAKgEQgBgMADgKQAIgQAQgGQASgEAZAHQAZAHAXARQATANAQAUIACADIALAPQAIgGAOgBQAPgCAUAGQACgCADgBQAOgGAVAEQAUADAUAMQAVAMATARQASASALATIABACIAFAIIABADQAGANACANIABAHIADADQACgBADAAIABgBQgCgPAIgLQALgPATgCQAUgCAaALQAOAGANAIQAMgDAPACQAWADAVAMQARAJANAMQARALAPAOQAHAHAHAJIAHAKIAIgEQAGgEACgDQAFgGADgQQAIgTAcgHQAdgIAcAGQAeAHAZASIALAKQgBgXAJgPQAKgQATgEQAUgFAaAJQAbAIAYAUQARAPAcAhQASAXAKARQAGgLAIgTIABgBIgEgDIgJgJQgFgGgDgIQgCgJgDgEIgHgFIgEgEQgEgCgJgLIgOgOQgJgIgEgFIgIgKIgHgJIgOgJQgLgFgEgEIgKgJIgKgEIgOgIIgPgJIgBAAIgPgDIgIgBIgIAEQgHAAgJgDIgCgBQgFAGgHAEQgFABgCACIABABQAAAIgGABIgBAAQgCADgHgCQgDAEgIgEQgKgGgEgPQgDgMACgIQAEgMAAgFQACgIgCgMIgEgdQgCgJAEgBIADAAQgIgSgCgPQgCgRAIgMQgDgOACgMIADgJQgKgUAAgRQgBgIABgHIgCgHQgHgXAIgRQAJgQASgFQAUgEAaAJQAaAJAXAUQAYATAQAZIAIAQQAFALACAKQAZAHATAIQBBAZAzApQATAQAeAdQAkAjANALIAdAZIAdgJQA3gLA6AWQAcAKAZATQAdATAQAZQAKAOAFAOIALAFIAEABQAPAHARANIAfAYIAAAAIhJAAIABABIA1AAQAdAcAMAOQAgAkAeAyQAUAFATAPQATAQAQAXIAEAHIACADQADgDAGAAQALgDANADQAcAFgJgPQgKgPAxAyQAxAzATAWIAWAbQBfDBgxgGQBGBughA0IADAFQDWCXgjAfQCCB/A6CCIAHAPQBBCdgnChIgHAGIgEAFQgHAJgFAIIAEAMIpMAAIAQDPIg4AAIAlHaIjQAAIAPCIgAaJeRIADARIABABIAIAAIAqAAIAEAAIAAgFQgBgGACgBIABgBIgIgBIgLh1IBngwIgBgGIgYgdIgGgFIgBgBIhtA0IgJgEIAPCTIgLgDIACAKgAY1d/IAFASIADAGIAEAMIAEAAIAnAAIAHAAIAAgBIABAAIgBAAQgEgEgBgEIgBgDIAAgCIgCgCIgBgCIgCgCIAAgEIAAgEQgEgEgBgEIgBgBIgFgCIhekCIgCgHIgKgBIjHiAIAIADIAAgDIgEgCIgJgGQgDgDgBgCIgCABQgGABgIgHIgEgDIgDABQgBABABAEIAAAAIADAJIADAAIgGAVIACAGIDPCEIBVDlIgDgBIAGAQgAtGYRQAShZAdg3IABgCIAAgBIABgBIABgCIAAAAIABgBIAAgBQAwhSBNAAIAAAAIABAAQA0AABBAlIAAAAIAGAEIgGgEIAAAAQhBglg0AAIgBAAIAAAAQhNAAgwBSIAAABIgBABIAAAAIgBACIgBABIAAABIgBACQgdA3gSBZQgqhshfgkIgBAAQgwgTg+AAIAAAAIAAAAIgSAAIgKgIQjDihh1gBIgBAAIgBAAQhZABgsBdIgBABIgBACIAAABIAAAAIgBACIABgCIAAAAIAAgBIABgCIABgBQAshdBZgBIABAAIABAAQB1ABDDChIAKAIIASAAIAAAAIAAAAQA+AAAwATIABAAQBfAkAqBsIAAAAgAZhUzQgKgRgEgRQgDgSAEgNIACgFQAFgKAJgFIAKgFQAIgCALAAQASABATAIQgIgWAFgRQAFgRAQgHQAGgDAHgBQgHgSADgPQADgVATgJQAPgGAVADQgGgTADgQQABgGASgiQgMgZACgUQACgVARgKQAEgDAGgBQABgQgDgKQgEgNABgJQAAgNAGgJIgEgFQgUggACgaIADgPQgNgTgDgTQgGgbALgQQAJgKAMgCIABAAQgKgFgJgGQgfgSgUgaQgUgbgFgaQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAABAAQgLgEgMgHQgbgRgWgbQgSgVgHgUQgXgGgXgQQgcgSgUgbIgEgBIgGgDQgHADgJACQgbAGghgQQgYgNgVgUIgMgEQgPgFgPgKQgCAKgIAHQgQARgegGQgSgCgWgNQgKgGgKgHQgNAAgPgFQgggKgagYQgdgYgNggIgCgFQgNgGgMgJQgjgagSgkQgKgSgCgRQgNgEgOgHQgWgMgUgTQgUgTgMgWIAAAAIgLgHQgPACgTgFQgbgHgZgTQgYgTgSgXQgSAGgbgJIgIgDQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAAAQgHATgXAFQgJACgIgBQAAAagTAJQgRAHgXgFQgWgEgUgMIABAEIAGABIAEACQAEACAEAGIABAHQAAACgFABIgKAAIgDABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAAAIIgDADQAAABgFgBQgKgCgDgEQgEgEgCgHQgDgHABgEIADgEIAFgDIACgDIgBgBIgHgSIgBgFIgXgXQgSgWgIgXQgHgXAGgRIADgIIgGgQQgagJgOgCIgOgDQgGAJgJAIIABAKQgBAQgCAGIgCAGQgCAEABAEIADALQAEAIAAADIgCAKQgBAGAAAEIAFAIQACAFAAACQAAADgEABIgGADQgBADgBAGQgEAEgHgCQgIgCgGgHQgJgJACgKIABgFIhbgTQgBAFgEADIAQAQQAJAJAFAJIADADIAHAOIAKADQAjAQAaAdQAPARAJARIAGABIAGABIAAABIAJAGQAWAWAOAbQANAagCAUQAAAJgDAHQgIAGgGAIIgBABIgFADQgCALgHAJQgLAOgUACQgOAAgQgEIAAANQAKAJAKAMQARATAKAUIAAACQAUATALAWQALAXAAAUIgCAPIAKAJQASARAKATQAHAIAEAKQALAGAKAKQAVATANAWQALATAEATQAQAVAFAVQARAKAOAPQAWAWAMAaIACAGIAHAEQAfAXASAeIAHAOQANAJALALQAJAIAGAIQAQAGAPALQAWAQASAWIAFAHQASAGAUANQAJAFAHAHQAOgBAVAHQAcAKAYAVQAIAGAFAGQAIgEAJgBQAWgCAYAKQATAIAUAPIAMAKQALgJAQgBQAVgBAaALQAaAMAWAUQAPAOALAPQAJAIAIAKQASATAJAUIADAFIAJAIQASAQAMATQAOAUAFASIADALQAdAOAkANICPA3IAYAJIAAAAgEAnOASNIgCgVIgCgaQgIgLgGgEIgFgDIgEgEQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAIgDABIgEAAIgGgDQgEgGABgGIAAAAIAAgDIABgCIABAAIABgBIAAgBQABgDADgBIADgFQADgOAHgQIAAgEIACgJQACgGABgIIAAgCQAAgPgHgVIgCgKIAAgEQgCgEAAgDIgBgDIgCgGIgDgMIgCgKIAAgCIgDgFIgBgDIgLgWIgFgIIgEgIIgDgHIgKgSIgLgPQgFgIgBgBIgFgIIgBgFIAAgBQgFgCgGgHIgHgOIgjgsIgCgBIgEgEIgBAAIgCgCIgHgFIgJgGIgBgBIgBABIgDAAIgEgCIgCgBIgBgBIgEAAQgZgBgXgDQgdgDgkgHIgLgDIgJAEQgPAGgFAIIgDADIgGAJIgIAJIgDAIQgFAMgCAIQgCAIAAARQgCAMABAKIAEAVQANAwAPAfIACAEQADABABADIAEAGIAEAGIAJAPIACAAIAHAJIABABQAHALAEAEIALAMIAbAaIABABIABABIABABIAOAMIADACIAEAGIAAABIAFAEIADADIABAAQAHAEACAEQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAQAAABABAAQADABADAEIABAAIAAABIABAAIAEAEIACABIADAEIABADIACAFQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQgCACgEgBQgDgBgEgFIgCgEIAAgCIgFAAIgDAAIg3ABQggACgNACQgEABgDgBIgCgBIgEAAIgJAEIgCABIAAALQAAARgKAIIgEADIABADIABAKQABAKgDAHQAAAAABAAQAAABABAAQAAABABAAQAAAAAAABQAEgIAIgFQANgFARAFIACABIABgDQAJgMAQgBIAIACQAGgNALgEQAOgEAPAGQAQAFAQAOQAKgDAPAFIARAKIACAAQAIgFANACIABAAIALAAQAIgHAOAAQAOAAAPAIIAMAIIAGgBIAGAAQALACANAHQAKAFAJAIgAe+RCIACABIgBgGIgBAFgEAnHARCIABABIAAgBgA7lQcIACgEQACgGAEgFIgIgMgAvCL9IAAABIAAADQgEAN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");
	this.shape_120.setTransform(717.1899,460.556);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AiagiIAOg7IEnC7g");
	this.shape_121.setTransform(813.525,501.525);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("ACfFXQnXg4i7mMQjajOBNhmQAGgJAIgGIAJgIIADgDIgBAJIgCgGIACAGIABgJQAmgeB1gjIgagMQBbkQHDIOQLgBaigIPQgwCeg9A+IgKAFQgJAGgFAKQgfAWghAAQh3AAiekPgAk4kmIE1CBIkni8gAnmoEQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAIAaAMIgbgIIAbAIIgNABQgRAAADgJgAnLn8IAAAAgAqIpBQAfACADgfQAbAlAxAcQhBgRgOArQgJgkgWgag");
	this.shape_122.setTransform(829.3954,527.5175);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#CCFF00").s().p("AiXCyIgSiIIAqAAIASCIgAAmAqIgCgZIgQiSIAJAEIBtg0IACABIAFAFIAYAdIABAGIhnAwIAMB0IACAOgAAZh8IAEgBg");
	this.shape_123.setTransform(881.85,651.9);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FF9933").s().p("AgPEkIg3iIIAnAAIA0CIgACJCcIgTgzIhVjkIjOiEIgCgGIAGgVIACgJIAYAPIDGCAIAMAIIBeEBIAPAngABDiMgAA3iUIAKABIACAHg");
	this.shape_124.setTransform(863.975,640.475);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#660000").s().p("AAAAfQgFgEgDgEIgEgHQgEgJABgHQACgIgEgRQgEgPAMARIANAUIAGAIIAJAQIAAACQAAAEgFAEQgEACgDAAIgCAAQgEAAgBgCg");
	this.shape_125.setTransform(961.898,554.0402);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFCC").s().p("AghBVQgPgUgJgVQgZgxAPgqQAPgugFg5IgDgcQANAfgBgJQgBgHgEgHIAQAUQAuA8AbA0QAYArAJAnQAOBEggAwQgGALgJAIQgRgTg0hLgAASgDQAFAPgDAIQgBAIAFAKIADAGQADAFAFAEQAEADAEgBQADAAAEgCQAFgFABgEIAAgBIgKgRIgGgJIgNgSQgGgJgCAAQgCAAABAHg");
	this.shape_126.setTransform(958.2065,551.85);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#CC3333").s().p("ABxDHQgvgLgtgdIgCgBIgEgEIgBgBIgBAAQgDgEgDgBQgBgBAAAAQgBAAAAAAQgBAAAAgBQgBAAgBAAIgCgDQgMgIgLgLIgDgCIgOgMIgBgBIgBgBIgBgBQgbgagUgbQglgwgRgzQgahTAmgtIAKgKQAPgNAUgFQAkAHAdADQAWADAZABIAHACIAEACIAAAAQAOAHAJAIIAGAIQAEAGABAIQABAJgMgfIADAcQAEA5gPAtQgOAqAYAyQAJAUAPAUQA2BMAQATQAAAEgBABQgFAIgOAAQgJAAgNgDgAhghFIAAgFQAAgrAogEQgoAEAAArIAAAFg");
	this.shape_127.setTransform(946.251,550.8656);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#990000").s().p("AARBBIAKgEIAEgCQACgCAGgCIgBACIgEACIABAHIgHAAIgLgBgAAiA7IAEgCIABgCQgGACgCACIgEACIgKAEQgFgBgDgDIAEgBIADgBQABAAABABQABAAAAAAQABAAAAAAQAAgBAAAAIAAAAIACgBIADAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAABgBQgBABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAIgDAAIgCABIAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAQgBgBgBAAIgDABIgEABIgFgCIgCgBQgGgFgHgIQgJgTgJgRQgIgOgKgPIABABQANALAVACIADAAIACABIAEAAIAAAAIABAAQAMAAAIgFIABAAQAMgGABgPIAAgDIAAADQgBAPgMAGIgBAAQgIAFgMAAIgBAAIAAAAIgEAAIgCgBIgDAAQgVgCgNgLIgBgBIgKgMIgMgPQgDgUBSACIAJAOIgEgCQgRgHgRAAIgBAAIgFgBIAAAAIAAAAQgLAAgHAEIgBAAIgCABQgJAGgDAKIgBADIACAFIgCgFIABgDQADgKAJgGIACgBIABAAQAHgEALAAIAAAAIAAAAIAFABIABAAQARAAARAHIAEACQAFAJAIAIQALAPAPAOQgBAFAGAEIAAABQgBAAAAAAQAAABAAAAQAAABAAAAQAAABABAAIAFAPIABADQACAKAAAKIgKAIQgJAHgKADIgCABIABgDIABgCIABgBIACgBIADABIACgCIACgBIgCABIgCACIgDgBIgCABIgBABIgBACIgBADIgFABIgBgHgAApA2IgCABIACgBIAGgBIAEgCIAGgBIAEgBIgEABIgGABIgEACIgGAAIAAABgAApA2IAAAAgAApA1IAGAAIgGABIAAgBgAAvA1gAgvgUgAATgzIAAAAg");
	this.shape_128.setTransform(590.7448,307.4859);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#006600").s().p("AA0ENQgGgCgGgFIgEgDQgHgFgEgHIAAAAIgBgCQgDgEgBgFIgBgGQAAgEABgCIgFgBQgLgDgLgLQgLgLgCgLQgCgGAEgEIgBgBIgBAAIgFgJQgDgIgHgIIgLgSIgJgOIgagyQgDgHAAgEIACgBIgBAAQgMgJgFgMQgGgKADgHIABgBQgIgHgDgIQgEgJACgGQADgFAJgEQAHgEAFgBIAEgBQgCgDgCgEIAAgBQgDgGgCgQIgGgaQgCgHgCgDIgJgOQgMgQgDgKQgDgIACgHQABgHAHgDIgXglIgLgPIgLgPQgFgJABgHIABgDIgBAAIgDAAQgCAAgDgCQgEgCgBgDIgCgCIgDgBIgHgDIgEgFIgCgDIACABIAEACQAEADAFABQAIACAKgBIAFgBIACgBQAKgDAJgHQADABACAEQADADgBADQABACgBADQACADgDACIgEABQAIADAGAIQAIAHAIAOIAhA0QAHAAAIAEQAHADAHAGQAHAHAIAOIAVAkIAEACIAGAGIAGAGIAFAJIAHACQAHAEAHAHQAHAHAEAIIADAHQAHAFAGAGQAHAJACAIIACAAQAEABAFADQAIADAGAGQAHAHAIAOIAgA9IAMAVIAJAOQAGAKAGAOQAMADAIAJIAIAMIAHAVIgVAFIgLACQgHgDgGgGQgGgGgEgHIgBgDIgOgDQgEgGgEgLIgIgPIgKgSQgIgNgNgaIgXgoIgLgTIgEgJIgKACIgcAMIgIADQADALgFAGQgDAFgIgBQgBADgCADQgGAGgOgFQgJgDgIgIIABAFQgBAFgDAEIgCABQgFACgGgBIgDgBIACAFIAhA/IAJANIAQAaIABABQAFgBADABQAHADAIAFIAEAFQAFAFAEAFIAFAKQABAIgBAFQAFAAAIADQAHAEAHAGIABACIAEAEQAEAFACAGQADAIgBAGQgBAHgGABQgDABgDAAIgIgBgACwDJQADgDAEgBIAVgFQgCAEgDACIgEABQgDADgGAAIgKgBgACwDJIgEgCIALgCQgEABgDADIAAAAgADMDAIAAAAg");
	this.shape_129.setTransform(611.35,339.875);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#333300").s().p("AAwBpQgQgDgNgMQgHgIgDgIIgEgBQgIgDgIgHQgJgGgEgKIgCgEQgCgFAAgCQgBgFACgDQgFgFgIgPQgIgLgGgHIgNgPQgKgJgDgEQgNgOgDgKQgHgHgFgIQgFgJABgHQgBgIAGgDQAGgDAIACQAHACAJAGIASALIATALQALAGAHAGQAFAEACAFIABAAIAXALQAPAIAJACQAKADARABIABAAIAAgCQgEgHACgFIACgDQADgFAIgBQAFABAIAEQAHADAGAGQAGAFAFAGQAEAHAAAGQABAHgCAEQgDADgFABIgDABIAAADQACAHgGAKIgMASIABABQAGAFAFAHQAFAHABAIQABAEgBAFQgDAGgGABIgGAAQgBAFgEAFQgJANgQAAIgKgCg");
	this.shape_130.setTransform(488.184,297.8561);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFCC99").s().p("AHmJUQgNgBgOgHIgCgCQgFABgGgCQgTgDgRgOIgJgIQgDADgEACQgJAFgPgEQgKgCgGgEQgGADgIABQgKAAgLgEQgNgFgNgLQgLACgOgEQgQgGgMgLIgCgBQgEAEgFADQgJAEgPgEQgOgEgOgKIgCgCIgLgDIgFgCQgMgFgLgKIgHgFQgJgKgHgLIgDgEIgFgCQgNgEgOgMIgCgBIgEABIgGABIgBABQgFAGgIACQgKACgLgEQgMgDgLgHIgDgCQgHACgKgDQgKgDgNgHIgGgEQgPgLgKgPQgKgOgCgNQgEgOAGgJIADgDQgCgHABgIIgCgJQgCgNAHgIQgCgJAAgKQAAgHABgGQgKgOgCgNQgCgOAGgJQADgEAGgCQgFgWABgjQAAgOADgHQgDgGgBgGIgBgEQgFgNACgKQgIgKgFgLQgIgQACgLQABgMAJgFIADAAQgFgEAAgEQgDgFAAgDIAAgGQABgGAGgDIAAAAIgDgBQgGgHgCgIQgDgJADgFQACgFAHgBQAIgBAIAEQAIAEAIAIQAHAHADAIIADAIIAJAJIADAEQADAGABAFQADAIgDAGQgCADgDACQANAKAKAMIAGALQAHADAKAFIADADIAGAEIAMAKIALAPIGxBWQABgCADgBQAGgHAKAAQAMAAANAHQAOAGAMALQARAPAHARQAHARgDANQgDAGgDAEQAHANACAMQABANgHAIQgDADgEABQAHALADAJQADANgFAJQgDAGgEACIAGAKQAFANAAAMQgBALgHAGIgFACQAIAMADAKQAFANgDAKQgEALgKAEIgDAAIAAABQAMAOAEAPQAFAOgFAKQgEAKgNADQgJABgOgEIgFACQgIAGgMgCQgBAJgGAFQgHAFgKAAIgDAAgAiRFpQgNgFgOgMQgNgKgIgNQgHgKgDgLQgDgCgCgDIgHgKIgRgJIgWgSIhOhDQgKgJgIgGIgWgSIgEgDIgOgFQgNgFgNgLQgNgKgIgNQgHgDgIgGQgJgFgOgPIgUgUQgNgDgMgIQgPgJgLgNIgHgLQgFgHgDgIQgFgNADgJIAAgDIgBgNQgBgGABgMIABgHIAAgKIgDgdQgDgTAAgKIAAgaIAAgKIAAgLQABgKAIgGIADgBIgHgpIgGgXIgDgZIgFgYQgDgPADgHQADgIAGACQAEAAAFAEQAEAEACAEIAAAEQAFAEAHAJIAGAHIAJAHQAKAIAIAKIADAEIAEAEQAJAGAHAIIAIALIAIAHIANAOIAHAHIBdBdIATASIAGAFQAUARAPASIAHAJIAIAIIAOALQAMAJAOAMIABACIAJgGIANgHIADgJQAHgXATgCQAKgBAMAEIABgBQAIgCADgDIAAgBQAHgEAFACIAGACIAEADIALALQAFAIgFAJQgCADgBADQAGAFADAIQAJANACAMIAAADQAAAFgBAHIgDAOIgFAbIgCANQAJAOADASQADAQgFAYIgIA+QgFAiAAAlIAAAJQAGAGADAGQAIALACANQACAMgGAIQgEAJgLACIgFAAQgJAAgLgEgAIcgFQgHgCgIgFIgKgJIgBAAQgFABgOgEQgPgFgjgHQg3gKgdgDQgNgBgFgBQgKgDgIgFIgBgBQgKgGgFgJIg2gDQgUAAgHgDQgKAAgOgEIgZgFIgrgJQgXgFgWgHIgqgOIhBgRIgQgDIAAACQgCAFgEAEQgDACgHgBQgGgBgHgEQgHgDgGgHIgGgGIgBgBQgFABgFgCQgHgBgKgHIgPgLIghgfIgVgWIgcgZQgmghgfggIgugzQgcgegUgTQgDgEgWgTIgYgWQgSgSgDgOIAAgCQgLgEgHgFQgJgIgGgKQgHgCgGgGQgFgFgEgGQgFAAgEgCQgHgDgIgHQgHgHgDgHQgFgIABgHQAAgGAFgDQAEgDAIACQAHAAAIAFQAHAEAGAJIACABIAAAAIAHADIAFgEQAHgCAGACQAIACAQAJQAIADAJACIAPADIAXADIAWAFIAVAFIAUAFIBQARIAFABQAGgFAOACIANADQAJADAFAAQAEABAJABIANACIAXAGQALAEASACIAeAEQAPACAJAGIAGAFIAdACQAKAAAHACQAJADAHAFIABABIAIgCQARAAAMAFQAGAEAHAGQAGAGADAHQAEAHAAAGQABAGgEADQgDAEgIABQADAFAAAGIABAKIABAJIABASIACASIgBAMIAEASQABAJgBAOIABAXQAAAIAEARQACAMAAAUIgBAOQAFgBAGACQAEABAEADIAAAAQABAAACAFIABAzQAGg2ADABQADgEAKABIAEABIgBgGIgEgaIgFgfQgDgYABgLIACgUQABgOgGgeQgGghAAgNIAAgUIgBgJQAAgFABgDQACgKALAAQALABAMALQAIAGAEAIIAEAEIAOATQADAFAOAQIAzA7IAqAnIBTBRIArAqIAyAyQARAPAFAKIACAEQAGgBAGACQAIAEAHAHQAGAGAEAHIABAAIACADIAIAEQAHAEAEAGQAHAHADAGQADAIAAAGQgBAGgFADQgEACgGAAIgCAAg");
	this.shape_131.setTransform(747.9807,369.5917);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFCC66").s().p("AJRGWIozhwIgGgEIh8jNIiNBMInInOIBth9IH8HuIK6CLIBQDbg");
	this.shape_132.setTransform(747.175,349.75);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#999999").s().p("ABnEiIgGgEIgCgCQgEgBgFgDIgQgFIgJgFIgJgBIgjgHIgPgDQgHAAgGABIgLAGQgHAEgGgCQgGgBgDgEQgFgCgCgFIgCgCIgQgGIgpgNIgRgDIgSgDIgMAAIgRACQgHAAgEgDQgGgEgCgFIgGgCQgJgFgJgJQgIgHgGgJIgEgGIgHgHIgFgCIgKgFQgEgDgEgFQgCgEACgCQACgEAFABQgEgKgBgIIgDgSIADASIgBgBQgDgKABgHIAAAAQABgGAEgBQAAgBABAAQAAAAAAgBQABAAABAAQAAAAABAAQgDgEAAgFQgJgYgBgPQgBgHABgEIAAgKIABgIIAAgFIAAgFIAAgBIABgHIgEgKQgEgKgCgJQgCgLACgEQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAAAIABAAIgEgRIgDghQgHgGgIgNIgBgBIAAgBIgJgQQgDgKAFgDQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABAAIAIABIAIACIAAgCQgFgMACgDQADgBADAAIgDgEQgIgQgEgPQgDgOADgMIADgHQgEgCgDgFQgDgFgCgFQgBgHABgEQAAgDAEgFIABgGIgCgGQAAgGACgCIgCgDQAAgEABgCQADgFAIAEIAIAEIAHAIIALARIABACIADAAQADgBAHADIAKAEIAFAGIAFAGQADAEAMALIAIAJIAFAEQAQAMATATIAAgFQABgFAGABQAFACAGAHIAGAMIABABIAAABIAEACQABgDAGABIAKAFQAHAFAJAMQAMAMAXALQAZANAKAHQAGAFACAAIAEgDQAEgCAGAGQAHADAFAGQADABAHAFQAGADAFAFIAEAAQAEAAAKAGIAZAPIAKAEIAkANQAXAHAjAIIBCAQIANADIAFAEIARgBQAKABAEACIAGABIAGABQADAAAGAEQAEAFABADIAAAIIgBAHQgBADgFAEIgHAHQAFADABAGQABADgDAEQgCADgCABIgGABIgLABQAFAJACAJQADAGAAAGQADASgGAQQgGALgNAPIgGAGIgKALIAmhNIgmBNIgfAhIAAACQADAHgEACIABAAQACAFAAAHIAAABQAAAMgJABIABACQAGAFABAEQABAFgEACQgEABgFgDQgGgCgHgFQgGgEgBAAQgCgCgDAAIgDgBIgGAEQgDABgJgBQgIgCgCACQgEACgDAGIgGAHIgJABIgDAFQgCAEgCABQgFAAgCABIgCADIAAAEQgCADgDAAIgFgBgACUANIABABIAAgBIgCgBIABABg");
	this.shape_133.setTransform(640.3775,227.9976);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#CCCCCC").ss(12.2,1,1).p("AoIk7QBNg6G7gXQDZAwE/KGAAJGNQh4lWlnkaQg5gdgIgX");
	this.shape_134.setTransform(855.05,481.975);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#333300").ss(7.5,1,1).p("AgWpKQnED0F/ORAEMozQrvEZItNl");
	this.shape_135.setTransform(713.9985,214.2);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#666600").ss(9.4,1,1).p("Ahjg1QAXA1AtA5QAFAFAEAFQAOARAPASIACACAhohAQA7AkAehLIB2C7IACAE");
	this.shape_136.setTransform(836.375,337.425);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#663300").ss(9.4,1,1).p("AAkggQAGgDAEgCQAFgFADgDQAGgBAEgBAg/AhQABADACADQAJAFAMAE");
	this.shape_137.setTransform(843.075,349.2);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(9.4,1,1).p("ABDhYQAGgEAFgCQADgCAEgBQALgCAKgDQA1gNBkAwAj8BqQgKg0AHgjQAUhnDDBJQAPAwAGgnQAEgfAegZQARgOAYgL");
	this.shape_138.setTransform(841.035,354.2698);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#006600").ss(11.2,1,1).p("AiCkJQBMBnBoBuQBTBXA4B8QABAFAGARAjDj8QBIBogGB0QgGBnCOCaQAFAFAFAGIAAAAAAfD7QAHAGAIAJ");
	this.shape_139.setTransform(832.075,325.875);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#006600").ss(1.9,1,1).p("AAMgDIAEgCQACAAAEgBIAEgBAARAAQgBAAgBAAQgCABAAABIgDgBQgCAAAAABIgBABQgBABAAABQAAABgBACAAEgBIgBABQgCAAgBACQAAADAAAEAAEgBQABAAABgBIAGgBIgGAAQAAAAAAABAgRAIQAIgDACgBIAEgCQACgCAFgBAgZAEQACgBACAAQACgBABAAQAEABAAgBIAAAAQAAgBACAAIADAAQACAAABgC");
	this.shape_140.setTransform(814.125,298.05);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#000000").ss(3.8,1,1).p("AsH23QBcAFCUBEACAW4QgWhPBShIQAKgJAMgKQBKgDA3AWQBfAkAqBrQAShYAdg3QBRiWCsBlADSUOQllkshmDm");
	this.shape_141.setTransform(805.6,455);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#663300").ss(11.2,1,1).p("AhBBQQgSgEgZgNABthOQh6gKgEBgQADAggGASIAAAB");
	this.shape_142.setTransform(721.125,287.5033);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#333300").ss(11.2,1,1).p("AiJhDQBACaBmBmAjYi9IBPB6ADZACQiRBIjRiN");
	this.shape_143.setTransform(707.35,274.9);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#333300").ss(11.3,1,1).p("AIzgrQlAlxk4hZQiTgqiRATQh1AQh0A3Qj4CwB2HyQAkCEBDB+AAcFVQBhm1EFEZQEEEZhrBBALeIMQBKh2hyjjQgrhWhIhw");
	this.shape_144.setTransform(747.8187,208.0148);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#000000").ss(7.6,1,1).p("AkvgOQAgALAkANAnvB6QAaiWCmAOQAXioGfBgQAkgWA1gFQBogLCoA6ABOgbQAVgmAkgV");
	this.shape_145.setTransform(886.275,523.1194);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(0.1,0,0,3).p("AkuiPIgNggIALgRIAKACIBFAvIAXAEIgPgpIALADQAMAHANAGAhxi1IACgVIAkAIIAMgIIAYgHIAPADAiRivIgIgXIAKADAizhTIAOgLIAQAEIABghQAOgLAWAUIAmAIIgDgIQAEgEgBgEAh/AbQgJgaAYgMQAZgMAsAJAg7huQAJgGAIgDQAIgCgCgFIAkAHQAWgEgCgaQAHAEACAAAAPjXIAVgEIAGACQAGgFABgDQAOAEAAgEAA/iaQAFABAFADQAGgDAAgCIAhAGIgDgKIAMACACKhGIAFALIgrgIIAGAQIgKgCIAEAKAgNgGQgEgWAQgIIARAEIADAHIAOADIAkASIAOACQACgEAAgDAhGBdIAPgMIAPAOIgFgQIBMAQQAJADgHgNIAGgJIAKABIgBgCIAoAIADKhRIAFAOIgagFAB3A/QAGAFAGAEIARgWIALACQAHAIACAAQAQgJAVANQAHAEAGAEIgNgmIAVAFQANAHAAAEAD1AlIgCgIIAKACIAgAGQgFgWAOAJAFABwQgdgGgNAOQgOAPAJAaAD9AfIAEALQAKACgOgNgADoCUIgJgCIADAIIgXgEIAFAOQgHABgGgCIAGATIgkgHQgJgNgIgFIAnA0IgPgDAB3DHIgZgFIAGANIgggGQACAIAAACIgNgEIAEANIgWAI");
	this.shape_146.setTransform(857.8712,480.6468);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000033").ss(11.3,1,1).p("AgzgJQAigjBYAVAhGAfQABgKAEgJ");
	this.shape_147.setTransform(957.175,399.9527);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(2,1,1).p("AHWqOQgpAEADAwAhaFgIAFgBIBsg0AnVBlIAFgVIACgJIAZAPIDGCAIAMAIIBfECIAOAnAidIHIgTgzIhVjlIjPiEAhNIHIgCgZIgPiTAA2FUIhmAwIALB1IADAOAAdExIAYAdAk1KPIg3iIAkLKPIgSiIAlGIHIA2CIAjzIHIASCI");
	this.shape_148.setTransform(1113.3,588.975);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#000000").ss(0.1,1,1).p("AAuigQAIAKAIAKQAvA8AcAzQAXAsAJAnQAPBEggAwQgHAKgJAJQAAAEgBABQgIAMghgHQgvgLgtgdAAGi7QADABAEABQACABACABIAAAAQAOAHAJAIQAEAEACAEQAEAGABAIQABAJgMgfQACAOABAOQAEA5gPAtQgOAqAYAyQAJAUAPAUQA2BMAQATAg8BtQAAgBgBAAQgBAAAAgBQgbgagUgbQgkgwgSgzQgahTAngtQAEgFAFgFQAPgNAUgFAgQCSQgBgCgCgBQgMgIgLgLAgDCaQAAAAgBgB");
	this.shape_149.setTransform(1167.952,535.6656);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#333300").ss(14,1,1).p("AnWnlQAXAOAdALQAAgDABgBQgegOgXgHQhBgRgOArQgJgkgWgaQAfACADgfQAbAlAxAcgAmHnEQgNgGgNgGQBbkQHDIOQLgBaihIPQgwCeg9A+AminMQANAFAOADQgfAEAEgMgAolmAQABACABAEQAAgFABgEQAmgeB1gjAolmAQACgCABgBQADgogGggQgKAaAKAxgAI4KIQiLBijLlbQnWg4i7mMQjajOBNhmQAGgJAIgGQAEgFAFgDAoiomQAFglgihSQgGBFAjAygArVpQQBlBGAsABQgtg3hngS");
	this.shape_150.setTransform(1042.4867,506.7139);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(11.3,1,1).p("AAoBPQADhjC9AjAjaACIAAACQAJARAIASAkZhQQAfAaAaAvADqBFQAhiuCvDdAm5hgQBJgjA5Af");
	this.shape_151.setTransform(1011.925,413.5399);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#663300").ss(12.2,1,1).p("EgikgXsQmEhuBXCzA6eVRQAGAEAEAEQASANARAOQAYAUAWAUQBCA6A2BAEAhLABqQAJALAIAMQACADADADEAnDARHQAJAHAKAHQAGAEAGAEAeQgaQAIADAIAE");
	this.shape_152.setTransform(931.5783,445.5029);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(12.2,1,1).p("A4RtPQgQiCBHgiQAwgXBbAXQAQAEASAHAS4PwQBCgyDwAnQAFABAGAAQABABAAABQAPALAQAN");
	this.shape_153.setTransform(1032.0611,457.4);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(8.5,1,1).p("AmIAWQACgFADgEQAZgpA0gKAkcgpQBSgECHA6QBDAeBOAtABuBbQgJgsAEgiQAMhrCOAFAEhhWQAuADA6AQ");
	this.shape_154.setTransform(844.275,384.439);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(11.2,1,1).p("AsCgrQgsi3CWgZAphi1QhXmLE3E7QgMiHFMDGQAdhtCIBHQBUAuB/BxAJ3GSQhYjXDtBX");
	this.shape_155.setTransform(811.201,284.0997);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#FFCC66").ss(11.3,1,1).p("ApMphIKvCPIANEcIABAzAJqAXIBQDcIhpgVIAKFwACfmyIHLHJIq6iKIn8nuIhtB8IHIHPICNhMIB8DMAhkhiIAJIFInjmJIgOl6AHSJiIjpgvAAeBuIIzBw");
	this.shape_156.setTransform(967.075,352.975);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#663300").ss(16.9,1,1).p("Ap8qnQAchbB6B5QCMgtC1EoAhilvQAgACAaApA17wPQACgBAHgKA17wPIgBgBA1swAQgIgJgHgGAz0vlQh7iCgNBXQgvgugQAPQgSANBRASASRN8QATAVAWAbASRN8QFLBLgfBtAOMLuQCBAACECOAAdjcQCkA6ASBq");
	this.shape_157.setTransform(955.8773,311.968);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#999999").ss(11.3,1,1).p("AlRi7QBZgYBaANQB9ARB9BYQAKAHAKAHQBxBTByCOAlRi7QBKh9BOgzQBeg/BiA5QAlAUAmAoQAeAfAfArQArA8ArBSQA3BmA3CJIg7B1IgnBMIgcA6AkREUIACASAkxA2IAcDeAlRi7QECD8EJA+QBMASBNABAlRi7IAeDR");
	this.shape_158.setTransform(861.05,196.6643);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#990000").s().p("AARBBIAKgEIAEgCQACgCAGgCIgBACIgEACIABAHIgHAAIgLgBgAAiA7IAEgCIABgCIACgBIAGgBIAEgCIAGgBIAEgBIgEABIgGABIgEACIgGAAIAAABIgCABQgGACgCACIgEACIgKAEQgFgBgDgDIAEgBIADgBQABAAABABQABAAAAAAQABAAAAAAQAAgBAAAAIAAAAIACgBIADAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAABgBQgBABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAIgDAAIgCABIAAAAQAAAAAAABQAAAAgBAAQAAAAgBAAQgBgBgBAAIgDABIgEABIgFgCIgCgBQgGgFgHgIQgJgTgJgRQgIgOgKgPIgKgMIgMgPQgDgUBSACIAJAOIgEgCQgRgHgRAAIgBAAIgFgBIAAAAIgBAAQgLAAgHAEIgBABIgBAAQgJAGgDAKIgBADIACAFIgCgFIABgDQADgKAJgGIABAAIABgBQAHgEALAAIABAAIAAAAIAFABIABAAQARAAARAHIAEACQAFAJAIAIIAAADQgBAPgMAGIgBAAQgIAFgMAAIgBAAIAAAAIgEAAIgCgBIgDAAQgVgCgNgLIgBgBIABABQANALAVACIADAAIACABIAEAAIAAAAIABAAQAMAAAIgFIABAAQAMgGABgPIAAgDQALAPAPAOQgBAFAGAEIAAABQgBAAAAAAQAAABAAAAQAAABAAAAQAAABABAAIAFAPIABADQACAKAAAKIgKAIQgJAHgKADIgCABIABgDIABgCIABgBIACgBIADABIACgCIACgBIgCABIgCACIgDgBIgCABIgBABIgBACIgBADIgFABIgBgHgAAoBBIAAAAgAApA2IAAAAgAApA1IAGAAIgGABIAAgBgAAvA1gAAggiIAAAAgAATgzIAAAAg");
	this.shape_159.setTransform(810.6448,292.3359);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#006600").s().p("AA0ENQgGgCgGgFIgDgDQgHgFgFgHIAAAAIgBgCQgDgEgBgFIAAgGQgBgEABgCIgFgBQgLgDgLgLQgLgLgDgLQAAgGADgEIgBgBIgBAAIgFgJQgDgIgGgIIgMgSIgJgOIgZgyQgFgHABgEIACgBIgBAAQgMgJgGgMQgFgKADgHIAAgBQgHgHgDgIQgEgJACgGQADgFAJgEQAHgEAFgBIAEgBQgDgDgBgEIAAgBQgCgGgDgQIgHgaQgBgHgCgDIgJgOQgMgQgEgKQgCgIACgHQABgHAHgDIgYglIgKgPIgLgPQgFgJABgHIABgDIgBAAIgDAAQgCAAgDgCQgEgCgBgDIgCgCIgDgBIgHgDIgEgFIgCgDIABABIAGACQADADAFABQAIACAKgBIAFgBIACgBQAKgDAJgHQACABADAEQADADgCADQACACgBADQACADgDACIgDABQAGADAHAIQAHAHAJAOIAiA0QAGAAAIAEQAHADAHAGQAGAHAKAOIAUAkIADACIAHAGIAGAGIAFAJIAGACQAJAEAHAHQAGAHAEAIIACAHQAIAFAGAGQAIAJACAIIABAAQADABAGADQAIADAHAGQAGAHAHAOIAiA9IALAVIAIAOQAHAKAGAOQALADAKAJIAHAMIAHAVIgVAFQgEABgDADIgEgCIALgCIgLACQgHgDgGgGQgGgGgFgHIAAgDIgNgDQgFgGgEgLIgHgPIgKgSQgKgNgNgaIgVgoIgMgTIgEgJIgKACIgcAMIgIADQADALgFAGQgDAFgJgBQAAADgCADQgGAGgOgFQgJgDgIgIIABAFQgBAFgDAEIgCABQgEACgIgBIgCgBIACAFIAiA/IAJANIAQAaIABABIAHAAQAHADAHAFIAGAFIAIAKIAEAKQACAIgCAFQAGAAAIADQAHADAFAGIACACIABABIAEAEQAEAFADAGQACAIgBAGQgBAHgGABQgDABgEAAIgHgBgACwDJQADgDAEgBIAVgFQgCAEgDACIgEABQgEADgFAAIgKgBgADMDAIAAAAg");
	this.shape_160.setTransform(831.25,324.725);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#CCFF00").s().p("AiXCyIgSiIIAqAAIASCIgAAnAqIgDgZIgPiSIAJAEIgFABIAFgBIBsg0IACABIAFAFIAYAcIABAHIhnAwIALB0IADAOgAAeh9g");
	this.shape_161.setTransform(1101.7,636.7);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AiZgiIANg7IEnC7g");
	this.shape_162.setTransform(1033.4,486.325);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFCC").s().p("AghBVQgPgUgJgVQgZgxAPgqQAPgugFg5IgDgcQANAfgBgJQgBgHgEgHIAQAUQAuA8AbA0QAYArAJAnQAOBEggAwQgGAKgJAJQgRgTg0hLgAASgDQAFAQgDAIQgBAHAFAKIADAGQADAFAFAEQAEADAEgBQADAAAEgCQAFgFABgEIAAgCIgKgQIgGgJIgNgSQgGgJgCAAQgCAAABAHg");
	this.shape_163.setTransform(1178.0065,536.65);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#CC3333").s().p("ABxDHQgvgLgtgdIgCgBIgEgEIgBgBIgBAAQgDgEgDgBQgBgBAAAAQgBAAAAAAQgBAAgBgBQAAAAgBAAIgCgDQgMgIgLgLIgDgCIgOgMIgBgBIgBgBIgBgBQgbgagUgbQgkgwgSgzQgahTAngtIAJgKQAPgNAUgFQAkAHAdADQAWADAZABIAHACIAEACIAAAAQAOAHAJAIIAGAIQAEAGABAIQABAJgMgfIADAcQAEA5gPAtQgOAqAYAyQAJAUAPAUQA2BMAQATQAAAEgBABQgFAIgPAAQgIAAgNgDgAhfhFIAAgFQAAgrAngEQgnAEAAArIAAAFg");
	this.shape_164.setTransform(1166.076,535.6656);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("ACeFXQnWg4i7mMQjajOBNhmQAGgJAIgGIAJgIIACAGQAAgFABgEQAmgeB1gjIgagMIAaAMIgbgIIAbAIQgfAEAEgMQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQBbkQHDIOQLgBaihIPQgwCeg9A+IgJAFQgKAGgEAKQgfAWgiAAQh3AAiekPgAk4kmIE1CBIkni8gAppm4IADgDQgBAEAAAFIgCgGgApmm7IAAAAgAnLn8IAAAAgAnLn8IAAAAgAqIpBQAfACADgfQAbAlAxAcQhBgRgOArQgJgkgWgag");
	this.shape_165.setTransform(1049.2704,512.3175);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFCC66").s().p("AJRGWIozhwIgGgEIh8jNIiNBMInInOIBth8IH8HtIK6CLIBQDcg");
	this.shape_166.setTransform(967.075,334.6);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFCC99").s().p("AHmJUQgNgBgOgIIgCgBQgFAAgGgBQgTgEgRgOIgJgHQgDADgEABQgJAFgPgDQgKgDgGgDQgGADgIAAQgKABgLgEQgNgGgNgKQgLACgOgEQgQgGgMgLIgCgCQgEAEgFADQgJAEgPgEQgOgEgOgKIgCgCIgLgCIgFgCQgMgGgLgKIgHgEQgJgKgHgLIgDgFIgFgBQgNgEgOgMIgCgBIgEABIgGABIgBAAQgFAHgIACQgKACgLgEQgMgDgLgIIgDgCQgHACgKgCQgKgDgNgHIgGgFQgPgLgKgOQgKgOgCgOQgEgOAGgIIADgDQgCgHABgIIgCgJQgBgGABgGQABgFAEgEQgCgJAAgKQAAgHABgGQgKgOgCgNQgCgOAGgJQADgEAGgCQgFgWABgjQAAgOADgHQgDgGgBgGIgBgEQgFgNACgKQgIgKgFgLQgIgQACgLQABgMAJgFIADAAQgFgEAAgEQgDgFAAgDIAAgGQABgGAGgDIAAAAIgDgBQgGgHgCgIQgDgJADgFQACgFAHgBQAIgBAIAEQAIAEAIAIQAHAHADAIIADAIIAJAJIADAEQADAGABAFQADAIgDAGQgCADgDACQANAKAKAMIAGALQAHADAKAFIADADIAGAEIAMAKIALAPIGxBWQABgCADgBQAGgHAKAAQAMAAANAHQAOAGAMALQARAPAHARQAHARgDANQgDAGgDAEQAGAKACAKIABAFQABANgHAIQgDADgEABQAHAKADAKQADANgFAJQgDAFgEADIAGAJQAFANAAAMQgBALgHAGIgFADQAIALADALQAFANgDAKQgEALgKADIgDABIAAAAQAMAOAEAPQAFAOgFAKQgEAKgNADQgJACgOgFIgFADQgIAFgMgCQgBAJgGAFQgHAGgKAAIgDAAgAiRFoQgNgFgOgLQgNgKgIgNIgFgIQgDgGgCgHQgDgCgCgDIgHgKIgRgJIgWgSIhOhDQgKgJgIgGIgWgSIgEgDIgOgFQgNgFgNgLQgNgKgIgNQgHgDgIgGQgJgFgOgPIgUgUQgNgDgMgIQgPgJgLgNIgHgLQgFgHgDgIQgFgNADgJIAAgDIgBgNQgBgGABgMIABgHIAAgKIgDgdQgDgTAAgKIAAgaIAAgKIAAgLQABgKAIgGIADgBIgHgpIgGgXIgDgZIgFgYQgDgPADgHQADgIAGACQAEAAAFAEQAEAEACAEIAAAEQAFAEAHAJIAGAHIAJAHQAKAIAIAKIADAEQAAABAEADQAJAGAHAIIAIALIAIAHIANAOIAHAHIBdBdIATASIAGAFQAUARAPASIAHAJIAIAIIAOALQAMAJAOAMIABACIAJgGIANgHIADgJQAHgXATgCQAKgBAMAEIABgBQAIgCADgDIABgBQAGgEAFACIAGACIAEADIALALQAFAIgFAJQgCADgBADQAGAFADAIQAJANACAMIAAADQAAAFgBAHIgDAOIgFAbIgCANQAJAOADASQADAQgFAYIgIA+QgFAiAAAlIAAAJQAGAGADAGIACADQAGAKACALQACAMgGAHQgEAJgLACIgFABQgJAAgLgFgAIcgFQgHgCgIgFIgKgJIgBAAQgFABgOgEQgPgFgjgHQg3gKgdgDQgNgBgFgBQgKgDgIgFIgBgBQgKgGgFgJIg2gDQgUAAgHgDQgKAAgOgEIgZgFIgrgJQgXgFgWgHIgqgOIhBgRIgQgDIAAACQgCAFgEAEQgDACgHgBQgGgBgHgEQgHgDgGgHIgGgGIgBgBQgFABgFgCQgHgBgKgHIgPgLIghgfIgVgWIgcgZQgmghgfggIgugzQgcgegUgTQgDgEgWgTIgYgWQgSgSgDgOIAAgCQgLgEgHgFQgJgIgGgKQgHgCgGgGQgFgFgEgGQgFAAgEgCQgHgDgIgHQgHgHgDgHQgFgIABgHQAAgGAFgDQAEgDAIACQAHAAAIAFQAHAEAGAJIACABIAAAAIAHADIAFgEQAHgCAGACQAIACAQAJQAIADAJACIAPADIAXADIAWAFIAVAFIAUAFIBQARIAFABQAGgFAOACIANADQAJADAFAAQAEABAJABIANACIAXAGQALAEASACIAeAEQAPACAJAGIAGAFIAdACQAKAAAHACQAJADAHAFIABABIAIgCQARAAAMAFQAGAEAHAGQAGAGADAHQAEAHAAAGQABAGgEADQgDAEgIABQADAFAAAGIABAKIABAJIABASIACASIgBAMIAEASQABAJgBAOIABAXQAAAIAEARQACAMAAAUIgBAOQAFgBAGACQAEABAEADIAAAAQABAAACAFIABAzQAGg2ADABQADgEAKABIAEABIgBgGIgEgaIgFgfQgDgYABgLIACgUQABgOgGgeQgGghAAgNIAAgUIgBgJQAAgFABgDQACgKALAAQALABAMALQAIAGAEAIIAEAEIAOATQADAFAOAQIAzA7IAqAnIBTBRIArAqIAyAyQARAPAFAKIACAEQAGgBAGACQAIAEAHAHQAGAGAEAHIABAAIACADIAIAEQAHAEAEAGQAHAHADAGQADAIAAAGQgBAGgFADQgEACgGAAIgCAAg");
	this.shape_167.setTransform(967.8807,354.4167);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#663300").s().p("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QgCACgGgCIgKgDQgLgEgWgCIgmgGQg0gHgbgGIgygNQgMgEgygGQgmgGgagIIgFgDQgGgDgFgFIgaAEIAAAAIgEAJIgOAPIg1A3QgTATgJAPIgHAOQgKANAAAEIgCAEIAJAIIAHAIIAMAMIAMAPIAJAKIASATIAZAeIAJAKIABACQAFADADAFQAEAFgBAFQAAACgCAGQgBAFACAZQABAJgBAQIABAaIAAAEQAHADADAIQACADACAJQACAVgBARQACAFABAHQAKAdgGAWQgFARgKAKQAAAEABADQACADgBAFIAAABIADAPQAEAPAAAIIABAIQAAAIgBAJIgDAKIgCAHIABACQAGAGgBAGIgCAFIgDAEIgBADIABABIADAFQACAEAAADIgDAEIABAEQABAFADADIAFAGIABACQAIAHAFAKQADAAAGAFQADACAEAHIACACIAHAFIApAaQAIAFAGAFQAEADACADQAiATAcAeIAPATIALABQAXAFAZAPQAYARATAVIAGAJQAJAIAJAJQARATAJAVQAGACAMAKIAEAEIALAFIALAFQAMAHAMAKQAUAQAQAWQAPAUAGAUQAEASgDAOIgBADQgEAMgJAHIgGADIgGADIgDABIAHAIIADAEQABAEADADIABgEQAHgKAKgEQgBgMADgKQAIgQAQgGQASgEAZAHQAZAHAXARQATANAQAUIACADIALAPQAIgGAOgBQAPgCAUAGQACgCADgBQAOgGAVAEQAUADAUAMQAVAMATARQASASALATIABACIAFAIIABADQAGANACANIABAHIADADQACgBADAAIABgBQgCgPAIgLQALgPATgCQAUgCAaALQAOAGANAIQAMgDAPACQAWADAVAMQARAJANAMQARALAPAOQAHAHAHAJIAHAKIAIgEQAGgEACgDQAFgGADgQQAIgTAcgHQAdgIAcAGQAeAHAZASIALAKQgBgXAJgPQAKgQATgEQAUgFAZAJQAcAIAXAUQASAPAbAhQASAXAKARQAHgLAIgTIAAgBIgDgDIgKgJQgFgGgDgIQgBgJgDgEIgHgFIgFgEQgDgCgJgLIgOgOQgJgIgFgFIgHgKIgIgJIgOgJQgLgFgEgEIgJgJIgKgEIgOgIIgPgJIgBAAIgQgDIgHgBIgIAEQgHAAgJgDIgCgBQgFAGgHAEQgFABgCACIABABQAAAIgGABIgBAAQgCADgHgCQgDAEgIgEQgKgGgEgPQgDgMACgIQAEgMAAgFQACgIgCgMIgEgdQgCgJAEgBIADAAQgIgSgCgPQgCgRAIgMQgDgOACgMIADgJQgKgTAAgSIAAgBQgBgHABgGIgCgIQgHgWAIgRQAJgRASgEQAUgFAaAJQAaAKAXATQAXAUAQAYIACAEIAGAMQAGALACALQAYAGAUAIQBAAZAzApQAUAQAeAdQAkAjANALIAdAZIAcgJQA3gLA6AWQAdAKAZATQAdATAQAZQAJAOAFAOIAMAFIADABQAPAHARANIAfAYIABAAIhJAAIAAABIA1AAQAcAbAMAOIABABQAgAkAfAyQATAFATAPQAUAQAPAXIAFAHIACADQADgDAGAAQAKgDAOADQAcAFgKgPQgJgPAxAyQAwAzAUAWIAVAbQBfDBgxgGQBHBughA0IADAFQDVCXgjAfQCCB/A6CCIAHAPQBBCdgnChIgHAGIgEAFQgHAJgFAIIAEAMIpLAAIAQDPIg5AAIAlHaIjQAAIAPCIgAfCeRIADARIABABIAIAAIAqAAIADAAIAAgFQAAgGACgBIABgBIgIgBIgMh1IBngwIgBgGIgYgdIgFgFIgBgBIhtA0IgJgEIAPCTIgLgDIACAKgAdtd/IAGASIACAGIAEAMIAFAAIAmAAIAHAAIABgBIAAAAIAAAAQgEgEgCgEIgBgDIAAgCIgBgCIgCgCIgCgCIAAgEIAAgEQgDgEgBgEIgBgBIgFgCIhekCIgCgHIgLgBIjGiAIAHADIAAgDIgDgCIgJgGQgEgDgBgCIgBABQgHABgIgHIgDgDIgEABQgBABACAEIAAAAIADAJIADAAIgGAVIABAGIDPCEIBVDlIgDgBIAGAQgAeaUzQgKgRgEgRQgEgSAEgNIADgFQAEgKAKgFIAJgFQAJgCAKAAQASABAUAIQgIgWAEgRQAFgRARgHQAGgDAHgBQgHgSACgPQADgVAUgJQAPgGAVADQgHgTADgQQACgGASgiQgMgZABgUQACgVARgKQAEgDAHgBQABgQgEgKQgEgNABgJQABgNAFgJIgDgFQgUggACgaIADgPQgNgTgDgTQgGgbALgQQAIgKAMgCIACAAQgLgFgJgGQgegSgUgaQgUgbgFgaQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQgKgEgMgHQgcgRgWgbQgRgVgHgUQgXgGgYgQQgcgSgTgbIgFgBIgFgDQgHADgJACQgcAGgggQQgZgNgUgUIgNgEQgPgFgOgKQgDAKgIAHQgQARgdgGQgTgCgWgNQgKgGgJgHQgNAAgQgFQgfgKgagYQgdgYgOggIgCgFQgNgGgMgJQgjgagRgkQgKgSgCgRQgNgEgOgHQgWgMgUgTQgUgTgMgWIAAAAIgLgHQgPACgTgFQgbgHgZgTQgYgTgSgXQgSAGgbgJIgIgDQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQgHATgXAFQgJACgIgBQAAAagTAJQgRAHgXgFQgWgEgUgMIABAEIAGABIAEACQAEACAEAGIABAHQAAACgFABIgKAAIgDABQAAAAAAABQgBAAAAABQAAAAAAABQAAABAAABIAAAIIgDADQAAABgFgBQgKgCgDgEQgEgEgCgHQgDgHABgEIADgEIAFgDIACgDIgBgBIgHgSIgBgFIgXgXQgSgWgIgXQgHgXAGgRIADgIIgGgQQgagJgOgCIgOgDQgGAJgJAIIABAKQgBAQgCAGIgCAGQgCAEABAEIADALQAEAIAAADIgCAKQgBAGAAAEIAFAIQACAFAAACQAAADgEABIgGADQgBADgBAGQgEAEgHgCQgIgCgGgHQgJgJACgKIABgFIhbgTQgBAFgEADIAQAQQAJAJAFAJIADADIAHAOIAKADQAjAQAaAdQAPARAJARIAGABIAGABIAAABIAJAGQAWAWAOAbQANAagCAUQAAAJgDAHQgIAGgGAIIgBABIgFADQgCALgHAJQgLAOgUACQgOAAgQgEIAAANQAKAJAKAMQARATAKAUIAAACQAUATALAWQALAXAAAUIgCAPIAKAJQASARAKATQAHAIAEAKQALAGAKAKQAVATANAWQALATAEATQAQAVAFAVQARAKAOAPQAWAWAMAaIACAGIAHAEQAfAXASAeIAHAOQANAJALALQAJAIAGAIQAQAGAPALQAWAQASAWIAFAHQASAGAUANQAJAFAHAHQAOgBAVAHQAcAKAYAVIANAMQAIgEAJgBQAVgCAYAKQATAIAUAPIANAKQALgJAQgBQAUgBAaALQAbAMAVAUQAPAOALAPQAJAIAJAKQASATAJAUIACAFIAJAIQASAQANATQAOAUAFASIACALQAdAOAlANICPA3IAYAJIAAAAgEAsGASNIgCgVIgCgaQgIgLgGgEIgFgDIgEgEQgBgBAAAAQgBgBAAAAQAAgBgBAAQAAgBAAAAIgDABIgEAAIgGgDQgEgGABgGIAAAAIAAgDIABgCIABAAIABgBIAAgBQABgDADgBIADgFQADgOAHgQIAAgEIACgJQACgGABgIIAAgCQAAgPgHgVIgCgKIAAgEQgCgEAAgDIgBgDIgCgGIgDgMIgCgKIAAgCIgDgFIgBgDIgLgWIgFgIIgEgIIgDgHIgKgSIgLgPQgFgIgBgBIgFgIIgBgFIAAgBQgFgCgGgHIgHgOIgjgsIgCgBIgEgEIgBAAIgCgCIgHgFIgJgGIgBgBIgBABIgDAAIgEgCIgCgBIgBgBIgEAAQgZgBgXgDQgdgDgkgHIgKgDIgJAEQgQAGgFAIIgCADIgGAJIgJAJIgDAIQgFAMgBAIQgCAIgBARQgCAMABAKIAEAVQANAwAPAfIACAEQADABACADIADAGIAFAGIAJAPIABAAIAHAJIABABQAHALAEAEIALAMIAbAaIABABIABABIABABIAOAMIADACIAEAGIAAABIAFAEIADADIABAAQAHAEACAEQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAAAABABQADABADAEIABAAIAAABIABAAIAEAEIACABIADAEIABADIACAFQABABAAAAQAAABgBABQAAAAAAABQgBAAAAAAQgCACgEgBQgDgBgEgFIgCgEIAAgCIgFAAIgDAAIg3ABQggACgMACQgFABgCgBIgCgBIgFAAIgJAEIgCABIABALQgBARgKAIIgDADIABADIABAKQAAAKgDAHQABAAABAAQAAABABAAQAAAAAAABQABAAAAABQAEgIAIgFQAMgFARAFIACABIACgDQAIgMARgBIAHACQAGgNALgEQAOgEAPAGQAQAFAQAOQAKgDAPAFIARAKIACAAQAIgFANACIABAAIALAAQAIgHAOAAQAOAAAPAIIAMAIIAGgBIAGAAQALACANAHQAKAFAJAIgEAj2ARCIACABIgBgGIgBAFgEAr/ARCIABABIAAgBgAqJL9IAAABIAAADQgEANgHAJQgBARgLALQgIAIgKACIgFAKQAAALgEAJQgDAHgFAGIARAbQAJA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DAFAFIACACIAEgCIAMgDQAIgCAKAAQAVABANAIQAGADAOAKIAAABIABgBIAEABQADgBADACQAEABAEAEIADAEIACAEIAAAEIAFAFQAKAGAFAFIACAAQAJgIAYgQIANgIQgCgDAAgCQAAgFACgFIAEgJQAFgLAEgEQAEgEAJgFIAJgHIALgFIAKgCIACgCIAHgDQAFgDAFABIAEACIACAAIAHgDIAEgDIADAAIABgDIAEgCIALgEQAEgBALACIANAAIADAAQAEgBADABQAFAAAFADQAFgEAHgCQAPgGAWAFQATAEAUALIACABQAOAIANALIAAgBIAAgFIgEgIIgBgGIgBgEQgSgKgUgOIgegXIgCAAQgVgEgVgGQgBAEgEABQgHADgKgJQgEgCgCgDQgCABgEgCQgFgBgEgEQgFgFgBgGIgBgGQgPgigYgkIgagjIgZgjIgKgPIgOgQQgIgKgBgGIAAAAIgWgZIgIgJIgIgGQgGgEgHgIIgFgIQgEgCgFgGIgPgRIgKgKQgGgGgDgCIgKgLIgZgdIgMgPIgKgSIgJgMIgDACQgEgBgEgDIgIgGQgCgFAAgEQAAgEADAAQABAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAIgMgOQgHgBgHgIIgCgDIgMgJIgGgEIgCgCIgJgHIgBgCIgFgPQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIABAAIgBAAQgFgGAAgEQgOgPgLgOQgIgJgFgIIgJgOIgCgDIgFAAIgyADQgEADgDAAIgGACIgGABQgDADgEAFIAAABIACADIAMAOIAKANQAKAOAJAQQAJAQAIATQAMAbAMAjQAlBzgFBIIAAAaQgBAOADANQACAKAIASIANAcIAFAMIABAAQAEABAFAEIAGAIQACAEgBACIAAACIAGAHIAIARIAHAQQAIANAKANIAMAMIALAMQAFAGACAGIADgBQAFAAAFAEQAIAGAAAGQABAHgGAAQgHgBgGgGQAAAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQgEAHgSgEIgVgDQgMgCgFACIgHAFQgEABgFAAIgMgBIgQAEIgDACIgGAEIgDAGQgDAEgLAEQgCACgEAAIAEAFQAEAIgMAEIgHACIgCAFQgBAOgFAMIAAAAIADACQAGADADADIACAEQADAIgFACQgEACgHgDQAFAZAPAogAkayRIgIgsIgEgnIABgQIAAgGIABgDIgBAAQgFgFgBgGQgDgFADgEQAAgGAFgEIAKgIIAMgGQAGgDAMAAQAdAAAaAHQAWAFAWANIABgCQADgCAGABIAGAAQACgMADgLQABgHADgCIgLgPIgHgLQgDgFgFgEQgDADgGABQgGgBgKgEIgNgEQgKgCgGgEIgHgEQgJgCgFgCQgEgDgDgEQgMgCgHABQgJAAgEgBIgOgBQgOgDgHABQgRABgXANQgRAKgEAIQgCAIAAANIACAYQgBAIgFAQQgDAMAAAKIADADIAGAJIADAGIAFAKIAIAWIAHARQAEALAHALIAFAGIACAAIAEABIAIAFQAFACAIABIANADIAFABgA4A0OQiUhEhdgEQBdAECUBEgEAX9AgrQADgDAEgCQALgJAUACQAVAAAXALIACABgA2NYYIgOi9IALAJIgCgJIAjAbIAuAnQBCA7A2BAgAsXVuIAAAAgA2SVbIAAAAg");
	this.shape_168.setTransform(905.7528,445.381);

	this.instance_7 = new lib.phone_happy_mouth("synched",0);
	this.instance_7.setTransform(857.25,383,0.1523,0.1676,8.53,0,0,69.4,32.2);

	this.instance_8 = new lib.eyeblack();
	this.instance_8.setTransform(853.3,338.7,0.4983,0.4301,14.0072,0,0,13.7,25.2);

	this.instance_9 = new lib.eyeblack();
	this.instance_9.setTransform(880,344.9,0.4796,0.3776,12.2485,0,0,12.9,24.9);

	this.instance_10 = new lib.body_phone("synched",0);
	this.instance_10.setTransform(866.9,366.7,0.5916,0.572,0,0,0,139.1,109.5);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(11.3,1,1).p("AFCBeQAhitCwDcAiCAbIAAADQAJAQAIATAoShOQABgKAEgJAn+h3QAigjBZAVAlhhGQBJgjA5AeAjBg3QAfAaAaAuACABoQADhkC9Al");
	this.shape_169.setTransform(783.225,426.1527);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").ss(8.5,1,1).p("AEhhXQAuAEA6APAkcgpQB8gHDuCIAmIAVQAZgwA5gLABuBbQgli7C6AG");
	this.shape_170.setTransform(624.375,399.6141);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#333300").ss(14,1,1).p("AI4KIQiLBijLlbQnXg4i7mMQjajOBOhmQAGgJAHgGQAFgFAFgDQAAACABAEQAAgFACgEQAlgeB1gjQgfAEAFgMQgBgDABgBQBckQHDIOQLgBaihIPQgwCeg9A+ApEoJQAfACADgfQAEglgihSQgFBFAjAyQAaAlAxAcQAXAOAeALQANAFANADQgNgGgNgGQgdgOgYgHQhBgRgOArQgJgkgVgagArWpQQBmBGAsABQgtg3hngSAolmAQABgCACgBQADgogHggQgKAaALAxg");
	this.shape_171.setTransform(822.6117,521.9139);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").ss(2,1,1).p("AHXqOQgqAEACAwAAdExIAYAdAnWBlIAGgVIACgJIAYAPIDHCAIAMAIIBeECIAPAnAhaFgIAEgBIBsg0AA2FUIhmAwIALB1IACAOAhNIHIgDgZIgPiTAidIHIgTgzIhVjlIjPiEAjzIHIASCIAlGIHIA1CIAkMKPIgRiIAk2KPIg3iI");
	this.shape_172.setTransform(893.475,604.175);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#000000").ss(0.1,0,0,3).p("AA/iaQAFABAFADQAGgDAAgCIAhAGIgDgKIAMACACKhGIAFALIgrgIIAGAQIgKgCIAEAKADKhRIAFAOIgagFAD9AfIAgAGQgFgWAOAJAD9AfIAEALQAKACgOgNgAB3A/QAGAFAGAEIARgWIALACQAHAIACAAQAQgJAVANQAHAEAGAEIgNgmIAVAFQANAHAAAEAD1AlIgCgIIAKACADoCUIgJgCIADAIIgXgEIAFAOQgHABgGgCIAGATIgkgHQgJgNgIgFIAnA0IgPgDAFABwQgdgGgNAOQgOAPAJAaAiRivIgIgXIAKADAhxi1IACgVIAkAIIAMgIIAYgHIAPADAkuiPIgNggIALgRIAKACIBFAvIAXAEIgPgpIALADQAMAHANAGAizhTIAOgLIAQAEIABghQAOgLAWAUIAmAIIgDgIQAEgEgBgEAg7huQAJgGAIgDQAIgCgCgFIAkAHQAWgEgCgaQAHAEACAAAAPjXIAVgEIAGACQAGgFABgDQAOAEAAgEAgNgGQgEgWAQgIIARAEIADAHIAOADIAkASIAOACQACgEAAgDAh/AbQgJgaAYgMQAZgMAsAJAhGBdIAPgMIAPAOIgFgQIBMAQQAJADgHgNIAGgJIAKABIgBgCIAoAIAB3DHIgZgFIAGANIgggGQACAIAAACIgNgEIAEANIgWAI");
	this.shape_173.setTransform(637.9712,495.8468);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#663300").ss(12.2,1,1).p("AeQgZQAIACAIAFEAhLABrQAJAKAIAMQACADADAEEAnDARIQAKAHAKAHQAGAEAGADEgilgXsQhxgghJgIQiwgRA9B+A6fVSQAGAEAFAEQARANARAOQAYATAXAUQBCA7A1BA");
	this.shape_174.setTransform(711.7282,460.6754);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#333300").ss(11.2,1,1).p("AjYi8IBPB5ADZADQiRBHjRiNQBACbBmBl");
	this.shape_175.setTransform(487.45,290.05);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#333300").ss(7.5,1,1).p("AgWpKQk1CnBRHdQAKA+ARBDQAsCuBYDSAEMozQrvEZItNl");
	this.shape_176.setTransform(494.0977,229.35);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#333300").ss(11.3,1,1).p("AIzgrQlAlxk4hZQiTgqiRATQh1AQh0A3QjeCeBHGfQAIAxANA0QAkCEBDB+ALeIMQBKh2hyjjQgrhWhIhwAAcFVQBhm1EFEZQEEEZhrBB");
	this.shape_177.setTransform(527.9173,223.1648);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#999999").ss(11.3,1,1).p("AFTCSIg7B1IgnBMIgcA6AlSi7QEDD8EJA+QBMASBNABAlSi7QDhg8DgCoQByBTByCOAlSi7QBLh9BOgzQBeg/BhA5QAmAUAlAoQB/CCCDFFAkREUIACASAkxA2IAcDeAlSi7IAeDR");
	this.shape_178.setTransform(641.15,211.8143);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#FFCC66").ss(11.3,1,1).p("ApMphIhtB8IHIHPICNhMIAJIGInjmKIgOl6ApMphIKrCRIAREaIABAzAhkhiIB8DMAJqAXIq6iKIn8nuACfmyIHLHJIBQDcIhpgVIAKFwAAeBuIIzBwAHSJjIjpgv");
	this.shape_179.setTransform(747.175,368.15);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#663300").ss(16.9,1,1).p("Ap8qnQAbhbB7B5QCMgtC0EoAhjlvQAgACAaApASRN8QATAWAWAbASRN8QFLBMgfBsAOMLuQCBAACECOA1twAQgIgJgGgGIgBgBQgvgugRAPQgRANBRASA17wPQACgBAHgKAz0vlQh8iCgMBX");
	this.shape_180.setTransform(736.0023,327.143);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#663300").s().p("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DAPQAEAOAAAIIABAIQAAAJgBAIIgDAKIgCAIIABACQAHAGgBAGIgDAEIgDAEIgBADIABACIADAFQADAEAAADIgEAEIABADQABAFAEAEIAFAGIABABQAIAIAFAKQADAAAGAFQADACAEAGIACADIAHAFIApAaQAIAEAGAGQAEADACADQAiATAcAeIAPASIALACQAXAEAZAQQAYAQATAWIAGAJQAJAHAJAKQAQASAJAVQAGACAMALIAEAEIAWAKQAMAHAMAJQAUARAQAWQAPAUAGAUQAEASgDAOIgBADQgEAMgJAHIgGADIgGADIgDABIAHAIIADAEQABAEADADIABgEQAHgKAKgEQgBgMADgKQAIgQAQgGQASgEAZAHQAZAHAXARQATANAQAUIACADIALAPQAIgGAOgBQAPgCAUAGQACgCADgBQAOgGAVAEQAUADAUAMQAVAMATARQASASALATIABACIAFAIIABADQAGANACANIABAHIADADQACgBADAAIABgBQgCgPAIgLQALgPATgCQAUgCAaALQAOAGANAIQAMgDAPACQAWADAVAMQARAJANAMQARALAPAOQAHAHAHAJIAHAKIAIgEQAGgEACgDQAFgGADgQQAIgTAcgHQAdgIAcAGQAeAHAZASIALAKQgBgXAJgPQAKgQATgEQAUgFAaAJQAbAIAYAUQARAPAcAhQASAXAKARQAGgLAIgTIABgBIgEgDIgJgJQgFgGgDgIQgCgJgDgEIgHgFIgEgEQgEgCgJgLIgOgOQgJgIgEgFIgIgKIgHgJIgOgJQgLgFgEgEIgKgJIgKgEIgOgIIgPgJIgBAAIgPgDIgIgBIgIAEQgHAAgJgDIgCgBQgFAGgHAEQgFABgCACIABABQAAAIgGABIgBAAQgCADgHgCQgDAEgIgEQgKgGgEgPQgDgMACgIQAEgMAAgFQACgIgCgMIgEgdQgCgJAEgBIADAAQgIgSgCgPQgCgRAIgMQgDgOACgMIADgJQgKgUAAgRQgBgIABgHIgCgHQgHgXAIgRQAJgQASgFQAUgEAaAJQAaAJAXAUQAYATAQAZIAIAQQAFALACAKQAZAHATAIQBBAZAzApQATAQAeAdQAkAjANALIAdAZIAdgJQA3gLA6AWQAcAKAZATQAdATAQAZQAKAOAFAOIALAFIAEABQAPAHARANIAfAYIAAAAIhJAAIABABIA1AAQAdAcAMAOQAgAkAeAyQAUAFATAPQATAQAQAXIAEAHIACADQADgDAGAAQALgDANADQAcAFgJgPQgKgPAxAyQAxAzATAWIAWAbQBfDBgxgGQBGBughA0IADAFQDWCXgjAfQCCB/A6CCIAHAPQBBCdgnChIgHAGIgEAFQgHAJgFAIIAEAMIpMAAIAQDPIg4AAIAlHaIjQAAIAPCIgAaJeRIADARIABABIAIAAIAqAAIAEAAIAAgFQgBgGACgBIABgBIgIgBIgLh1IBngwIgBgGIgYgdIgGgFIgBgBIhtA0IgJgEIAPCTIgLgDIACAKgAY1d/IAFASIADAGIAEAMIAEAAIAnAAIAHAAIAAgBIABAAIgBAAQgEgEgBgEIgBgDIAAgCIgCgCIgBgCIgCgCIAAgEIAAgEQgEgEgBgEIgBgBIgFgCIhekCIgCgHIgKgBIjHiAIAIADIAAgDIgEgCIgJgGQgDgDgBgCIgCABQgGABgIgHIgEgDIgDABQgBABABAEIAAAAIADAJIADAAIgGAVIACAGIDPCEIBVDlIgDgBIAGAQgAtGYRQAShZAdg3IABgCIAAgBIABgBIABgCIAAAAIABgBIAAgBQAwhSBNAAIAAAAIABAAQA0AABBAlIAAAAIAGAEIgGgEIAAAAQhBglg0AAIgBAAIAAAAQhNAAgwBSIAAABIgBABIAAAAIgBACIgBABIAAABIgBACQgdA3gSBZQgqhshfgkIgBAAQgwgTg+AAIAAAAIAAAAIgSAAIgKgIQjDihh1gBIgBAAIgBAAQhZABgsBdIgBABIgBACIAAABIAAAAIgBACIABgCIAAAAIAAgBIABgCIABgBQAshdBZgBIABAAIABAAQB1ABDDChIAKAIIASAAIAAAAIAAAAQA+AAAwATIABAAQBfAkAqBsIAAAAgAZhUzQgKgRgEgRQgDgSAEgNIACgFQAFgKAJgFIAKgFQAIgCALAAQASABATAIQgIgWAFgRQAFgRAQgHQAGgDAHgBQgHgSADgPQADgVATgJQAPgGAVADQgGgTADgQQABgGASgiQgMgZACgUQACgVARgKQAEgDAGgBQABgQgDgKQgEgNABgJQAAgNAGgJIgEgFQgUggACgaIADgPQgNgTgDgTQgGgbALgQQAJgKAMgCIABAAQgKgFgJgGQgfgSgUgaQgUgbgFgaQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAABAAQgLgEgMgHQgbgRgWgbQgSgVgHgUQgXgGgXgQQgcgSgUgbIgEgBIgGgDQgHADgJACQgbAGghgQQgYgNgVgUIgMgEQgPgFgPgKQgCAKgIAHQgQARgegGQgSgCgWgNQgKgGgKgHQgNAAgPgFQgggKgagYQgdgYgNggIgCgFQgNgGgMgJQgjgagSgkQgKgSgCgRQgNgEgOgHQgWgMgUgTQgUgTgMgWIAAAAIgLgHQgPACgTgFQgbgHgZgTQgYgTgSgXQgSAGgbgJIgIgDQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAAAQgHATgXAFQgJACgIgBQAAAagTAJQgRAHgXgFQgWgEgUgMIABAEIAGABIAEACQAEACAEAGIABAHQAAACgFABIgKAAIgDABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAAAIIgDADQAAABgFgBQgKgCgDgEQgEgEgCgHQgDgHABgEIADgEIAFgDIACgDIgBgBIgHgSIgBgFIgXgXQgSgWgIgXQgHgXAGgRIADgIIgGgQQgagJgOgCIgOgDQgGAJgJAIIABAKQgBAQgCAGIgCAGQgCAEABAEIADALQAEAIAAADIgCAKQgBAGAAAEIAFAIQACAFAAACQAAADgEABIgGADQgBADgBAGQgEAEgHgCQgIgCgGgHQgJgJACgKIABgFIhbgTQgBAFgEADIAQAQQAJAJAFAJIADADIAHAOIAKADQAjAQAaAdQAPARAJARIAGABIAGABIAAABIAJAGQAWAWAOAbQANAagCAUQAAAJgDAHQgIAGgGAIIgBABIgFADQgCALgHAJQgLAOgUACQgOAAgQgEIAAANQAKAJAKAMQARATAKAUIAAACQAUATALAWQALAXAAAUIgCAPIAKAJQASARAKATQAHAIAEAKQALAGAKAKQAVATANAWQALATAEATQAQAVAFAVQARAKAOAPQAWAWAMAaIACAGIAHAEQAfAXASAeIAHAOQANAJALALQAJAIAGAIQAQAGAPALQAWAQASAWIAFAHQASAGAUANQAJAFAHAHQAOgBAVAHQAcAKAYAVQAIAGAFAGQAIgEAJgBQAWgCAYAKQATAIAUAPIAMAKQALgJAQgBQAVgBAaALQAaAMAWAUQAPAOALAPQAJAIAIAKQASATAJAUIADAFIAJAIQASAQAMATQAOAUAFASIADALQAdAOAkANICPA3IAYAJIAAAAgEAnOASNIgCgVIgCgaQgIgLgGgEIgFgDIgEgEQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAIgDABIgEAAIgGgDQgEgGABgGIAAAAIAAgDIABgCIABAAIABgBIAAgBQABgDADgBIADgFQADgOAHgQIAAgEIACgJQACgGABgIIAAgCQAAgPgHgVIgCgKIAAgEQgCgEAAgDIgBgDIgCgGIgDgMIgCgKIAAgCIgDgFIgBgDIgLgWIgFgIIgEgIIgDgHIgKgSIgLgPQgFgIgBgBIgFgIIgBgFIAAgBQgFgCgGgHIgHgOIgjgsIgCgBIgEgEIgBAAIgCgCIgHgFIgJgGIgBgBIgBABIgDAAIgEgCIgCgBIgBgBIgEAAQgZgBgXgDQgdgDgkgHIgLgDIgJAEQgPAGgFAIIgDADIgGAJIgIAJIgDAIQgFAMgCAIQgCAIAAARQgCAMABAKIAEAVQANAwAPAfIACAEQADABABADIAEAGIAEAGIAJAPIACAAIAHAJIABABQAHALAEAEIALAMIAbAaIABABIABABIABABIAOAMIADACIAEAGIAAABIAFAEIADADIABAAQAHAEACAEQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAQAAABABAAQADABADAEIABAAIAAABIABAAIAEAEIACABIADAEIABADIACAFQAAABAAABQAAABAAAAQAAABgBAAQAAAAAAAAQgCACgEgBQgDgBgEgFIgCgEIAAgCIgFAAIgDAAIg3ABQggACgNACQgEABgDgBIgCgBIgEAAIgJAEIgCABIAAALQAAARgKAIIgEADIABADIABAKQABAKgDAHQAAAAABAAQAAABABAAQAAABABAAQAAAAAAABQAEgIAIgFQANgFARAFIACABIABgDQAJgMAQgBIAIACQAGgNALgEQAOgEAPAGQAQAFAQAOQAKgDAPAFIARAKIACAAQAIgFANACIABAAIALAAQAIgHAOAAQAOAAAPAIIAMAIIAGgBIAGAAQALACANAHQAKAFAJAIgAe+RCIACABIgBgGIgBAFgEAnHARCIABABIAAgBgA7lQcIACgEQACgGAEgFIgIgMgAvCL9I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IIgDgHQgCgHAEgHQAFgHAFgFQAIgFAMgEQAOgDAKABQAKADAFAGIACACIAEgCIAMgEQAIgBAKAAQAVABANAIQAGADAOAKIAAABIABgBIAEABQADgBADABQAEACAEAEIADAEIACAEIAAAEIAFAEQAKAHAFAFIACAAQAJgJAYgPIANgIQgCgDAAgDQAAgEACgGIAEgIQAFgLAEgEQAEgFAJgFIAJgGIALgGIAKgBIACgCIAHgEQAFgDAFACIAEACIACgBIAGgDIAFgCIADgBIABgCIAEgDIALgEQAEAAALACIANAAIADgBQAEAAADABQAFAAAFADQAFgFAHgCQAPgFAWAFQASADAUALIADACQAOAIANALIAAgBIAAgFIgEgJIgCgGIAAgDQgSgLgUgOIgegXIgCAAQgVgDgVgGQgBAEgEABQgHACgKgJQgEgCgCgDQgCABgEgBQgFgCgEgDQgFgGgBgGIgBgFQgPgjgYgjIgagjIgZgjIgKgQIgOgQQgIgJgBgHIAAAAIgWgYIgIgJIgIgGQgGgEgHgJIgFgHQgEgDgFgFIgPgRIgKgLQgGgGgDgCIgKgLIgZgdIgMgOIgKgTIgJgLIgDABQgEgBgEgDIgIgGQgCgEAAgEQAAgEADAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIgMgPQgHgBgHgHIgCgDIgMgJIgGgEIgCgCIgJgHIgBgDIgFgPQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIABAAIgBgBQgFgFAAgFQgOgOgLgPQgIgIgFgJIgJgOIgCgCIgFAAIgyADQgEACgDAAIgGACIgGACQgDACgEAGIAAAAIACADIAMAPIAKAMQAKAPAJAPQAJARAIATQAMAbAMAiQAlB0gFBIIAAAaQgBANADANQACALAIARIANAcIAFANIABAAQAEABAFAEIAGAHQACAFgBACIAAACIAGAGIAIARIAHARQAIANAKANIAMAMIALAMQAFAGACAFIADgBQAFAAAFAFQAIAGAAAGQABAGgGAAQgHAAgGgGQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQgEAHgSgEIgVgDQgMgCgFACIgHAFQgEABgFgBIgMgBIgQAEIgDACIgGAEIgDAHQgDAEgLADQgCACgEAAIAEAGQAEAIgMAEIgHACIgCAFQgBAOgFALIAAABIADABQAGADADAEIACAEQADAHgFADQgEACgHgEQAFAaAPAngApTyRIgIgtIgEgmIABgQIAAgHIABgDIgBAAQgFgFgBgFQgDgGADgEQAAgFAFgFIAKgIIAMgGQAGgDAMAAQAdAAAaAHQAWAGAWANIABgDQADgBAGAAIAGABQACgMADgMQABgGADgCIgLgQIgHgLQgDgEgFgFQgDAEgGAAQgGAAgKgEIgNgEQgKgDgGgDIgHgEQgJgCgFgDQgEgDgDgDQgMgCgHAAQgJABgEgBIgOgCQgOgCgHAAQgRABgXAOQgRAJgEAJQgCAHAAAOIACAYQgBAHgFAQQgDANAAAJIADAEIAGAJIADAGIAFAKIAIAVIAHARQAEAMAHAKIAFAGIACABIAEABIAIAFQAFACAIABIANADIAFABgEgjFgS0IAAgBQAAiiCNAAIAAAAIACAAQBeABCcBHIADABIgDgBQichHhegBIgCAAIAAAAQiNAAAACiIAAABgEATFAgrQACgDAEgCQAMgJAUACQAUAAAXALIACABgA7GYYIgOi9IALAJIgCgJIAjAbIAuAnQBCA7A2BAgA7LVbIAAAAg");
	this.shape_181.setTransform(717.1899,460.556);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("ACfFXQnXg4i7mMQjajOBNhmQAGgJAIgGIAJgIIACAGIABgJIgBAJIgCgGIADgDQAmgeB1gjIgagMQBbkQHDIOQLgBaigIPQgwCeg9A+IgKAFQgJAGgFAKQgfAWghAAQh3AAiekPgAk4kmIE1CBIkni8gAnmoEQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAIAaAMIgbgIIAbAIIgNABQgRAAADgJgAnLn8IAAAAgAnLn8IAAAAgAnLn8IAAAAgAqIpBQAfACADgfQAbAlAxAcQhBgRgOArQgJgkgWgag");
	this.shape_182.setTransform(829.3954,527.5175);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FF9933").s().p("AgPEkIg3iIIAnAAIA0CIgACJCcIgTgzIhVjkIjOiEIgCgGIAGgVIACgJIAYAPIDGCAIAKABIACAHIgMgIIAMAIIBeEBIAPAng");
	this.shape_183.setTransform(863.975,640.475);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#006600").s().p("AA0ENQgGgCgGgFIgEgDQgHgFgEgHIAAAAIgBgCQgDgEgBgFIgBgGQAAgEABgCIgFgBQgLgDgLgLQgLgLgCgLQgCgGAEgEIgBgBIgBAAIgFgJQgDgIgHgIIgLgSIgJgOIgagyQgDgHAAgEIACgBIgBAAQgMgJgFgMQgGgKADgHIABgBQgIgHgDgIQgEgJACgGQADgFAJgEQAHgEAFgBIAEgBQgCgDgCgEIAAgBQgDgGgCgQIgGgaQgCgHgCgDIgJgOQgMgQgDgKQgDgIACgHQABgHAHgDIgXglIgLgPIgLgPQgFgJABgHIABgDIgBAAIgDAAQgCAAgDgCQgEgCgBgDIgCgCIgDgBIgHgDIgEgFIgCgDIACABIAEACQAEADAFABQAIACAKgBIAFgBIACgBQAKgDAJgHQADABACAEQADADgBADQABACgBADQACADgDACIgEABQAIADAGAIQAIAHAIAOIAhA0QAHAAAIAEQAHADAHAGQAHAHAIAOIAVAkIAEACIAGAGIAGAGIAFAJIAHACQAHAEAHAHQAHAHAEAIIADAHQAHAFAGAGQAHAJACAIIACAAQAEABAFADQAIADAGAGQAHAHAIAOIAgA9IAMAVIAJAOQAGAKAGAOQAMADAIAJIAIAMIAHAVIgVAFQgEABgDADIgEgCIALgCIgLACQgHgDgGgGQgGgGgEgHIgBgDIgOgDQgEgGgEgLIgIgPIgKgSQgIgNgNgaIgXgoIgLgTIgEgJIgKACIgcAMIgIADQADALgFAGQgDAFgIgBQgBADgCADQgGAGgOgFQgJgDgIgIIABAFQgBAFgDAEIgCABQgFACgGgBIgDgBIACAFIAhA/IAJANIAQAaIABABQAFgBADABQAHADAIAFIAEAFQAFAFAEAFIAFAKQABAIgBAFQAFAAAIADQAHAEAHAGIABACIAEAEQAEAFACAGQADAIgBAGQgBAHgGABQgDABgDAAIgIgBgACwDJQADgDAEgBIAVgFQgCAEgDACIgEABQgDADgGAAIgKgBgADMDAIAAAAg");
	this.shape_184.setTransform(611.35,339.875);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#663300").ss(3.8,1,1).p("AAAAAIAAAB");
	this.shape_185.setTransform(820.15,446.475);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f().s("#000000").ss(10.3,1,1).p("AgSgYQASATATAe");
	this.shape_186.setTransform(682.575,609.35);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(14,1,1).p("AhGAAQA8kvBsGtQBDjkCXBWQAYANAaAUAltABQANjyDyEF");
	this.shape_187.setTransform(721.1,611.7168);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f().s("#000000").ss(11.3,1,1).p("AhzApQADAPACATAkfgOQBKgyArATAiUgfQAUAVALApAEOARQBMi4BiC8ABfBCQAdhlCfgBAm7AOQAEgLAFgJAmeggQAngpBJAC");
	this.shape_188.setTransform(684.3,373.5306);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(11.2,1,1).p("AnUg4QAbl/DCEBQAZiGDyCGQA3h1BnAtQA/AcBTBaAHhEeQgVjKC9ApAqJB0QAKiwCNg3");
	this.shape_189.setTransform(545.2,281.506);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f().s("#000000").ss(12.2,1,1).p("ALaMaQBphWE1gUQABAAAAABQBiA6BrCCA1FqeQAljrDQAh");
	this.shape_190.setTransform(717.575,425.7772);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(9.4,1,1).p("ABVhzQAGgEAGgDQADgDAEgCQAKgEAKgFQAygXBOAbAj7CUQARjPDLAuQABAtAQgpQARgxBHgw");
	this.shape_191.setTransform(555.525,348.321);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f().s("#000000").ss(7.6,1,1).p("ACXiJQAngeAvgPQBhghCGAZABVhBQAdgrAlgdAnTDJQBAieCQgTQBBiuFZANAkDAYQAZAEAdAH");
	this.shape_192.setTransform(550.25,511.8565);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(8.5,1,1).p("AlqB+QAlg4A2gXAj4AnQBvgfCyBaAETh7QAogEAwADABEBeQARi2Ckgf");
	this.shape_193.setTransform(551.15,374.8234);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f().s("#333300").ss(14,1,1).p("AkxmLQCakmEGG6QEbgaBkBjQAUAUAMAZQASAjADAtQAFA/gaBWQgWBKgsBZQhVCqhIBMAmMnIQAOgmgJhMQgWBGARAsQANAhAkASQASAJAXAFQAKACALACQgKgEgKgEQgWgIgUgCQg1gEgYAuQgOAcgFAvQACgBABgBQAOgqACgfQACgigMgWQAbgFALgggAEWIWQiXCAhYk3QmVAmg9ltQiLijBhh5QAHgJAIgIQAFgFAGgGQAAADAAAEQACgFABgEQAqgnBxg6QgcAJAHgNQABgCAAgCAohnOQBHAxAogGQgagwhXAC");
	this.shape_194.setTransform(700.3242,462.1807);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#663300").ss(14,1,1).p("AgTAKIAiAAIAFgT");
	this.shape_195.setTransform(711.95,612.7);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f().s("#000000").ss(2,1,1).p("AnfCqIAzAfIAJAFIAaGsAlNE4IAFgCIBvhLApbCFIAOggIBcA5AmoKkIgem9IiWhcAjHEOIhpBGIgFAfQgBACAAADQgCAEgBAGIAAADIhAFnAjUDwIAOAYAl+MAIgCALIghgLIgGhIAmhMAIAYiGIA7lGAJdsJQg3ARgOA8");
	this.shape_196.setTransform(751.75,536.9);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#333300").ss(2,1,1).p("AgJAdQAegQgRgp");
	this.shape_197.setTransform(823.051,445.05);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f().s("#000000").ss(0.1,0,0,3).p("AjxhLIgCgeIAOgUIAIAAIAxAiIATAAIgDgnIAKAAQAJAGAJACAiSgoIAPgNIANAAIAJgiQAQgOAOARIAgAAIgBgHQAFgFAAgEAA9jUIAUgJIAFAAQAHgGABgCQALABABgEABYigQAEAAADABQAHgEAAgCIAdAAIgBgLIAKAAACFhbIAAALIgkAAIABAPIgHAAIAAAJADAhyIABANIgWAAAg+iYIAHgVIAfAAIAMgKIAWgMIAMAAAghhbQAJgHAJgEQAIgFgBgFIAdAAQAWgIAFgbQAFADACAAAhbiLIgCgWIAIAAAgTAEQACgUARgLIAOAAIAAAHIAMAAIAbAKIAMAAQADgEAAgEAhhB1IAQgPIAKALIgBgPIBCAAQAGACgDgLIAIgLIAIAAIAAgDIAiAAAiCA+QgCgZAagRQAZgSAlAAAArC6IgUAAIABANIgaAAQAAAHAAACIgLAAIAAAMIgVAMADIgDIAAgHIAIAAIAAAKQAJAAgJgKIAaAAQACgWALAGAD3A5QgZAAgQARQgQASABAZABPAxQAEADAFADIAVgZIAJAAQAEAGACAAQARgMAPAIQAFADAFACIgCgjIARAAQAJAFAAAEACdBwIgHAAIABAHIgUAAIABANQgGADgGAAIABARIgeAAQgFgLgGgDIAVAtIgNAA");
	this.shape_198.setTransform(537.9685,471.3916);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#CCCCCC").ss(12.2,1,1).p("AhfGSQgPlDj2jVQgrgSgBgWAl5jVQBUhLGQhxQC2AEBwJP");
	this.shape_199.setTransform(533.85,474.125);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f().s("#663300").ss(12.2,1,1).p("AZYJvQAQAIARAKAc3C9QAzAYApAdAfhJZQAGAGAFAHEAgVAGsQAOA/gPBKQgGAdgLAfEAgvAQMQBPAGA8ASIAFABQAFACAFACIAGACQBrAmAmBREAiQAODQgfA3g7BCEgg+gScQk9ghAeCk");
	this.shape_200.setTransform(666.2663,430.4729);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(1,1,1).p("AgnAJQAAgDABgEQAFgJAKgIQALgIAOgDQAOgCAOADQACABACAAAAogJQAAABgBACQgEAOgMAIQgMAKgRACQgTACgIgIIgBAAIAAgB");
	this.shape_201.setTransform(544.825,287.344);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f().s("#006600").ss(1.9,1,1).p("AgYALQACgCACgBQACgBABAAQADAAAAAAQABAAAAgBQAAAAABgBIADgBQABAAADgDAgRANQAIgFABgBIAEgEQAEgCAFgDQAAABgBAAIgBACQgDABAAABQgCAEAAADAALgEIAFgDQACgBADgCIAEgCAALgEIgGABQAAABAAAAIAFgBgAAQAAQgBgCgDABQgBABgBABIgCAAQgBAAgBABIgBABQgBAAgBADQAAAAgBABIABABQAAABAAAC");
	this.shape_202.setTransform(546.75,295.475);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#006600").ss(9.4,1,1).p("AAAAEQAAgEABgD");
	this.shape_203.setTransform(547.5,317.925);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f().s("#663300").ss(9.4,1,1).p("AAngmQAFgEAGgEQAEgEAEgEQAFgCAFgCAhDAvQAAAEAAAEQAIABAJAD");
	this.shape_204.setTransform(559.1,341.45);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#666600").ss(9.4,1,1).p("AhIgrQAqAZAvhTIA3CnIABADAhHghQAJBFAwBC");
	this.shape_205.setTransform(555.725,331);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f().s("#006600").ss(11.2,1,1).p("AhvjhQAkBbglB5QghBtBdCEAgrDwQAFAGAEAGAgyj6QApBZA/BaQAyBHARB0QgBAEABAQ");
	this.shape_206.setTransform(555.7582,321.05);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#663300").ss(11.2,1,1).p("AB0hiQhrAPgcBiQgGAhgLAUAhRBiQgPAAgTgI");
	this.shape_207.setTransform(466.8,303.35);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f().s("#333300").ss(11.2,1,1).p("ACog8QiVBmiUhlAinimIAmBrQAPCQBCBS");
	this.shape_208.setTransform(460.125,295.675);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#333300").ss(7.5,1,1).p("AFApkQrpG3EKMAABDpAQnUFTBjNS");
	this.shape_209.setTransform(486.6372,229.35);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f().s("#333300").ss(11.3,1,1).p("AI/jXQi6k2kAgbQh3gMiFAwQhuAoh2BQQkNDlgcHhQgCB+AaB0AgDEbQDKnPCeDoQCdDphxBYAJAFGQBiiHgpjOQgPhOgjhk");
	this.shape_210.setTransform(505.3975,223.3969);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#999999").ss(11.3,1,1).p("AjehqIgeDOAjehqQGzpsBPM1AjehqQDREHExg+AjehqQFCigDAFpIhUCCIg2BWIgoA+ABxF1IAAABIAAAAAkhFfIAAABIgCASAkBCEIgfDYIAAABIgBAD");
	this.shape_211.setTransform(612.7,181.6963);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f().s("#663300").ss(11.3,1,1).p("ACZAoQAmhcBjAsAkhgnQAHgDAIgCQBVgaBaB3QAShIBfBDQA4guBJAu");
	this.shape_212.setTransform(599,226.2111);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#FFCC66").ss(11.3,1,1).p("AISg6IAJCXIhZAAIhZF0Al8oAII/AFIhCEdIgMA2AhRhcIA5C2ADqIBIjEAAAgVBdIHXAAAH8hxIo3AAIlBmPIiDCVIEbF4ICThpIiDINIlGkvIBZl+ADvnlIEIFW");
	this.shape_213.setTransform(670.325,321.7);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f().s("#663300").ss(16.9,1,1).p("ABPk1QAcgFAMAlACai6QCDAagMBnAKnJtQBhgVBHBPAOtLNQAJABAJACAN/LsQABADABADAk9oFQAxhhBNBhQCJhKBREJAuJrYQgeglgTATQgTARBEABQAAAAAAABQACgCAJgLAttqNQgFgHgEgF");
	this.shape_214.setTransform(662.5175,276.6889);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#000000").ss(0.1,1,1).p("Ag3jbQAlgNAqAAQAIAAAHAAQAYABAPADQADABACABQARAEAIAIQADAEADAFQADAFgCAJQgCANgFgkQgFAmgLAkQgOAxgZAsQgsBOArBPQAOAbAMAUQAWAnAKAMQgCAEgDAEQgNARgoAAQg5AAgwgYAhJDHQgCgBgCgCQgMgHgMgKAg8DOQgBAAAAAAAByjNQAXAhARAgQBZCmhaCDQgSAagZAZAh1CmQgBgCAAAAQgEgDgEgEQgHgHgHgIQgMgPgKgPQAAgBgBAAQgCgFgDgEQgGgLgFgMQgBgCgBgDQAAgBgBgBQgBgDgBgDQgEgNgDgNQgFgTgBgVQAAgHAAgHQAAgFAAgGIAAgEQABgPADgOQACgOAFgNQAKgdASgaQAJgMALgMQAMgMAMgKQAPgMARgJQAHgEAIgD");
	this.shape_215.setTransform(818.1317,471.25);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#009900").s().p("Egk7AmLQgkgEghgIIDaAAQgwAOg3AAQgXAAgXgCgEAl9gLSIgBgCIACgIIACgEIAAANIABAJIgEgIgAem7AIANABIABAKIgOgLgAcb9TIAnAAIgGAFQgIAKgDAOIgWgdgEAUBgmLIACgBIADAGIgFgFg");
	this.shape_216.setTransform(663.275,622.3664);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#663300").s().p("EgeTAhGIiigIQgPADgNgBQgMAAgLgFQl/gXENgIIA5gBIgLgEQgagKgRgUQgIgKgGgMQgNAEgRAAQgggBgPgSQgIgKgGgaIgLgqQgIglgEgMIgPgzQgGgdAAg7IAAl1QAAgpAOgRQAMgQAWgBIACAAIAAAAIAGgIQgYgRgPgdQgOgbgFghQgFgbABgkIAEg/QAIiSgQi5QgJhpgejlQgcjZgJh0QgGhWAAhOIg5AAQgGgYAGggIANg3QADgHAJg0QAIgkAIgVQAMgeAUgTQAKgJALgFIAMgPQgGgbgHgMIgKgMIgJgMQgXgdgCgoQgBgoATgfIAHgLQAEgHACgFQAEgLAAgZIABiqQABhcAEg0QAEgnAAgQIgCghQgCgUABgMQABgQAEgOQAHgdATgZQAcglApgOQAogOAlAMQAOAFANAIIAPgGQAagHAcAKQAFABAFADIAUgPIAXgPIAtgeIABgBQAYgRAOgHQABgLACgLQAHgbAQgSQAXgbAhgEIAHgIQAJgLAHgGQAWgTAhgEQgDgNAAgJIADgSIAGgRQAIgdADgGQAFgJALgOQATgWAIgMIAJgQQAGgJAFgFQAKgJANgCQANgCALAFQANAHALAQQAIAKAFAKIACgDIAAgDQgCgMADgPIAGgbIAHgdIAGgSQADgKABgIIgBgbQAAgKADgQQADgbAHgLQAHgLAOgDQANgEANADQALACAOAGIAZAMIARAHQAJAFAGAFQAJAIAIANIAMAbIADAHQALgDANgBIAHAAIACgFQAJgSAWgHQABgFADgFQAGgMANgFQAMgFANADQATAEAKAUIACADQAQACAPAFIADgBQAagDAbANQAPAHAMALIADAAQAWgCASgPIAOgRQAHgKAHgFQAVgTAiAFQAVADAkAQIAoAQQAjAOAQAMQAcATAKAZQAEAIABAJIABAAQAEAAAJgDQgDgMgCgMQgCgSADgTIABgFIgGgFIgggWQgXgRgOgbIgDgBIgDgBQgDgDgBgCIAAgEIAAgBIgCAAQgIAAgEgEQgCgDgBgFIABgFQABgDADgCQADgDAFAAQgFgRAAgSQABgiAQgcQAHgNAKgJIAAgIQgBgZAIgVQAIgWAEglQAEglAZADQAaADAdAPQAcAPASANIAJAHIAOgDIAEgBIAVgFQANgDAJAAQAQAAAVAIIAkAPIABAAQAXgLANgDQAigIAnANIAKADQAGgKAHgIIADgDQAQgOAYgFQARgFAcAAQAhgBAXAHQALgLAOgHQAZgKAcADQAaADAYANIAQAKQAPgFARABQAbABAcAPQAZAPATAZIAOASIANASQAFAIASASQAOAQAIALIAIAQIAKABIAEAAQAZAEAXANQAMAHANALIAOAOQALAMAIAPQARAfgBAhIgBAMQgDAVgIARIAPgDIATAAQAGABAEACQAEADABADQADADAAADIAHABQAMACAEAHQAEAEABAGQAAAFgEADQgCADgIAAIgFABIACADQACAHgFAEQgDADgIgBQgIgBgLgEIgSgIQgGgDgFgBQgFgBgFAAIgIABIgHACQgKADgJgBIgFgBQgMAFgMABQgbACgkgPIgFgCIgBAAQgDACgEAAIgIgCQgJgBgTABIghADQgsADgXgBIgogDQgKgBgrAEQggACgUgEQgKgCgCgFIgaAJIgBAAIgFAKIgRATIg9BBQgXAYgLARIgKAPQgMAQgCAEIgCAEQACACADAEIAEAHIAHAKIAIANIAEAJIAMAPIAPAZIAFAJIAAABQAEADACAEQABAEgCAFIgDAJQgDAFgGAZQgBAJgEARIgHAaIgBAEQAFACABAHQACACgCAJQgDAWgGAQIABAMQABAbgMAZQgIARgNANIgBAHQABADgBAEIgBACIgBAPIgDAWIgCAIQgDAOgGANIgFAJIABABQAEAFgDAGIgHAKIgCADIABACIACAEQABAEgCADQgBADgDACIAAADIACAHIAEAHQAFAGABAJQAEgBADAEQADACACAGIABACIAFADQAPALAOAIIAKAGIAEAGQAZALARAaQAFAHADAIIAKAAQAUAAARALQARAMALASIADAHQAHAGAEAIQALAQADATQAFABAHAIIADADQATAEAPAOQAOANAIASQAIATgBATQAAARgHAOIgCAEQgGAOgLAIIgFAFIgKAFIAGALIABAGIAEgFQAHgLAKgGQADgMAFgLQALgSARgJQARgJAUADQAUACARANQANAKAJAQIABACIAGANQAJgHALgEQAQgFAPADIAGgFQAOgJARAAQARgBAPAIQAQAHAMAPQALAOAFARIAAABIADAJQABAOgBANIgBAGIAAAEIAFgDIABAAQADgQAKgNQANgQASgHQATgGATAFQAMAEAJAGQ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QACgGACgCIACgBQgCgFABgIIAGg2IAAAAIAAgDIACgKIABgFIABgFQACgKADgGQAIgOAUgLIARgIIARgIIAMgHQAFgIAEgDQAEgEAFAAIAGgGQACgCACAAIACgJIABgGIABgHIAAgCIgCgCIgNgNIgFgFIgGgFIgBAAIgEAEIgPALIgIAFIgIAHQgEAEgHADIgNAGQgNAGgPAKIgPAJQgJAFgDAGQgCADgDAJIgJAfIgEAgIgKAwIgGAyIgBAOQAAAFgCADIAAABQABAHgFADIgBABIABACQAAADgBACQADACAAADIAAAHQgBAGgFABQgFABgFgFQgCgDAAgFIACgEQgEgDgBgEQgBgFAEgEIACgCIAAgDIgCgCIgCgEIAAgCQgBgFAEgEIAAgBIgDgGIAAgDIABgCIgCgCIgBgEIAAgEIACgDQgDgDAAgFIACgGQgCgDAAgEQgBgDACgCQgDgEAAgCIgCgGQgCgEAAgIIAAgdIAAgLIACgQQABgEgBgFIgCgaIABgJIgBgCQgCgCgBgGQgBgJACgOIAAgGIgCgDQgBgDABgEIABgEIgDgFIAAgBIgCgMIAAgNQgBgFABgDIABgBQgDgHgBgEIgBgGQgDAAgDgCQgCgCgCgEIgHgDIgkgQIgHgDIgCgBIgMgHIgEgEQgJgGgIgHQgDgBgEgDIgHgJIgMgIIgNgGQgIgEgGgFIgGgFIgFgDIgBABQgFADgFgFIgCgDIgEABIgBAFQgCAJgEADIgBAAIgBASIAAAGIgBAGIAAAAQAFABABADIACADQAFAAADAEIABABQADAAADACIACADQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAEAAADACQADADAAAEIABACQACgCADABQAFAAACAGIABADQADAAADADIABABIAMAFQAGACAIAGIApAaIAIAGIABACQABgBAAAAQABAAABAAQAAAAABAAQAAAAABABQAGACABAHIAAAJQgBANACAWIADAjQAAAEgBADQACADABAGIACAeQAHBVABAiIABBHIAAANIADAYIAHBDQABAJACAFIADAEIACADQACAFAAADQAAAFgDADIgEACQgGACgGgGIgEgFIgEgGIgMgJIgIgHQAAAJgGADQgFADgGgGQgEgEgCgIQgCgIABgHIACgDIgFgIIgHAEQgOAHgPAAQgUAAgSgMQgLgHgIgKIgDgBIgIgBQgcgCgVgXIgBAAIgCALQABASgGAQQgIAVgSANQgOAKgQABIgBABQgBAFABAGIABAFIACAUIACAWQAEAJADAKQACALABAOQAOgCAQADQAFgJAGgZIADgNQgCgLABgLQABgQAHgPQAGgPAMgJQAOgMASgCQARgDARAGQARAGAOAPQAMAPAHATQAEAPgBARQAMAFAJAIQAIAHAJAOIARAVQAKALALAGQANAHALgDQALgEAKgOQAKgSAGgIQALgPASgHIAKgDIAAgIIABgIIACgIIACgFIACgDIAFgQIABgHQACgGAGgBIABAAQAFAAADAFgAGTSmIAAAAIAAgBgA7SDWQARAMALAUIADAGIAIAEQAPAKAIAMQAMAPAEAUQADAMgBAMIAKAHIAGAFQARAPAHAVQAGARgBATQANAIAJANQALARAEAVIABAJQAEAIADAJQAHAKADALQAEAKABALQAKAQADARIAHATQACAMAAAMIADAHQAFAMABAOIACAFQAEAPgBAQQgCAhgVAUQgNAMgSAEIgOACQgMAHgOACIgEAEIAAABIgBADQgGAOgKAKQgFASgNAOQgJAJgJAFIgIALQgCAKgGAKQgFAJgHAHQAGALADAMQADAOACAPIARgGQAGgfASgdQANgTATgUQANgNAZgVQAbgYAQgGQATgIAkABQATAAALACQAKABAJADIgBgGIgBgTQAAgKADgKIACgFIgBgDQgCgQACgQQADgQAJgNQAMgSAVgIQAUgIAVAGQAIACAGAEQAHgKAKgGQANgJASgBIAJAAIACgDQAMgQAUgIQATgHAUAGQAUAGAPAQQAQARAFAWIABADQADAQgCAQIADgFQAHgSANgKQAJgSAPgLQANgIAPgCQAVgUAegTQAggVAYgGQANgEASgBIAfgBIBCABQAlACAdAGIAPADIAAgGQgBgUAIgTIgfgIQgugOgQgEQgLgCgGABQgFAAgGACIgLADQgTAFgVgIQgVgIgNgTQgLgPgMghIgbhQIgPguQgGgUgCgRIgBgCQgJgSgBgUQgagugPgrIgNgkQgIgVgHgOIgQgZIgQgYIgIgOIgBAAQgWAAgUgOQgPgLgJgPIgBgBIgMABQgRAAgQgJQgQgJgLgPIgEgFIhHATIifAuQgaAHgMAGIgUAKIgTAKQgbAPgjALIgyANQgJAQgOAJQgRALgWgBIgFAAIgBAAQAEAKACALQABAQgDAOIgGAPQgGAOgLAKIgDADQgLAJgOADIALAZQALgFANAAQAWAAASAMgAIcM6QgEgQACgQQABgSAHgOIAEgFQAGgLAKgIIAJgGQAJgFAJgBQARgDAOAEQAAgVAIgSQAJgSAQgKIAMgHQAAgRAGgQQAIgVATgMQAQgLASgBQgBgTAHgPQADgHAEgFQACgKAGgHQAGgKAHgGQgEgYAGgUQAIgVARgOIABAAQAFgEAGgDIAGgGQgCgKAAgJQAAgNAEgJQADgNAIgLIgCgEQgKgcAJgcQADgIAEgHQgGgRABgTQACgZAPgTQAGgHAGgEIAJgGIABAAQgHgCgIgFQgVgMgMgXQgKgWACgaIAAgBIgMgEIgFgDQgQgJgLgQIgGgJQgJgSgCgSQgSgBgRgLQgUgNgKgYIgDgBIgEgCIgRAKQgaALgZgKQgSgHgNgRIgKgBQgMgCgLgHQgFAKgIAJQgTAUgZABQgQAAgQgIQgIgEgGgFQgLACgNgCQgZgEgRgSQgTgTgFgdIAAgFQgJgEgJgGQgYgUgHggQgDgRACgRQgKgBgLgFQgQgHgNgQQgNgPgEgTIgIgGQgOAGgQgBQgWgCgRgOQgSgOgIgVQgSAKgWgEIgHgBIgBAEQgMAVgWAJQgIADgIACQgHAagUANQgPALgUAAQgRAAgPgJIAAAEIAEAAIAEABQADABABAGQABAEgBACQgBADgFABIgIADIgEACQgBABAAAEIgDAIIgCADIgFABQgIAAgDgDQgDgDABgGQgBgIACgEIAFgFIAEgEIACgCIAAgBIgBgRIAAgFQgIgJgGgKQgLgUAAgWQgBgVALgTQACgFADgEIgBgPQgVgEgMABIgMAAQgIALgLAJIgBAKQgFAQgDAHIgEAHQgDAEAAAEQgBADABAIQABAHgBADIgDAKQgEAGAAAFIACAHIAAAIQgBACgEACIgGAFQgCACgDAHQgDAFgHgBQgHAAgDgGQgFgIAEgKIADgGIhMgBIgIAKQAHAGAEAIQAEAHADAHIACADIADANIAHACQAbAIAQAZQAJANADAQIAGAAIAEAAIABABQADABACAEQAPARAFAYQAEAYgGAVQgDAJgFAHIgPARIgCACIgFAEQgFAMgIAKQgOAPgSAGQgNAEgNgCIgEAOQAHAHAHAKQAJAPADATIABACQALAQAEAUQAFAVgGAUQgCAIgEAHIAHAHQAKAPAFARQADAHACAIQAIAFAGAHQAOAQAGATQAFARgCASQAIATgBATQANAIAJAMQANASAEAYIABAGIAEADQAWARAIAbIADAMQAJAHAHAJIAJANQAMADALAIQAPALAKATIADAGQAPADAMAJQAHAEAEAFQAOgEAQADQAXAEAQARIAIAJQAHgFAJgDQAUgGATAFQAPAEAOALIAJAIQALgLAPgFQATgFAUAGQAUAHAOAQQAKALAFANIALAOQALARADASIABAFIAGAGQAMAMAGARQAHARgBARQABAGgCAGQAXAHAcAHIBxAbIATAEIAAAAgAbILCQARACAPAKQAPAKAKASQAJAOADAPIADgCQgEgNgBgQQAAgXAKgSIgLgIQgRgPgHgUIgBgDIgCgBQgFAAgCgGIgBgDIgGgDQgOgIgIgNIgEgCQgUgKgMgTQgEgHgDgIIgDgBIgCAGQgDADgFgBQgEAAgFgGIgJgKIgNgLIgVgRQgJgNgHgEIgGgDIgFgEIgCgEIgDACIgGACQgDgBgDgCQgEgGADgHIABgEIADgDIABAAIADgDIAAgBQACgEADgBIAHgIIACgFQAIgQAMgUIACgFIAGgLQAFgJADgKIABgCQAGgVgCgYQgBgKADgFIAAgJIAAgFIgBgHIAAgNIABgMIAAgCIgBgGIgBgEIgHgYIgCgJIgGgRIgHgTQgGgLgCgGIgEgJIgEgIIAAgEIAAgDIABgBQgGAAgEgIIgGgPIgeguIgCAAIgEgEIAAAAIgCgBIgIgFQgGgCgFgEIgCABIgEACIgFgCIgBgBIgDgEQgCACgEgBQgDAAgCgDQgDgDgBgDQgBgGAFgDIABgCQAAgEABgDIgCgFQgBgGAAgGIgFgJIgEgFQARAqgfAQIgPAAQgrAAglANIgGAEQgEABgCAAQgEAAgCgCIgBgBIAAAAQgBAEgHAGQgRAJgPAMIgKAHQgNAJgFAGQgJAIgEAFIgIAMIgNAYQgEAJgGAUQgEAOgDANIgCAIQgBAHgBAPIAAAEIAAALIABAIIAFAvQgEgUgCgUIAAgPIAAAPQACAUAEAUIADAPQACAKACAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAABIAAADIgCgHIACAHIABABIACAGIAAAHIAIAJIADAHIABAAIAEAIIABABQAKAQAMAPQAGAIAGAFIALAKIABABQALAIADADIABACIAFAHIAAAAIAHAFIABACIACAAQAGACADAEIAEAAIAFAAQAEACACADIABABIAAABIABAAIAGACIABABQACACAAADIABADIAAAGQAAAEgDACQgDADgDAAQgFgBgDgFQgCgDABgDIgBgBIgGABIgDABIhJASQgpAMgRAGQgGACgDgBIgBAAIgHABQgGAFgHAEIgDABQgBAHgCAHQgGAVgRAOIgFAEIABADIgDAOQgCALgGAJIADADQAIgLAMgHQARgKAUABIADAAIAEgFQAOgRAVgFQAFgCAGAAQALgQARgJQASgIATACQARACAQAMQAQgHAQADIATAHIACAAQANgJAQgBIABAAIAOgDIAAAAQANgMASgEQASgEASAGIALAFIAJgCQASgEASAHQASAGAOAQIAJAMQAPgBAPAGQASAHAMAPQANAPAGAVQADAMAAANIALgBIAFAAgAx6LAIAAAAIAAgBIAAABgAO/KQIACABIABgHIgDAGgAZiH3IAAABIAAgCIAAABgAcWB2IAgATIAYALIAIADIATAJIAAgGQAAgIADgHQgNgGgHgMQgFgHgCgHIgBgKIgMgBIgggDQgfgDgMgGIgJgFIACAQIACAQIAHAAQAMAAAPAHgAW9BBIABACIAAgCIAAgBIgBABgAjLkmIABAAIACACIAAgBIAAgCIgDABgAkWkwIgBAGIAdABIgBgBQgHgEAAgHQgJAEgLABgAjck6IgBAAIAAAAgA3+phQgCAEgGAGIgMALIgFAFIgHAMIgHAHIgJAKQgHAFgEABIgFABQgBANgGAMQgEAJgGAHIAHAWIAOgVQAGgKAHgIQAQgXAUgRQAfgZAigJQAagHAlACIBBAFIApAEQAXADARAIQAWAMAQAVIAEABQAPAHAGgBQAFAAAPgGQAEgDAGgBQAMgEAPAAIAXACIgBgEIAEgFIAAgDQABgEACgBIgCgFQgIgYADgaQABgaANgVQAOgYAXgNQAUgLAYAAIABAAIADgCIANgIIAHgBIAEgEQASgPAXgFQgEgFgBgIIgBgFIgBgOIgDgEIgDAAIgEADQgJAHgLADQgEACgNADQgLACgGADIgPAJQgZAPgdAJIgCAAQgDAIAAAGIAAAMQgBAHgEADQgCACgFgBQgEgBgCgEIgBgBIgEAMQgKArgLAPQgEAHgGAGIABACQACADAAAGIgCAKQgBAJgCACQgBACgEABQgBAGgFACQgGABgEgFIgBgBIgCAEQgEADgFgBQgEgBgEgEIgGgEIgGgCIgKgGIgQgHQgKgFgFgEIgEgDIgEgBIgHgDIgHgDQgJAAgEgCQgEgDgBgFIgOgBIgdgCQgUAKgXgGQgKgDgIgEQgVgBgMACIgHAAQgCAGgFAFQgHAJgKAFIgKAFIgNAEQgKABgKgBQgLgCgKgGIgCABgAyipgIADAAIACgDIgFADgA2nsDQABAKACAFIAFAJIADgIIAJgMQAJgKANgFQAAgEAEgDQAEgCAEABQAAgJABgIIgBgCQgCgGADgIIABgEIADgHQADgGgBgEIgDgIQgCgJAHgMQAGgIAGgFQAIgHANgGQANgHAIAAQAIABADAFIABABIAEgCIAMgHQAIgDAJgCQASgDAJAFIAPAKIABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQABAAAAAAQAEABACAEQADAEAAADIgBAEIADACQAHAFADAFIABgBQAOgNAkgcIAAgFQABgFAEgGIAFgKQAHgLAFgGQAFgFAJgHIAKgIIAMgIIAJgEIACgBIAHgGQAGgEADABIAEABIACgBIAKgIIAEgBIABgCIAEgEIAMgGQAEgCAJAAIALgCIADgBIAGgCQAEAAAEABIANgJQAPgIARAAQARAAAQAIQALAGAIAIIABgBIAAgFIgBgIQAAgFABgEQgOgHgNgKQgLgIgKgKIgCABQgSABgRgCQgCAEgEACQgHADgGgGIgEgEQgDABgDAAQgDgBgDgDQgDgEAAgGIABgGQgEgfgMggIgOgeQgIgSgEgMIgGgOIgIgNQgEgIABgHIgOgUQgCgFgCgCIgGgFQgEgDgEgHIgCgHIgGgHIgJgOQgDgFgDgDIgGgHIgGgJIgPgYIgGgNIgFgPIgEgLIgEACQgDAAgDgCQgDgBgCgEQgBgEABgDQACgFADgBIACgBQgEgGgDgHQgGABgEgGIgBgDIgHgFIgDgBIgDgEIgBgBQgFgDgBgDIAAgBIgBgPIABgDIABgBIgBAAQgDgFACgEQgJgMgHgMIgGgPIgFgMIgBgDIgEABIgtAOIgIAEIgFADIgGADQgEACgEAHIgBABIACACIAHAMIAFAMIAAAAIABABIAIAZQAEAOACASQADAaABAgQACBtgWBLIgJAaQgDAOAAAMQgBALACAQIAEAaQABAGgBAGIABAAQABAAAAgBQADABAEADQACACAAAEQABAEgBADIgBABIADAGQADAGABAJIACAQQACAMAHAKIAHAKIAGAKIAEAKIACgBQAFgBAEADQAFAFgCAGQAAAGgGACQgGABgEgGIgBgCQgFAHgQABIgRABQgKAAgFADQgFAFgEACQgDACgFAAIgJABQgFABgKAHIgJAHIgGAIQgEAFgKAFIgGAEIACAEQABAHgKAHIgIAEIgDAFQgFAOgHANIAAABIACABQAFACABAGQACAHgGAEQgEACgEgCQgEAZADAlgAtuvVQAFATgEASQgDATgLAOQgKAOgPAHIgIADIgCAXIAAAJIAAAMIgBAUQgCAHgGALIgCAEIgDAMIgEAQIgBAFIgBALIAEAAQAIgFAKgCQAZgHAaAJIADABIARgGIgDgHQgFgLgDgMQgIgdAHgbQADgOAHgNQADgHAFgHQACgIAEgHQAMgYAWgPQAIgJALgHQAUgOAXgCQAQgBAQAFQAJgFALgDQAYgFAXAHIAEACIACgFIAGgFIADgGIAEgRIACgKQgBgEgDgFQgFgIgDgCIgIgGIgFgFQgRAEgSgDIgJgCQgBADgCACQgDADgGAAIgJgBQgFgBgIACIgyAIQgJABgEgDQgDgCgBgEIgJAFIgLAEIgKAEQgFACgFAHIgJALIgJAHQgIAGgIAIIgHAFIgEAAIACAGgAGoskIABgBIgBgBIAAACgAGZs4IgBACIACgDIgBgCIAAADgAsPzuIADAAIAGgrIAGgnQACgIAEgIIACgHIABgDIgBAAQgDgEAAgFQAAgFACgEQACgGAGgGIALgKIAMgJQAGgEALgCQAagGAVACQATABAQAIIACgDQADgBAFgBIAFAAQAEgNAGgMQADgHAEgDIgGgOIgDgJIgFgIQgEAEgFABQgFABgJgBIgKgCIgMgDIgFgCQgIgBgEgCQgDgBgBgDQgKAAgIACQgHADgDgBIgNABQgMABgGACQgPAEgZATQgRAMgGAKQgEAIgDAOIgFAYQgDAIgIARQgHANgDAKIADADIACAHIACAGIABAKIACATIABAQQACALADAJIACAFIACAAIADABIAGADQAEACAHgBIAHgBIAEABgA1M4VIABgBIgCAAIABABgAUdHIIAAAAgAUHGpIACADIAIAJQAFAGAGAKIABADQgMgPgKgQgAToD+IAAAAgATvDjIgBADIgGAYQADgNAEgOgATvDjIAAAAgAU3B/IAAAAgAVXBqIgLAHIgVAOQAPgMARgJgAVXBqIAAAAgAMVtzIgLgCQgGgCgGgDQgFgDgFgFQgUgUAEgcIABgGIADgMIADgTQgCgSgQgOQgPgOgUgEIgigDQgTgCgMgHQgTgLgEgZQgDgPAGgMQADgGAFgFQANgNAZgDQAqgHApAPQAPAGANAHQASAKAOAOIALALQAcAhAJArQAHAmgLAiIgEAKIgDAHQgNAYgTAFIgFACIgGAAIgDAAg");
	this.shape_217.setTransform(673.1045,439.8777);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("Ah4gCIAdg/IDUCDg");
	this.shape_218.setTransform(691.225,442.35);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("AAUFCQmVAmg9lsQiLikBhh5IAPgRIALgLIAAAHIADgJIgDAJIAAgHIADgCQAqgnBxg6IgUgIQCakmEGG6QEbgaBkBkQAUATAMAZQASAjADAtQAFBBgaBUQgWBKgsBZQhVCqhIBMIgJAGQgKAIgGALQgsAlgmAAQheAAg/jcgAjmjlIDxBFIjUiEgAnFnAQAbgFALggQANAhAkASQg1gEgYAuQACgigMgWgAlFmkIABgEIAUAIIgVgEIAVAEQgLAEgGAAQgIAAAEgIgAkwmgIAAAAgAkwmgIAAAAgAkwmgIAAAAg");
	this.shape_219.setTransform(702.21,465.0747);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#CCFF00").s().p("AhtEFIAkAAIgCALgAhJEFgAhtEFIAYiGIA7lFIAHACIgFACIAFgCIBuhLIAEAFIAPAYIgCAGIhoBGIgFAfIgBAFIgCAKIAAADIhAFmIgFAUg");
	this.shape_220.setTransform(720.9,587.575);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FF9933").s().p("ABMEFQADgDAAgFQAAgDgCgFIgCgDIgfm8IiUhdIAAgGIAPgfIBaA5IAFADIAMAHIACABIAzAfIAJAGIAZGqIgYCGgABHjpIAIAAIABAGg");
	this.shape_221.setTransform(701.825,580.375);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#660000").s().p("AgJAlQgHgFgDgKQgCgKAFgLQAEgJACgUQAAgUAKAUIAOAeQAGALABAFQABAFgMAKQgHAGgGAAQgDAAgDgCg");
	this.shape_222.setTransform(834.2873,472.3799);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFCC").s().p("AgkChIgagwQgrhPAshNQAagtAOgxQALgjAEgnQAFAlACgNQABgJgCgGQAXAhARAgQBZCnhaCDQgSAZgYAZQgLgMgWgmgAAkgNQgCATgEAKQgFALACAKQADAKAHAFQAJAFALgKQAMgJgBgGQgBgFgGgKIgPgfQgFgJgCAAQgDAAAAAKg");
	this.shape_223.setTransform(829.5691,470.9);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#CC3333").s().p("AgLDSIgCgBIgFgDIgCgBIAAgBQgDgDgDgBIgGgBIgDgDIgZgQIgBgDQgDgDgLgIIgBgBIgBAAIgIgIIgNgPIgCgDQgGgKgFgGIgIgJIgCgCIgBgBIgEgJQgHgLgEgMIgDgFIgBgCIAAgDQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAAAgBAAQgEgNgDgNIgFgtIgBgJIAAgKIABgFQAAgPADgOIAHgZIAAgCQAKgdATgaQAIgMALgMQAMgMAMgKIAVgNIALgIIAPgHQADAAAEgBIAFgEQAkgNArAAIAQAAQAXABAPADIAGACQAQAEAIAIQADADADAGQADAFgCAJQgCANgFgkQgFAmgKAkQgPAxgZAsQgsBNArBQIAaAvQAWAnALAMIgGAIQgNARgoAAQg6AAgugXgAhVgsQANg8A3gRQg3ARgNA8g");
	this.shape_224.setTransform(813.9999,471.25);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#990000").s().p("AgJBAIADgDIADgBIADAAIAAgCIABgBIADAAIAEgDIgEADIgDAAIgBABIAAACIgDAAIgDABIgDADIgFgCIgBAAQgFgEgFgHQgBgSgFgPIgHgYIAAABIAAAAIAAAAQAHAFAMAAIAAAAIAAAAIAIAAQARgCAMgJQAMgJAEgPIABgCIgBACQgEAPgMAJQgMAJgRACIgIAAIAAAAIAAAAQgMAAgHgFIAAAAIAAAAIAAgBIgCAAIAAgBIgEgLIgHgMQACgUBJgOIAEAMIgDgBIgBgBIgBAAIgOgCIgBAAIgBAAIgIABIgBABQgQACgKAIQgLAIgFAKIAAAIIAAgIQAFgKALgIQAKgIAQgCIABgBIAIgBIABAAIABAAIAOACIABAAIABABIADABIAHAPQAHALAJAMQgCAFADAEIAAABIgBAEIABANIAAACIgEAVIgKAJIgIAHIgCgBIgCAAIgCADIgCAAIgCAAIgBACQgBAAAAAAQAAAAAAABQgBAAAAAAQAAABAAAAIgBACIgFADIABgHIAFgCIABgDQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIgKAGIgEAEIgHAFIgHgBgAAjAqIgFADIgEACIgHABIAAACIAFgCIACgBIgCABIgFACIAAgCIAHgBIAEgCIAFgDIADgCgAAFA8IAEgEIAKgGQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgBADIgFACIgBAHQgIACgFAAIAHgFgAARA6QAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABAAIABgCIACAAIACAAIACgDIACAAIACABQgGAEgFAEIgDAAIABgCgAAcg0IAAAAg");
	this.shape_225.setTransform(545.35,290.2);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#006600").s().p("AgiD+QgFgBgEgEIgCgCQgFgEgCgFIgBgCQgCgHACgIIADgHIgFABQgKAAgGgJQgHgJAAgLQABgGAEgFIAAgBIgDgIQgBgGgEgIIgGgQIgDgMIgKguQgBgHABgDIABgCIAAAAQgJgGgBgLQgCgJAEgJIABAAQgEgGgBgHQgCgKAEgGQAEgFAJgGIANgHIADgCIgBgHIAAgBQgBgFACgQQACgOgBgKQABgHgBgDIgFgNQgFgNgBgKQAAgIADgIQAEgHAGgDIgLgiIgFgNQgFgJgBgDQgCgJADgIIABgDIAAAAIgDACQgCABgDgCQgDgCAAgCIgBgDIgCAAQgEAAgCgBIgCgEIAAgDIAAAAIAFACIAHACQAGgBAIgCIAFgDIADAAQAGgDAGgFIAHgHIADAFQABACgBADQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQAAADgCADIgEACQAGACADAFQAFAGAEANIAQAuQAGgBAGACQAFACAFAFQAEAFAEANIAIAgIACABIAFAFIAEAFIADAIIAEABQAHACAEAGQAEAGABAHIABAHQAGADADAGQAEAGAAAIIAAABQAEgBAFACQAFADAEAFQAEAFADANIANA2IAFATIAEANQADAJACANQAJAAAGAHIADALIABAUIgUAKIgKAEQgFgCgEgFQgEgFgCgGIgBgDIgKgBQgDgFgBgJIgDgPIgEgOIgJglQgFgZgEgLIgFgRIgBgIIgJAEQgHADgVAPIgHAFQAAALgGAGQgGAGgGABIgFAGQgHAIgLgCQgHgCgFgGIgBAEQgCAGgDAEIgCABQgFAEgHAAIgCAAIACAEIANA6IAEALIAIAXIAAAAQAEgBAEABQAFABAFAEQAJAHABAOQAAAHgEAGQAFgBAHACQAFADAFAFQAEAGAAAIQACAHgDAHQgDAGgFADQgFADgGAAIgCAAgAhXjtIAAADIAAgDIgBgBgABeCfIAHgEIAUgKQgCAEgFADIgDACQgEAEgFACIgIgBgABbCfIAKgEIgHAEIgDAAg");
	this.shape_226.setTransform(555.8417,320.0861);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#333300").s().p("AgUBUQgEgHgBgIIgDAAQgHgBgFgFQgGgGgCgIIAAgEIAAgHQABgFACgDIgGgRQgEgMgEgFIgIgLIgIgMQgHgMAAgKQgFgFgCgHQgCgIACgHQACgHAGgFQAFgEAIABQAFAAAHAFIANAHIAOAHQAJADAEAGQADADABAEIABAAIARAHQAMAEAHABQAIAAAPgCIABAAIAAgCQgBgGADgGIACgDQAEgGAHgCQAGgBAFACQAFACAEAFQAEAEACAGQACAGgBAGQgBAGgDAFQgDAFgFABIgDACIgBADQAAAHgIALIgPAUIAAABQAEAEACAGQADAHAAAGIgEAKQgEAGgGADIgFABQgCAFgEAGQgQATgUAAQgMAAgIgJg");
	this.shape_227.setTransform(457.5877,301.9909);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFCC99").s().p("AD8H0IgCAAIgKABQgQAAgLgKIgGgGQgCADgFADQgJAHgNgBQgHgBgGgCQgGAFgGABQgKADgJgCQgKgCgJgIQgKAEgMgCQgMgDgIgJIgBAAIgKAIQgKAGgMgBQgLgBgKgHIgCgCQgEABgFgCIgDAAQgIgDgIgIIgFgEQgGgHgDgKIgBgEIgEgBQgLgCgJgIIgCgBIgDACIgGACIgBAAQgGAIgIAEQgJAEgJgCQgKgBgIgFIgBgBQgIADgJAAQgIgBgJgFIgFgDQgKgIgFgNQgFgMABgOQACgOAHgJIADgEQAAgIADgHIAAgIQADgOAHgJIAEgTIAEgNQgFgMACgOQACgOAIgKQAEgFAGgDQABgVAKgkQAEgOAEgIIAAgLIAAgEQgBgNAFgKQgFgIgCgLQgCgNAEgMQAEgMAKgIIABAAIgCgIQgBgHADgHQADgGAFgDIABAAIgCgCQgDgGAAgIQAAgHAEgGQADgGAHgCQAGgDAGADQAHACAEAGQAFAGABAHIgBAJIAGAHQADAHAAAHQAAAHgEAGIgGAGQAJAIAGALIADAKQAGABAGADIAEACIADADQAFAEACAFQAEAGACAGIFrAAIAFgFQAHgHAKgDQAKgBAKADQAKAEAHAIQALAMADAQQACAQgHAOIgHALQACAMgBAMQgDANgJAJIgGAGQADAJgBAJQAAANgHALQgEAFgEAEIACAJQABAMgDAMQgEALgIAIIgFAEQAFAJAAAKQAAANgGALQgFALgKAGIgDABQAHANAAAOQAAANgHALQgHAMgLAEQgKAEgLgCIgEAEQgJAHgKABQgDAJgIAHQgJAIgKABIgEAAQgJAAgIgEgAjiGJQgLgDgJgIQgJgJgEgLQgEgKABgJIgDgEIgDgJQgHgCgFgEIgQgOIgzg1IgNgMIgPgNIgCgDQgGABgGgCQgKgDgJgIQgIgIgEgKQgGgDgFgEQgGgEgKgMIgMgQQgLAAgJgGQgKgHgGgKQgGgLgBgNQgBgNAFgKIACgDIACgNIAFgSIAFgSIAFgcIAFgcIAHgaIADgLQABgGACgEQAEgLAHgIIAEgCQADgTABgUIACgYIAEgYIACgYQABgNAEgJQAEgIAGAAQADAAADADQAEADgBAEIAAAEIAHAKQABAEADADQACAAAEAEQAHAHADAJIADADIADADQAGAEADAHIAFAJIAFAHIAIALIAEAFIA7BMIALAPIAEADQAOANAJAQIAEAGIAEAHIALAIQAIAGAIAKIABACIAKgHIANgKIAFgJQAMgZASgGQAJgDAKACIABgBIALgIQAHgGAFAAQADAAAEAEQAGAEABAFQACAGgHALIgEAGQAEAEACAHQAEAMgDAMQgBAHgDAIIgHAPIgLAdIgFANQAEANgCARQgCAQgKAaIgZBBQgNAigKAnIgCAJQADAEABAFQAEALgBANQgCALgHAJQgGAKgKAEQgHADgGAAIgIgBgAHXh6QgEgDgDgEQgFABgMgBQgLgBgeAAQguAAgaADIgPACQgJAAgGgFQgHgEgDgIIguAHQgSAEgGAAQgIABgMgBIgVgBIgkABQgTgBgSgDIgigGIg2gDIgNAAIgCACQgCAGgEADQgDADgGABQgFABgFgDQgGgCgDgFQgDgDgBgDIgBAAQgEABgEAAQgGgBgGgEIgLgJQgPgPgHgJIgNgSQgEgGgOgOQgZgZgTgbQgEgFgXglQgRgagNgPIgQgRIgQgSQgLgPABgNIAAgCQgIgCgFgFQgFgFgDgJQgFgBgFgFQgEgDgCgFIgGgBQgGgCgFgGQgFgFgBgHQgBgHACgHQACgGAFgEQAEgEAHAAQAGgBAGAEQAFADAEAHIAAABIABAAIAFABQACgDAEgCQAFgDAGAAQAGABANAGIAMACIAOAAIAUgBIASAAIARAAIARABIBCABIAFAAQAHgGALAAIAMAAIAKABIALgCIALAAIASACQAKABAPgBIAagDQAMAAAHAEQACABACACIAZgDQAKgCAFABQAIAAAGAEIAAAAIAHgCQAQgEAIADQAFACAEAFQAEAFACAGQABAGgBAGQgCAGgDAFQgFAEgGADIgBAKIgBAKIgDAKIgDASIgEARIgEANIgBARQgBAJgEAOIgGAYIgEAYQgBAMgFAUIgDANQAEgBAEABIAGADIAAAAQABAAAAAAQAAAAAAABQAAAAAAABQAAAAAAABIgMA1QATg4ACABQAFgGAIAAIADAAIABgGIADgaIAEgeQAEgYAEgLIAHgVQAFgPACgeQAEgfADgOIAFgUIACgIIADgJQAEgKALgCQAJgCAJAJQAFAFABAHIACAEIAHAPIAKASIAfAxIAaAgIA0BCIAbAiIAhAoQAKAMACAJIAAADQAFgCAGACQAGACAEAEQAFAFABAHIABADIAGACQAGADACAFQAEAFABAGQABAIgCAGQgCAHgFADQgFAEgGAAQgHAAgFgDg");
	this.shape_228.setTransform(668.8583,322.0642);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFCC66").s().p("AG1EvInXAAIgDgDIg5i3IiTBqIkbl5ICCiUIFCGNII3AAQAHAdAPAaIAJCZg");
	this.shape_229.setTransform(671.65,300.7);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#999999").s().p("AhpD+QgCgCgBgEIgCgBIgMgDQgbgFgGAAIgOAAIgPABIgMACIgPAGQgGABgEgCQgEgDAAgFIgFgBQgGgDgGgGQgGgGgCgIIgDgGQgBgDgDgCIgDgCQgGgBgCgBQgDgCgCgFQgBgEACgCQADgFAFAAIAAgPIACgSIAAgBIAAgBIABgBIgBADIABgDIAAgBQABgEAEgCIAEgCIgBgIQgBgYAEgOIADgMIACgKIADgIIACgFQAAgDACgDIACgIIAAgJIgBgUQABgKADgDQABgDADgBIABAAQgBgHACgLQACgSADgNQgEgFgEgLIAAgBIgBgBIgDgPQAAgJAFgFIAEgCIAHgBIAHAAIAAgCQgBgKADgEQACgDADAAIgBgDQgEgOABgOQACgPAFgMIAEgIQgDgBgBgFQgBgEAAgFQAAgHACgEIAHgJIABgGIABgHQABgFADgDIgBgDIACgGQAEgFAHACQADAAACADQADACABAFIAFAOIABACIADgBQADgBAFACQAEAAADACQACABACAEIADAFIAIAMIAFAHIAEAEQAMAIALAQIACgFQACgGAEABQAFAAADAGIACAMIAAABIAAAAIADACIABgBQABgDAFAAQAEABAEACQAEAEAGALQAHAIARAHQAUAIAFAFQAFAEACgBIAEgDQADgCAFADQAFADADAFQADAAAFAEIAIAGIADgBQAEAAAHADIATAJIAHAEIAeAFQASADAdABIA3ACQAGAAADACIAFADIAPgEQAJgCADABIAFABIAFgBQADAAADADQADADgBAEIgBAHIgDAIQgCAEgFAEIgIAIQAEADgBAFQgBAEgDAEIgEAFIgGADIgLADQACAHAAAIIAAAMIg2BWIgmAnIAAADQAAAGgCACIAAABIAAALIgBAAIAAABIgBAAQgDANgIADIAAABQAEAEAAAFQgBAEgDADQgEABgEgBQgFgBgFgDIgFgDQgBgBAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAIgCAAIgGAFQgDACgIABQgHAAgDACIgIAJQgFAHgDACIgHAEIgEAFIgFAFQgFABgBACIgDADIgBAEQgEAGgGgBIgEgEIgCgBIgGgCIgMgDIgHgCIgIAAIgdAAIgNABQgHABgGACIgLAJQgHAFgFAAQgFAAgDgEgAheDqIAAABIABgBIgBAAIAAAAgACGgmIAAABIABgBIgCgBIABABgAC1BsgADrAWQgCASgKARQgKAQgVAWIgLANgADrAWIAAAAg");
	this.shape_230.setTransform(610.033,201.9827);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_5,p:{regX:134.1,regY:90.6,scaleX:0.4662,scaleY:0.4808,rotation:0,x:1206.25,y:347}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance_1,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}},{t:this.instance,p:{regX:58.6,regY:72.7,scaleX:0.2165,scaleY:0.2984,x:871.7,y:412.2}}]},346).to({state:[{t:this.shape_42},{t:this.shape_62},{t:this.shape_40},{t:this.shape_41},{t:this.shape_61},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_24},{t:this.shape_57},{t:this.shape_25},{t:this.shape_26},{t:this.shape_56},{t:this.shape_2},{t:this.shape_8},{t:this.shape_55},{t:this.shape_3},{t:this.shape_54},{t:this.shape_53},{t:this.shape_28},{t:this.shape_10},{t:this.shape_52},{t:this.shape_51},{t:this.shape_1},{t:this.shape_50},{t:this.shape_14},{t:this.shape_49},{t:this.shape_16},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape},{t:this.shape_43},{t:this.shape_22},{t:this.instance_5,p:{regX:134,regY:91.1,scaleX:0.4647,scaleY:0.5307,rotation:-14.9924,x:1199.3,y:353.8}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance_1,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}},{t:this.instance,p:{regX:58.6,regY:72.7,scaleX:0.2165,scaleY:0.2984,x:871.7,y:412.2}}]},6).to({state:[{t:this.shape_42},{t:this.shape_76},{t:this.shape_40},{t:this.shape_41},{t:this.shape_75},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_74},{t:this.shape_38},{t:this.shape_39},{t:this.shape_73},{t:this.shape_72},{t:this.shape_25},{t:this.shape_71},{t:this.shape_4},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_70},{t:this.shape_69},{t:this.shape_28},{t:this.shape_68},{t:this.shape_67},{t:this.shape_12},{t:this.shape_1},{t:this.shape_23},{t:this.shape_14},{t:this.shape_66},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_65},{t:this.shape_20},{t:this.shape_64},{t:this.shape_11},{t:this.shape_63},{t:this.instance_5,p:{regX:134.2,regY:91.3,scaleX:0.5221,scaleY:0.5777,rotation:0.003,x:1201.85,y:360.35}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_42},{t:this.shape_83},{t:this.shape_40},{t:this.shape_41},{t:this.shape_82},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_60},{t:this.shape_38},{t:this.shape_39},{t:this.shape_24},{t:this.shape_81},{t:this.shape_25},{t:this.shape_26},{t:this.shape_80},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_9},{t:this.shape_69},{t:this.shape_28},{t:this.shape_10},{t:this.shape_79},{t:this.shape_12},{t:this.shape_1},{t:this.shape_78},{t:this.shape_14},{t:this.shape_49},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_21},{t:this.shape_20},{t:this.shape},{t:this.shape_77},{t:this.shape_22},{t:this.instance_5,p:{regX:134.1,regY:91.5,scaleX:0.5565,scaleY:0.6579,rotation:-14.9932,x:1186.45,y:368.3}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_42},{t:this.shape_87},{t:this.shape_40},{t:this.shape_41},{t:this.shape_82},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_60},{t:this.shape_38},{t:this.shape_39},{t:this.shape_24},{t:this.shape_86},{t:this.shape_25},{t:this.shape_26},{t:this.shape_4},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_9},{t:this.shape_69},{t:this.shape_28},{t:this.shape_10},{t:this.shape_85},{t:this.shape_12},{t:this.shape_1},{t:this.shape_84},{t:this.shape_14},{t:this.shape_49},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_21},{t:this.shape_20},{t:this.shape_64},{t:this.shape_77},{t:this.shape_22},{t:this.instance_5,p:{regX:134.1,regY:91.5,scaleX:0.5564,scaleY:0.6578,rotation:0.0027,x:1175.8,y:377.55}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance_1,p:{regX:58.6,regY:72.7,scaleX:0.2165,scaleY:0.2984,x:871.7,y:412.2}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_42},{t:this.shape_89},{t:this.shape_40},{t:this.shape_41},{t:this.shape_75},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_74},{t:this.shape_38},{t:this.shape_39},{t:this.shape_73},{t:this.shape_88},{t:this.shape_25},{t:this.shape_71},{t:this.shape_4},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_70},{t:this.shape_69},{t:this.shape_28},{t:this.shape_68},{t:this.shape_67},{t:this.shape_12},{t:this.shape_1},{t:this.shape_23},{t:this.shape_14},{t:this.shape_66},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_65},{t:this.shape_20},{t:this.shape_64},{t:this.shape_43},{t:this.shape_63},{t:this.instance_5,p:{regX:134.2,regY:91.7,scaleX:0.5564,scaleY:0.6578,rotation:-8.22,x:1168.9,y:390.2}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_42},{t:this.shape_89},{t:this.shape_40},{t:this.shape_41},{t:this.shape_75},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_32},{t:this.shape_30},{t:this.shape_33},{t:this.shape_74},{t:this.shape_38},{t:this.shape_39},{t:this.shape_73},{t:this.shape_88},{t:this.shape_25},{t:this.shape_71},{t:this.shape_4},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_70},{t:this.shape_69},{t:this.shape_28},{t:this.shape_68},{t:this.shape_85},{t:this.shape_12},{t:this.shape_1},{t:this.shape_23},{t:this.shape_14},{t:this.shape_66},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_65},{t:this.shape_20},{t:this.shape_64},{t:this.shape_43},{t:this.shape_63},{t:this.instance_5,p:{regX:134.3,regY:91.9,scaleX:0.5563,scaleY:0.6576,rotation:6.7771,x:1168.8,y:401.55}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_42},{t:this.shape_89},{t:this.shape_40},{t:this.shape_41},{t:this.shape_75},{t:this.shape_35},{t:this.shape_34},{t:this.shape_36},{t:this.shape_90},{t:this.shape_30},{t:this.shape_33},{t:this.shape_74},{t:this.shape_38},{t:this.shape_39},{t:this.shape_73},{t:this.shape_88},{t:this.shape_25},{t:this.shape_71},{t:this.shape_4},{t:this.shape_2},{t:this.shape_8},{t:this.shape_5},{t:this.shape_3},{t:this.shape_70},{t:this.shape_69},{t:this.shape_28},{t:this.shape_68},{t:this.shape_85},{t:this.shape_12},{t:this.shape_1},{t:this.shape_23},{t:this.shape_14},{t:this.shape_66},{t:this.shape_16},{t:this.shape_18},{t:this.shape_6},{t:this.shape_17},{t:this.shape_19},{t:this.shape_65},{t:this.shape_20},{t:this.shape_64},{t:this.shape_43},{t:this.shape_63},{t:this.instance_5,p:{regX:134.3,regY:92.1,scaleX:0.5561,scaleY:0.6575,rotation:-8.2189,x:1160.25,y:410.7}},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2,p:{regX:4.6,regY:-16.9,scaleX:0.0762,scaleY:0.0592,x:558.5,y:527.1}},{t:this.instance,p:{regX:58.8,regY:72.5,scaleX:0.2398,scaleY:0.3643,x:584.2,y:291.3}}]},6).to({state:[{t:this.shape_133,p:{x:640.3775,y:227.9976}},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130,p:{x:488.184,y:297.8561}},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125,p:{x:961.898,y:554.0402}},{t:this.shape_124,p:{x:863.975,y:640.475}},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116,p:{x:634.125,y:251.2863}},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107,p:{x:602.175,y:336.775}},{t:this.shape_106},{t:this.shape_105,p:{x:589.3583,y:304.0835}},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92,p:{x:842.475,y:668.025}},{t:this.shape_91},{t:this.instance_6}]},62).to({state:[{t:this.shape_168},{t:this.shape_133,p:{x:860.2775,y:212.8476}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_125,p:{x:1181.698,y:538.8402}},{t:this.shape_162},{t:this.shape_161},{t:this.shape_124,p:{x:1083.825,y:625.275}},{t:this.shape_130,p:{x:708.084,y:282.7061}},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_116,p:{x:854.025,y:236.1363}},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_92,p:{x:1062.325,y:652.825}},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_105,p:{x:809.2583,y:288.9335}},{t:this.shape_140},{t:this.shape_107,p:{x:822.075,y:321.625}},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134}]},110).to({state:[{t:this.shape_133,p:{x:640.3775,y:227.9976}},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130,p:{x:488.184,y:297.8561}},{t:this.shape_184},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125,p:{x:961.898,y:554.0402}},{t:this.shape_183},{t:this.shape_123},{t:this.shape_182},{t:this.shape_121},{t:this.shape_181},{t:this.shape_119},{t:this.shape_180},{t:this.shape_179},{t:this.shape_116,p:{x:634.125,y:251.2863}},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107,p:{x:602.175,y:336.775}},{t:this.shape_106},{t:this.shape_105,p:{x:589.3583,y:304.0835}},{t:this.shape_174},{t:this.shape_103},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_169},{t:this.shape_92,p:{x:842.475,y:668.025}},{t:this.shape_91},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance,p:{regX:58.3,regY:72.3,scaleX:0.3869,scaleY:0.4303,x:571.7,y:427.75}},{t:this.instance_2,p:{regX:4,regY:-15.8,scaleX:0.0503,scaleY:0.0444,x:734.9,y:297.25}}]},50).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185}]},47).wait(46));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_איש_עם_פלאפון_מאוהב = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// איש_עם_פלאפון_מאוהב
	this.instance = new lib.shining_bling();
	this.instance.setTransform(357.1,361.65,0.6635,0.7303,165.0227,0,0,46.5,44.4);

	this.instance_1 = new lib.shining_bling();
	this.instance_1.setTransform(625.55,177.3,0.7145,0.539,0,-150.0837,29.9322,61.4,42);

	this.instance_2 = new lib.updatedIphone("synched",0);
	this.instance_2.setTransform(488.95,230.6,0.9999,0.9999,0,0,0,70.5,95.7);

	this.instance_3 = new lib.pink_heart();
	this.instance_3.setTransform(1031.9,118.4,0.9997,0.9997,0,0,0,82.5,91.9);

	this.instance_4 = new lib.person_mouth();
	this.instance_4.setTransform(683.55,312.05,1,1,0,0,0,31.7,41.1);

	this.instance_5 = new lib.shining_bling();
	this.instance_5.setTransform(365.6,118.4,1,1,0,0,0,47.2,46.1);

	this.instance_6 = new lib.pink_heart();
	this.instance_6.setTransform(250.25,675.15,1.2478,1.1741,0,0,0,82.1,91.3);

	this.instance_7 = new lib.pink_heart();
	this.instance_7.setTransform(419.2,498.15,1.0617,0.9998,0,0,0,82.2,91.5);

	this.instance_8 = new lib.pink_heart();
	this.instance_8.setTransform(119,451.45,1.0937,0.9999,0,0,0,82.2,91.4);

	this.instance_9 = new lib.pink_heart();
	this.instance_9.setTransform(231.45,243.1,1.1724,1.1776,0,0,0,82.2,91.4);

	this.instance_10 = new lib.pink_heart();
	this.instance_10.setTransform(84.85,79.9,1.0592,0.8937,0,0,0,81.9,91.2);

	this.instance_11 = new lib.pink_heart();
	this.instance_11.setTransform(585.1,63.1,0.764,0.7004,0,0,0,82.2,91.1);

	this.instance_12 = new lib.pink_heart();
	this.instance_12.setTransform(884.4,577.65,1.2356,1.1607,0,0,0,82,91.3);

	this.instance_13 = new lib.pink_heart();
	this.instance_13.setTransform(1153.15,556.65,1.2195,1.1748,0,0,0,82.1,91.4);

	this.instance_14 = new lib.pink_heart();
	this.instance_14.setTransform(976.15,311.25,1.0461,0.9998,0,0,0,82.1,91.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(9.4,1,1).p("AZIjmQrnKM6lkPIsDl9QAIACAHACQAAAAABABQAZAGAYAGQIaCGFVhA");
	this.shape.setTransform(647.9,351.0012);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("EAXZgn6QAPAqALAvEAXZgn6QgEAngOAiQAXAFAVALQAZANAVAVQBOBPAACdQAACdhLBvQgpA9gxAbQgrAYgxAAQhrAAhMhwQhLhvAAidQAAgwADglQAGhXAVghQAegwCVgfQBPgRA7APEACtgpUQh9iYAAjLQAAjsCoinQCpinh4DUQh4DUIbgpQIZgpC5FWQBpDCgOCJA5sdOQgInMAZmIQAoptB9m/QBrh/BBioQFYsjKCuDQEGlvDXjmEARvgjoQiOAHi+gxQmihsipinQgYgXgTgYAXK8vQglCKg5CbQk7NRhcEKQm2LliULEQhaGwARGkQAgL8CqLSQmLC5oqi5QrADwlLjwQisr2gMrYIPsAAQh6NUFRJ6AqUDYQBcAHB4gPQCTB6jMBGQhLhzhSgnQgGAPgOAIQgRAKgTgGQgUgFgKgQQgGgMABgMQAAgGABgGQACgIAEgFQAFgKALgGQARgKAUAFQATAGAJAQQAEAGABAGQADAMgDAMQgBAEgBACArxDkQhUADhcBMQjPikDXgvQA7BOB0AdAqAdOIPCAA");
	this.shape_1.setTransform(710.5266,371.1504);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1.9,1,1).p("AoykYQCdhUBZBWQAeAdAWAwAGHA7QDjBChJDG");
	this.shape_2.setTransform(775.6367,188.1433);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("AgCjtQhHB6hnA4QhnA5hKgqQhLgrgCh1QgCh0BHh6QBIh6Bng5QBng4BKAqQBJAqACB1QADB1hHB6gALhBZQhHB6hoA4QhnA5hKgqQhKgrgCh1QgCh0BHh5QBHh6Bog5QBmg4BLAqQBKAqACB1QACB1hHB5gAJlJaQgLAmhEALQhDALhWgXQhVgXg2grQg1grAKgmQAKgnBFgLQBEgLBVAXQBWAXA1ArQA1ArgKAngAnnCtQgdAdhAgZQhAgYg/g+Qg+g+gZg+QgYhAAcgcQAdgcBAAYQBBAZA+A9QA/A9AYBAQAYA/gcAcg");
	this.shape_3.setTransform(737.6364,233.4433);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#663300").s().p("AgMAAIgBgBIADgGIACgBIADgBIAIgCIADAAIACACIAEADIABACIABADQAAAGgDAFIgQACQgFgFgCgHg");
	this.shape_4.setTransform(-23.025,548.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AvKb4IACgGQACgGAAgHIgCgLQBcAHB4gPQCTB6jMBGQhLhzhSgngAzNZiQA7BOB0AdQgEAFgCAIIgBAMIABgMQACgIAEgFQAFgKALgGQARgKAUAFQATAGAJAQQAEAGABAGIACALQAAAHgCAGIgCAGQgGAPgOAIQgRAKgTgGQgUgFgKgQQgGgMABgMQhUADhcBMQjPikDXgvgAvIbaIAAAAgAODmFQhLhvAAidQAAgwADglQAGhXAVghQAegwCVgfIACAAIADgBQAmgIAiAAIABAAIAAAAQAdAAAaAGIADABIABAAIABAAIgBAAIgBAAIgDgBQgagGgdAAIAAAAIgBAAQgiAAgmAIIgDABIgCAAQiVAfgeAwQgVAhgGBXQiOAHi+gxQmihsioinQgYgXgTgYQh9iYAAjLQAAjsCoinQCoinh3DUQh4DUIagpQIZgpC5FWQBpDCgOCJQgEAngOAiQAXAFAVALQAZANAVAVQBOBPAACdQAACdhLBvQgpA9gxAbQgrAYgxAAQhrAAhMhwg");
	this.shape_5.setTransform(741.3231,217.3629);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCCFF").s().p("AHdF/QhVgXg2grQg1gsAKgmQAKgmBFgLQBEgLBVAXQBWAWA1AsQA1ArgKAmQgLAmhEALQgWAEgYAAQgxAAg6gPgAnkhOQhAgYg/g+Qg+g+gZhAQgYg/AcgdQAdgcBAAYQBBAZA+A+QA/A+AYA/QAYBAgcAcQgQAPgZAAQgWAAgegLg");
	this.shape_6.setTransform(728.0381,259.0768);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AFqEqQAOh9hrAQQhrAPA5hiQA5hiBOguQBQgwA3AfQA2AfgDBaQgBBcg5BiQg5BignAiQgIAHgGAAQgVAAALhhgAl4gcQANh9hqAPQhsAPA5hhQA6hiBOgwQBPgvA3AfQA2AfgCBbQgBBcg5BiQg5BhgnAiQgIAHgGAAQgWAAAMhgg");
	this.shape_7.setTransform(756.968,216.4537);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F6F6F9").s().p("EgV2At9Qisr2gMrZIPsAAIvsAAQgInMAZmIQAopsB9m/QBrh/BBioQFYsjKCuDQEFlwDYjlQATAYAYAXQCpCnGiBsQC+AxCOgHQgDAkAAAwQAACdBLBwQBMBvBrAAQAxAAArgXQglCKg5CbQk7NRhcEJIgDADIgCACIgEADQoMHFviAAIAAAAIAAAAQmdAAnthOIgKgBIAKABQHtBOGdAAIAAAAIAAAAQPiAAIMnFIAEgDIACgCIADgDQm2LmiULDQhaGwARGkQAgL8CqLTQmLC4oqi4Qj3nSAApIQgBjTAhjiQghDiABDTQAAJID3HSQlgB3kDAAQkDAAilh3gAGAWuIvCAAgAm7gOQDMhHiTh5Qh4APhcgHQgBgGgEgGQgJgRgTgFQgUgFgRAKQgLAFgFAKQh0gcg7hPQjXAwDPCjQBchLBUgEQgBANAGALQAKARAUAFQATAFARgKQAOgIAGgOQBSAmBLB0gAJj1GQhFALgKAnQgKAmA1ArQA2ArBVAXQBWAXBDgLQBEgLALgmQAKgng1grQg1grhWgXQg6gPgxAAQgYAAgWADgAMS3VQAuAAA1gbIAAAAIAEgCIAAAAIAGgDQBog4BHh6QhHB6hoA4IgGADIAAAAIgEACIAAAAQg1AbguAAIAAAAIAAAAQgjAAgegQIgDgBQhKgrgCh1IAAgHQAAhxBFh2QBHh6Bog5IADgCQA5geAvAAIABAAIAAAAQAjAAAeAQIABABIADABQBKAqACB1IAAAFQABByhGB4QBGh4gBhyIAAgFQgCh1hKgqIgDgBIgBgBQgegQgjAAIAAAAIgBAAQgvAAg5AeIgDACQhoA5hHB6QhFB2AABxIAAAHQACB1BKArIADABQAeAQAjAAIAAAAIAAAAgAN56AQgPB8AngiQAngiA5hiQA5hhABhcQAChcg2gfQg3gfhPAwQhOAvg5BiQg5BiBrgPQAMgCAKAAQBTAAgMBvgAnJ9+QgcAcAYBAQAZA/A+A+QA/A+BAAYQBAAZAdgdQAcgcgYg/QgYhAg/g+Qg+g9hBgZQgegLgWAAQgZAAgQAPgAAv8cQAuAAA2gcIABAAIADgCIAAAAIABgBIAEgBQBng4BHh6QhHB6hnA4IgEABIgBABIAAAAIgDACIgBAAQg2AcguAAIAAAAIAAAAQgjAAgdgPIgCgCIgBAAQhLgrgCh1IAAgFQAAhyBFh3QBHh6Bng5QA6ggAxAAIABAAIAAAAQAjAAAfAQIADACQBKAqACB1IAAAIQAABxhFB2QBFh2AAhxIAAgIQgCh1hKgqIgDgCQgfgQgjAAIAAAAIgBAAQgxAAg6AgQhnA5hHB6QhFB3AAByIAAAFQACB1BLArIABAAIACACQAdAPAjAAIAAAAIAAAAgACV/HQgOB8AmgiQAngiA5hiQA5hiABhbQADhcg3gfQg2gfhQAwQhOAvg5BiQg4BiBqgPQAMgCAKAAQBTAAgMBvgATq+CQASgwAAgpQAAh9isgyQCsAyAAB9QAAApgSAwgEAGMgncQAeAdAWAwQgWgwgegdIgCgBIgBgBQgsgpg9gBIAAAAIAAAAQg7ABhJAmIgBAAIgDACIgCABIACgBIADgCIABAAQBJgmA7gBIAAAAIAAAAQA9ABAsApIABABIACABIAAAAgEAYFgtQQAOgjAEgnQAPArALAvQgVgLgXgFg");
	this.shape_8.setTransform(704.3266,412.7375);

	this.instance_15 = new lib.Iphone("synched",0);
	this.instance_15.setTransform(412.8,143.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(9.4,1,1).p("A4FjPQBhAYBZAQQF5BHEIgqQAOgCANgDAYwjmQrHJw4zjdQhIgKhJgMIrUlm");
	this.shape_9.setTransform(650.225,351.0036);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(3.8,1,1).p("ADeB+QhfCiiDBNQiCBNhcg0Qhcg0ACiYQACiXBeihQBfihCChOQCDhNBcA1QBcA0gDCXQgBCYheCgg");
	this.shape_10.setTransform(683.5762,312.1007);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(0.1,1,1).p("As+rMQgDAAgDABQgFAAgFAAAs2ttQABAAABAAQACAAACAAQgCgBgCAAQgBABgBAAgAAmgNQhGB6hnA3QhnA5hKgqQhLgrgCh0QgChzBHh7QBIh6Bng4QBng5BJArQBKAqACB0QADB1hIB6gAMKE5QhHB7hoA3QhnA5hKgqQhKgqgCh1QgCh0BHh7QBHh5Bog4QBmg5BLArQBKAqACBzQACB1hHB6gAKOM6QgLAmhEALQhDALhWgWQhVgXg2grQg1gsAKgmQAKgmBFgLQBEgLBVAXQBWAWA1AsQA1ArgKAmgAm+GOQgdAchAgYQhAgYg/g+Qg+g+gZhAQgYg/AcgdQAdgcBAAYQBBAZA+A+QA/A+AYA/QAYBAgcAcg");
	this.shape_11.setTransform(733.5277,210.9723);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(2,1,1).p("EAXzgmhQAZANAVAVQBOBPAACdQAACdhLBvQgpA9gxAbQgrAYgxAAQhrAAhMhwQhLhvAAidQAAgwADglQAGhXAVghQAegwCVgfQBPgRA7APQAXAFAVALgEAXZgn6QgEAngOAiEAXZgn6QAPAqALAvEACtgpUQh9iYAAjLQAAjsCoinQCpinh4DUQh4DUIbgpQIZgpC5FWQBpDCgOCJA5sdOQgInMAZmIQAnpbB3m3QADgNAEgNQBWhlA7iBQAOgfANgiQFYsjKCuDQEGlvDXjmEARvgjoQiOAHi+gxQmihsipinQgYgXgTgYAXK8vQglCKg5CbQk7NRhcEKQm2LliULEQhaGwARGkQAgL8CqLSQmLC5oqi5QrADwlLjwQisr2gMrYIPsAAIPCAAAqUDYQBcAHB4gPQCTB6jMBGQhLhzhSgnQgGAPgOAIQgRAKgTgGQgUgFgKgQQgGgMABgMQAAgGABgGQACgIAEgFQAFgKALgGQARgKAUAFQATAGAJAQQAEAGABAGQADAMgDAMQgBAEgBACArxDkQhUADhcBMQjPikDXgvQA7BOB0AdAqAdOQh6NUFRJ6");
	this.shape_12.setTransform(710.5266,371.1504);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF0000").s().p("AvKb4IACgGQACgGAAgHIgCgLQBcAHB4gPQCTB6jMBGQhLhzhSgngAzNZiQA7BOB0AdQgEAFgCAIIgBAMIABgMQACgIAEgFQAFgKALgGQARgKAUAFQATAGAJAQQAEAGABAGIACALQAAAHgCAGIgCAGQgGAPgOAIQgRAKgTgGQgUgFgKgQQgGgMABgMQhUADhcBMQjPikDXgvgAvIbaIAAAAgAODmFQhLhvAAidQAAgwADglQAGhXAVghQAegwCVgfIACAAIADgBQAmgIAiAAIABAAIAAAAQAdAAAaAGIADABIABAAIABAAQAXAFAVALQAZANAVAVQBOBPAACdQAACdhLBvQgpA9gxAbQgrAYgxAAQhrAAhMhwgAHvsQQmihsioinQgYgXgTgYQh9iYAAjLQAAjsCoinQCoinh3DUQh4DUIagpQIZgpC5FWQBpDCgOCJQgEAngOAiIgBAAIgBAAIgDgBQgagGgdAAIAAAAIgBAAQgiAAgmAIIgDABIgCAAQiVAfgeAwQgVAhgGBXIgkABQiCAAimgrg");
	this.shape_13.setTransform(741.3231,217.3629);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F6F6F9").s().p("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");
	this.shape_14.setTransform(704.3266,412.7375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11,p:{regX:82.2,regY:91.1,scaleX:0.764,scaleY:0.7004,x:585.1,y:63.1}},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3,p:{regX:82.5,regY:91.9,scaleX:0.9997,scaleY:0.9997,x:1031.9,y:118.4}},{t:this.instance_2},{t:this.instance_1,p:{regX:61.4,regY:42,scaleX:0.7145,scaleY:0.539,rotation:0,skewX:-150.0837,skewY:29.9322,x:625.55,y:177.3}},{t:this.instance,p:{regX:46.5,regY:44.4,scaleX:0.6635,scaleY:0.7303,rotation:165.0227,skewX:0,skewY:0,x:357.1,y:361.65}}]},44).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_7},{t:this.shape_6},{t:this.shape_4},{t:this.shape_12},{t:this.shape_11},{t:this.shape_2},{t:this.shape_10},{t:this.shape_9},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11,p:{regX:82.3,regY:91.2,scaleX:0.6415,scaleY:0.5295,x:588.15,y:54.25}},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_1,p:{regX:-243.1,regY:176.5,scaleX:0.664,scaleY:0.7307,rotation:165.0032,skewX:0,skewY:0,x:519.05,y:219.35}},{t:this.instance,p:{regX:48.9,regY:46.3,scaleX:0.7172,scaleY:0.5416,rotation:0,skewX:-150.0077,skewY:29.9895,x:619.75,y:171.2}},{t:this.instance_3,p:{regX:82.2,regY:91.5,scaleX:0.9999,scaleY:0.9999,x:1030.9,y:121.1}},{t:this.instance_15}]},45).to({state:[]},46).wait(211));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_חבר_טלפון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// חבר_טלפון
	this.instance = new lib.noki_friend("synched",0);
	this.instance.setTransform(577.7,247.65,0.5642,0.5093,0,-3.0487,0.4757,127.7,175.6);

	this.instance_1 = new lib.fly();
	this.instance_1.setTransform(905.05,219.75,0.0299,0.0232,0,0,180,3.4,-13);

	this.instance_2 = new lib.fly();
	this.instance_2.setTransform(797.2,188.4,0.0269,0.0283,0,-3.1266,11.6608,12.1,-11.2);

	this.instance_3 = new lib.heartsTrash();
	this.instance_3.setTransform(792.7,305.35,0.0951,0.1027,-0.0085,0,0,1252.4,-171.8);

	this.instance_4 = new lib.fly();
	this.instance_4.setTransform(569.3,420.25,0.0571,0.0623,0,0,180,-113,91.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1.3,1,1).p("AnNhUIAAABQgCB/AODKIgCAAIAIAEQA1CWg5hiQgHBYgVhXQhNA3A7hRQhQASBig9IAYAMAnUiIQgqCdAjDVAGlkRIAAACAGlkRQAAAAAAABQAAAAAAABIAAAAQACADALAIIAhAWIABABQAKgFAJgFQAmgUAFgIAISkUQgCgFggAIQAxg/g8AoQABhigXBjQgVhJgVBf");
	this.shape.setTransform(845.7972,362.3875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#535353").ss(0.1,1,1).p("AiCHxQhNmFgbmVQgGhFgBg8AB8n5IAAAAQABAEAAAOAB7nxQABAFABAEQAAAAAAAAIAAABIAAAAQAHAlAGApQACAPADAPQAuEYAeEWQABAPACAPQAFA2AFA3ADqE9QAEAtAEAsABwHhQgEABgDACABUHqQgqAKgpAEAiCHxIgPADAgqH6QgtAAgrgJAAAH5QgJAAgJABADcG1QgiASgiAM");
	this.shape_1.setTransform(830.4,349.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3.6,1,1).p("AkumRQBUghAFgCQABAAABgBQAhgOAigLQAHgCAHgCAkfAtIgHgzQgYi4AHjGAiAnTIAegGIBhgWQAngHAngBIA2ABQABAAACAAIAAAAACNn1QACAAACAAQADAAADAAACRn2QADAAADABQAXABAIADAC+nxQBjD0AVEYIAAABQABABAAABIAAAEAE3A2IABACIAAACQAAADAAADQAFCvghCzQgJAGgLAFIgXAMQgsAUgtAOAE4BAIAAgGACDHhQh1Agh7gMQgjgEgTgEQhYjUgkjq");
	this.shape_2.setTransform(828.3526,349.3486);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AnbEvQhOA3A8hRQhQASBhg9IAZAMIAHAEQA2CWg5hiQgEAsgHAAQgHAAgKgrgAHSjuIghgWQgLgIgCgDIAAAAIABgCQAUhfAWBJQAXhjgBBiQA7gogwA/QAfgIADAFIgBABQgEAIgmAUIgUAKgAGkkQIABgBIgBACIAAgBg");
	this.shape_3.setTransform(845.8055,362.3875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("A+FOGQgPgCgKgEIByAAIgPAEQgVAEgWAAQgQAAgPgCgATegsQgHgCgBgFQgCgIANgIQAPgIAUgEQAMgDALABIgSiuIgBgCIAYgEIAAAFIASCwQAIAJgCAGQgCAGgNAHQgKAFgMADgAXHh2QgOgCgCgGQgCgFAGgFIg0iIIgBgDIABAAIAUgEIABAAIAAABIAAAAIAzCEQgBgEAHgIQAHgKAMgHQALgHAEAJQADAIgGAPQgGAOgMALQgKAIgKAAIgHgBgAPxmQQgjjWAqieIAHA0IAAACQgCCAAODJIgCABgAZXrDIAAgCIgBgCIgBgaIABACIAAAEQB6g6AqgNQApgNASgcIA8g8IAAABIAAABIAAAAQACADALAIIAhAYIgRATIgUAPQhzByiwARIAAgGgAZWrHIABACIAAACIAAAGgAZWrHg");
	this.shape_4.setTransform(697.275,425.9491);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("AiCHzQhOmFgbmVQgFhFgCg8QAEgLAEgCIAAgBQAdgOAogMQgiAMghAOIgCABIACgBQAhgOAigMIAOgEIACAAIAegHQA6gLAugGIAIgCQAGgCAFACQAtgFAygDQALAAAOARIABAAIAAAAIANBOIAEAeQAvEYAdEWIADAeIAKBtIgKhtIgDgeQgdkWgvkYIgEgeIAIAxQAuEYAeEWIADAeIAJBZIAHBZIACAUIgXALQgsAVgtAOIAAgBIgBAAIgUAEIgBAAIABACQhVAYhXAAQgiAAgigEgAihEjQAFAXAIAWQgVhFgLhGQAGAwANAugACuBvIADgBIAAgBIgDACgADcG3QgjASgiAMIgUAFQAtgOAsgVg");
	this.shape_5.setTransform(830.475,349.4729);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#003366").s().p("AhtHyQB7ANB1ghIACAEIgIADIAAgBIAAAAIgBAAIgUADIgBAAIABADQgqALgoAEIgCAAIgTABIAAgFIgXAEIABACQgtAAgrgJgAijHqQhYjTgkjrIAAgBIgHgzQgYi5AHjGQAtgYAtgKQACA8AFBFQAbGUBOGGQgjgEgTgEgAEGGXIgHhZIgJhZIgDgfQgekWgukXIgIgyIgNhNQAYgOAMAAIAIAAQBjD0AVEYIAAABIABAaIABAKIAAgGIAAAGQAFCwghCyIgUALIgCgTgAgBnyQApgFBRgBIAIAAIACgBIgBgBIAEABIgDAAIADAAIAAAAQAHADAEAPIgBgJIACAKIAAgBIgBAAIABAAQgPgQgLAAQgyADgtAFQgGgCgGACIgIACQgtAGg6ALg");
	this.shape_6.setTransform(828.3526,349.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1.3,1,1).p("AnNhUIAAABQgCB/AODKIgCAAAnbDqIAYAMIAHAEQA2CWg5hiQgHBYgVhXQhNA3A7hRQhQASBig9gAnUiIQgqCdAjDVAGkkPIAAAAQACADALAIIAhAWIABABQALgFAJgFQAmgUAEgIAISkUQgDgFgfAIQAwg/g7AoQABhigXBjQgWhJgUBfQgBAAAAABQAAAAAAABAGlkRIgBAC");
	this.shape_7.setTransform(852.6222,331.4375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#535353").ss(0.1,1,1).p("AiCHtQhOmFgbmVQgFhFgCg8AB7n1QALBBAMBIQAuEYAeEWQABAPACAPQAKBjAIBjACCHXQgzASgxAIAiCHtIgQADAgqH2QgtAAgrgJADcGxQgjASgiAM");
	this.shape_8.setTransform(837.275,319.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(3.6,1,1).p("AkeAtIgIgzQgXi4AHjGAiAnTIAegGIBhgWQAngHAngBIA2ABQABAAACAAIAAAAQAlABALAEAktmRQBTghAFgCQABAAABgBQAhgOAigLQAHgCAHgCAC+nxQBjD0AVEYIAAABQAAABABABIAAAEAE4A6QAAADAAADQAFCvghCzQgJAGgLAFIgXAMQgtAUgtAOAE3A2IABACIAAACAE4BAIAAgGACWHbQh+AniFgNQgjgEgTgEQhYjUgjjq");
	this.shape_9.setTransform(835.1776,318.3986);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AnbEvQhNA3A7hRQhQASBig9IAYAMIAHAEQA2CWg5hiQgEAsgHAAQgHAAgKgrgAHSjuIghgWQgLgIgCgDIAAAAIABgCQAUhfAWBJQAXhjgBBiQA7gogwA/QAfgIADAFIgBABQgEAIgmAUIgUAKgAGkkQIABgBIgBACIAAgBgAGlkRg");
	this.shape_10.setTransform(852.6305,331.4375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("A+nQhQgPgDgKgEIByAAIgPAEQgVAFgWAAQgQAAgPgCgAUYjkQgRgRgBgEQgBgFAEgFQAEgFALACQALABANAHQALAFAAAIIAgisIAAgBIAAgBIAZgEIgBADIghCzQAFAIgJAJQgJAIgPAAQgOAAgQgQgAXyjwQgOgDAAgIQgBgHAHgGIgSixIgBgEIABAAIAVgEIABAAIASCsIAOgDQASgDAOADQANADABAJQABAIgMAIQgNAJgSADQgKACgIAAQgIAAgGgCgAQTorQgjjWAqieIAIA0IAAACQgCCAANDJIgCABgAZ5teIAAgCIgBgCIgBgaIABACIAAAEQB6g6AqgNQApgNASgcIA8g8IAAABIAAABIAAAAQACADALAIIAhAYIgRATIgUAPQhzByiwARIAAgGgAZ4tiIABACIAAACIAAAGgAZ4tig");
	this.shape_11.setTransform(700.675,410.4741);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AiCHxIADAAQAhADAgAAIAAAAIABAAQBdAABcgbIADgBIACgBIABAEQgzARgyAIIABgDIgZAEIAAAAIgGACIAAgDIgSADIAAgDIgYAEIABACQgtAAgrgJgAg+H0QggAAghgDIgDAAQhOmGgbmVQgFhEgCg8QAEgLAEgDIAAAAQAdgPAogLQgiALghAOIgCABIACgBQAhgOAigLIAOgEIACgBIAegGQA6gMAugFIAIgDQAGgBAFACQAtgFAygDQALgBANAHIAXCKQAuEXAeEWIADAfQAKBiAIBjIgXAMQgtAUgtAOIgBAAIgCABIgDABQhcAbhdAAIgBAAIAAAAgAihEhQAFAWAIAWQgVhFgLhGQAGAwANAvgACuBtIADgCIAAAAIgDACgADcG1QgjARgiANIgVAEQAtgOAtgUg");
	this.shape_12.setTransform(837.275,318.7983);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#003366").s().p("AijHvQhYjUgjjrIAAgBIgIgzQgXi5AHjFQAsgZAtgKQACA9AFBEQAbGVBOGGQgjgEgTgEgAD2DpIgDgeQgekWgukXIgXiKQAZgEANABIAIAAQBjDzAVEYIAAACIABAZIABAKIAAgFIAAAFQAFCwghCzIgUALQgIhjgKhjgAgBnuQApgFBRgBIAIAAIACgBIgBgBIAEABIAAAAQAHAEADAFQgNgHgLABQgyADgtAEQgGgCgGACIgIADQgtAFg6AMgACGn1IgDAAIADAAg");
	this.shape_13.setTransform(835.1776,318.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#535353").ss(0.1,1,1).p("AhmGPQg9k7gVlIQgEg3gBgxAhmGPIgMACABgmWQAJA1AJA6QAlDjAXDhQABAMABAMQAIBQAGBQACsFeQgbAPgaAKABmF9QgoAOgnAHAghGWQgjAAgigH");
	this.shape_14.setTransform(819.325,321.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(3.6,1,1).p("AjslEQBBgbAEgCQABAAABAAQAagMAbgJQAFgCAFgBAhkl6IAXgFIBNgSQAegFAfgBIAqABQABAAABAAIAAAAQAdABAJACAjgAkIgGgpQgSiVAFigAB2GAQhjAghpgLQgbgDgOgDQhFisgci9ACVmTQBNDGARDiIAAAGAD0ArIAAACIAAADAD0AzIAAgDQAAACABABQAECOgaCRQgIAFgIAEIgSAJQgjARgjAL");
	this.shape_15.setTransform(817.6873,320.5313);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1.3,1,1).p("AlphEIAAABQgCBnALCjIgBAAIAFADQAqB5gthPQgFBHgQhGQg9AtAvhCQg/APBNgyIATAKAlvhuQghB/AcCsAFJjdQAAAAAAABQAAAAAAABIAAAAQACACAIAHIAaARIABABQAIgEAHgEQAegQAEgGAFJjdIAAACAGfjgQgCgDgZAGQAmgzguAgQAAhPgSBQQgRg7gQBN");
	this.shape_16.setTransform(831.3699,331.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999999").s().p("AhmGSQAaADAaAAIAAAAIAAAAQBJAABGgVIABAAIAAgBIAEgBIADgBIgDABIgEABIAAABIgBAAQhGAVhJAAIAAAAIAAAAQgaAAgagDQg9k7gVlIQgEg3gBgxQADgJADgCIABAAQAagMAbgJIALgDIABgBIAYgFQAugJAjgFIAGgCQAGgBADACQAjgFAogCQAIAAAKAFIASBvQAlDjAXDhIACAYQAIBQAGBQIgSAJQgjARgjALQAjgLAjgRQgbAPgaAKIgRADIgBAAIABADQgoAOgnAHIABgDIgUAEIgFABIAAgCIgOADIAAgEIgSAEIAAABQgjAAgigHgAh+DpIAKAlQgQg4gJg5QAFAnAKAlgACJBXIABAAIABgBIgCABgAiBl5QgbAJgaAMIgBAAQAXgMAfgJgAiBl5IAAAAg");
	this.shape_17.setTransform(819.325,320.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Al0D1Qg9AtAvhCQg/APBNgyIATAKIAFADQAqB5gthPQgCAkgGAAQgFAAgIgjgAFtjBIgagRIgKgJIAAAAIAAgCQAQhNARA7QAShQAABPQAugggmAzQAZgGACADIAAACQgEAGgeAQIgPAIgAFJjcIAAgBIAAACIAAgBg");
	this.shape_18.setTransform(831.3699,331.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("A8LQJQgPgCgKgEIBzAAIgPAEQgVAEgWAAQgQAAgQgCgAUOlqQgNgOAAgDQgBgEACgEQAEgEAJABQAIABALAFQAIAFAAAGIAZiLIAAgBIAUgEIgBADIgaCQQAEAHgHAHQgIAHgLAAQgLAAgNgNgAW5l0QgKgDgBgGQgBgFAHgGIgPiPIgBgDIABAAIARgDIAAAAIAPCLIALgCQAOgDAKADQALACABAHQABAHgKAGQgLAHgOADQgHABgHAAIgLgBgARDpzQgcitAgiAIAHAqIAAACQgCBnAKCjIAAABgAYjtqIAAgDIgBgCIAAgQQBggvAggKQAigLANgWIAwgxIAAAAIAAABIAAABQABACAJAHIAaATIgOAPIgPAMQhbBdiKANIAAgDgAYitvIABACIAAADIAAADgAYitvg");
	this.shape_19.setTransform(685,412.8491);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#003366").s().p("Ah/GQQhFirgci+IAAgBIgGgpQgSiWAFifQAjgVAjgHQABAwAFA4QAVFHA8E8IgpgHgADBC9IgDgZQgXjhgkjiIgShvQAUgDAKAAIAGAAQBNDGARDiIAAAFIABARIAAAIIAAgDIABADQAECOgaCRIgQAJQgGhRgIhPgAAAmPQAfgFBAAAIAGAAIACgBIgBgBIADABIAAAAQAGADACAEQgKgGgJAAQgnADgjAEQgFgBgFABIgGABQgjAFguAKgABpmVIgCAAIACAAg");
	this.shape_20.setTransform(817.6873,320.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(2,1,1).p("Aiuj4QAwgUADgBQAAAAABgBQATgIAUgIQAEgBAEgBAhKkgIASgFIA4gNQAWgEAWAAIAfAAQABAAABAAIAAAAQAWABAGACABtkzQA6CWAMCtIAAABQAAAAABABIABAJAC0AhIAAABIAAACAC0AnIAAgDQAAABABACQACBsgTBvQgFADgGAEIgOAHQgWAKgWAIAimAbIgEgfQgOhyAFh6ABcEjQgmAMgQADQgHABgFABQgBAAgCABQgCAAgBAAAAaEzQgFABgEABAALE2QgkADgmgEQgUgDgLgCQgziDgViQ");
	this.shape_21.setTransform(785.2083,321.6266);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#535353").ss(0.1,1,1).p("ACCCHQAAACAAABQAAACAAABIAAgGIgEgOQAEAjAFAoQABAWADAVQAAACAAACQAAABAAAAQAAABAAABACHDEIgFg3ABHk1QAKBBADAUQAPBiAbD3ACMD9IgBgHQABAHABAIAB/EMQgUAKgTAIAhLEwIgJACAgYE2QgaAAgZgGQgtjwgQj6QgCgqgCglAA7EoQgRAFgQAE");
	this.shape_22.setTransform(786.425,322.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(1.3,1,1).p("AkSCRIANAHIAFACQAfBdghg8QgEA2gMg2QgtAiAigyQguAMA5gmgAkKg0IAAACQgCBNAJB9IgCAAAkPhUQgYBhAVCEAEziqQgCgDgSAFQAcgngiAZQABg9gOA+QgNgugLA7QAAAAAAABIAAAAQAAACAHAFIATAOIABAAQAGgDAFgDQAWgMADgF");
	this.shape_23.setTransform(795.2978,329.6499);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999999").s().p("AhLEzQAmAEAlgDQglADgmgEQgtjxgQj5IgEhQQADgGACgCIABgBIAngQIAIgCIABAAIASgFQAhgGAbgEIAFgBQADgBADABQAZgDAdgCQAGAAAIAEIANBVQAPBiAbD3IAJBLIAEAsIAAADIAAACIAAABIACAPIgOAHQgWAKgWAIQAWgIAWgKQgUAKgTAIIgFABIAAgBIgBgGIAAgBIgFAFIgLgBIgCAAIAAgEIgBAEIgBABIASADQgmAMgQADQAQgDAmgMIgVAKIghAIIAAgDIgLgDIgBAAIAAAEIgJACIgFAAIAAAAIAAABIAAABIgKACIAAgCIgOACIAAABQgaAAgZgFgAALEzIAAgBIgDABIgDAAIAJgCIAAABIgDABIADgBIAAACIgDAAgAAOEygAAOExgABQEhgAiHkPIABgBIgBABgAiGkQIAAAAg");
	this.shape_24.setTransform(786.425,321.8475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AkSC7QgtAiAigyQguAMA5gnIANAIIAFACQAfBcghg7QgCAbgEAAQgEAAgGgbgAEOiSIgTgPQgHgEAAgCIAAAAIAAgCQALg6ANAuQAOg+gBA9QAigZgcAmQASgEACACIAAABQgDAGgWAMIgLAGg");
	this.shape_25.setTransform(795.2978,329.6499);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("A4nP4QgPgCgKgEIBzAAIgPAEQgVAEgWAAQgQAAgQgCgATVnsQgHgDAAgFQgBgFAFgEQAIgEAIAAIAHgBIgQhlIAAgCIAAgBIAAgBIAAAAIAHAAIACAAIADgBIABABIgCAAIgCAAIACAAIACAAIAAABIARBtQAEADAAADQABAGgGADQgGAEgKABIgEAAQgHAAgGgDgAVzojQgJgDAAgEIhShKIAQgCIBRBGQgDgDAEgEQAHgGAGgCQAIgDADACQAFABAAACQABACgEAKQgGALgIACQgGACgGAAIgHgBgATmprgAQgq/QgViEAYhiIAEAgIAAACQgBBOAIB9IgBAAgAWCt/IAAABIAAACIAAADgAWDuFIgBgRIAAABIAAACQA9geAbgJIAGgDQAYgIAKgQIAjgkIAAACIAIAGIATAOIgVAUQgkAkgtAUQgoARgvAEIAAgDg");
	this.shape_26.setTransform(662.2,414.5491);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#003366").s().p("AhbEyQg0iDgUiRIAAgBIgFgfQgNhyAEh6QAagPAagGIAEBPQAQD6AsDwIgegEgACaD7IAAgBIgBgCIAAgDIgEgsIgEg2IAEA2IgIhLIADAPIAAADIABADIgBgGIABAGIgBgDIAAgDIgDgPQgbj2gPhiIgOhVIAYAJQA8CWAICyQAICzgeAtgACRCTIAAAAgAACkwQAXgEAvAAIAFAAIABgBIgBAAIACAAIABAAQAEADABADQgHgFgGABQgeABgZADQgDgBgEABIgFACQgZADgiAHgABPk1IgBAAIABAAg");
	this.shape_27.setTransform(784.956,321.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(0.1,1,1).p("AAFhXQgSBLAPBl");
	this.shape_28.setTransform(761.8219,330.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(2,1,1).p("Ag7jeIAOgDIAtgLQARgDATAAIAKAAIAOAAQABAAABAAIAAAAQARABAFABAg6DtIgFgBQgEAAgDgBAAJDvQgCAAgCAAAB8DMQgBAAAAAAQgHADgGACQgGADgFACQgOAGgJAEQgLAEgBAAQgEABgDACQgOADgNACQgFABgEAAQgBAAgBABQgCABgBgBAAVDtQgCAAgBAAQgCABgCAAAAEDvQgaACgcgDAB8DMQgBAAAAAAIgMAGIAAAAACRAXQACBagPBWQgEACgEADABjDXQgLAFgMAEABXjtQAvB0AKCJAiLi/QAmgPADgBQAAgBABAAQAPgGAQgGQADgBADgBAiFAVIgDgYQgLhXAEhfAhLDqQgphkgRhw");
	this.shape_29.setTransform(776.0251,322.315);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(1.3,1,1).p("AD2iDQgCgCgOADQAWgdgcATQABgvgKAvQgLgjgJAtQAAABAAABQAAABAFAEIAQALIAAAAQAFgCAEgDQASgKACgDAjWgoIAAACQAAA7AGBgIgBAAIAEACQAZBIgbgvQgDAqgKgqQgkAbAbgnQgkAJAtgdIALAF");
	this.shape_30.setTransform(784.1127,328.4812);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#535353").ss(0.1,1,1).p("AA4juQAJAyADAQQAMBLAVC+QAEAbADAfQABARACARQAAABAAABQAAABAAABIAAAAQABAGABAGIAAAAABpBtIgBgFQAAACAAABQAAABABABgABoBoIgDgLABxDDIgCgGABlDPIAAAAABaDVQgKAEgKAEABsCXIgDgqAAwDlQgOAEgOADAgTDvQgUAAgVgEQgji6gOjAQgBgggCgd");
	this.shape_31.setTransform(777,322.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AjcCQQgkAbAbgnQgkAJAtgdIALAFIAEACQAZBIgbgvQgCAVgDAAQgDAAgFgVgADYhwIgQgLQgFgEAAgBIAAgCQAJgtALAjQAKgvgBAvQAcgTgWAdQAOgDACACIgBABQgCADgSAKIgJAFg");
	this.shape_32.setTransform(784.1127,328.4812);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("A3UPrQgPgDgKgEIBzAAIgPAEQgWAFgWAAQgPAAgQgCgAS+pjIgKgGQgBgBAAgBQAAAAABgBQAAAAAAgBQABAAAAgBQADgCAGgBIAOACQAHABAAADIAShJIANgEIAAABIgSBMQADADgFAFQgEADgKACIgDAAQgHAAgIgFgAUzp2QgGAAgBgFQAAgCACgDIgGhPIAAgBIAAgBIAMgEIAAAAIAAABIAGBMIAGAAQAIgCAHABQAGABAAAFQABAEgFADQgGAFgJABIgIABIgHgBgATVq4IACgBIABABIgCAAIgBAAgAUorWIAAgBIADgBIAHgCIABABIAAABIAAABIABACIgMAEgAU0rVgAREr0IgLgFQgQhmAThLIADAYIAAACQAAA8AGBggAVWuSIAAAAIgBgBIAAgEIAAgGQAxgXAVgHIAGgCQATgGAIgNIAcgcIAAACIAGAFIAQALIgSAQQgdAbgkAQQgfANgmADIAAgDg");
	this.shape_33.setTransform(653.925,415.8991);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#003366").s().p("Ag1DuIgCAAIgFAAIgHgBIgFgBQgphlgRhwIAAgBIgDgYQgLhXAEheQAUgMAVgFIADA+QANC/AkC6IgGgBgAB8DBIAAAAIAAgCIAAgBIgEgiIgDgrIADArIgGg7IADAMIgDgMQgWi9gMhMIgLhCIATAIQAwBzAGC8QgBBAgQA6gAB1BvIAAACIAAgEIAAACIAAAAgAB1BvIAAgCIAAAEIAAgCgAACjrQARgBAegCIAOAAIACAAIAAAAQADACABACQgGgDgEAAIgsADIgGAAIgDACIgwAIgABBjuIAAAAgAA/juIAAAAIACAAIgCAAg");
	this.shape_34.setTransform(775.7078,322.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#999999").s().p("Ag8DtIABAAQAQABAQAAIAAAAIAAAAIAWAAIgDACIAAgCIgKACIAAABQgWAAgUgEgAgEDuIAAgBIgBABIgWAAIAAAAIAAAAQgQAAgQgBIgBAAQgji6gNjAIgEg9IAEgGIAAgBIABAAIAfgMIAHgCIAAgBIAPgDIAwgIIADgBIAFAAIAsgDQAFgBAFAEIALBBQAMBMAWC+IAHA6IADAiIAAABIAAACIAAABIACALIgMAGIgBgCIAAgBIAAgBIAAgBIgIACIgDABIABABIAAAFIgYAKIAYgKIAAABIgYAJIAYgJIAAABIgTAIIgFABIAAgBIAAAAIgBgFIAAgBIgJAAIAAAFIgCgBIgDgDIAAgBIgBADIgDAKIAAAAIAAABIgbAHIAAgCIgIgDIgBAAIAAADIgCABIgFABIgEAAIAAAAIAAABIgEABgAgEDuIAEgBIgEABgAAUDrIAbgGIgbAGgAhsjQIABgBIgBABgAAJDtIAAgBIACgBIAAABIgCABIACgBIAAABIgCABgAgFDugAAEDtIAFgBIgDABgAALDsgAAJDsgAALDrgABaDUgABlDQIAAAAIAMgGIAAABIgMAFIAAAAIAAAAIAAABgABxDKg");
	this.shape_35.setTransform(777,322.4969);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance,p:{regX:127.7,regY:175.6,scaleX:0.5642,scaleY:0.5093,skewX:-3.0487,skewY:0.4757,x:577.7,y:247.65}}]},507).to({state:[{t:this.instance,p:{regX:128,regY:176.1,scaleX:0.5641,scaleY:0.5091,skewX:-3.0426,skewY:0.4696,x:862.35,y:267.95}},{t:this.instance_2,p:{regX:12.1,regY:-11.2,scaleX:0.0269,scaleY:0.0283,skewX:-3.1266,skewY:11.6608,x:797.2,y:188.4}},{t:this.instance_1,p:{regX:3.4,regY:-13,scaleX:0.0299,scaleY:0.0232,skewY:180,x:905.05,y:219.75}}]},53).to({state:[{t:this.instance,p:{regX:128,regY:176.2,scaleX:0.5641,scaleY:0.5091,skewX:-3.041,skewY:0.4681,x:642.6,y:292.55}},{t:this.instance_3}]},50).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_4},{t:this.instance_2,p:{regX:75.1,regY:49.6,scaleX:0.0559,scaleY:0.0595,skewX:0,skewY:0,x:700.1,y:499.45}},{t:this.instance_1,p:{regX:5.6,regY:-12.2,scaleX:0.0356,scaleY:0.0369,skewY:0,x:811.6,y:471.85}}]},47).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_4},{t:this.instance_2,p:{regX:75.1,regY:49.6,scaleX:0.0559,scaleY:0.0595,skewX:0,skewY:0,x:700.1,y:499.45}},{t:this.instance_1,p:{regX:5.6,regY:-14.9,scaleX:0.0357,scaleY:0.037,skewY:0,x:830.95,y:469.55}}]},25).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.instance_4},{t:this.instance_2,p:{regX:75.1,regY:49.6,scaleX:0.0559,scaleY:0.0595,skewX:0,skewY:0,x:700.1,y:499.45}},{t:this.instance_1,p:{regX:5.6,regY:-14.9,scaleX:0.0357,scaleY:0.037,skewY:0,x:830.95,y:469.55}}]},11).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.instance_4},{t:this.instance_2,p:{regX:75.1,regY:49.6,scaleX:0.0559,scaleY:0.0595,skewX:0,skewY:0,x:700.1,y:499.45}},{t:this.instance_1,p:{regX:5.6,regY:-14.9,scaleX:0.0357,scaleY:0.037,skewY:0,x:830.95,y:469.55}}]},12).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.instance_4},{t:this.instance_2,p:{regX:75.1,regY:49.6,scaleX:0.0559,scaleY:0.0595,skewX:0,skewY:0,x:700.1,y:499.45}},{t:this.instance_1,p:{regX:5.6,regY:-14.9,scaleX:0.0357,scaleY:0.037,skewY:0,x:830.95,y:469.55}}]},13).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.animationlirazasido = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,794,795,796];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.כפתור_התחלה_סוף.start;
		var self=this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying(e){
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		this.start = undefined;
		playSound("MarriedLife");
		createjs.Sound.registerSound("/sounds/MarriedLife.mp3","soundtrack");
		
		createjs.Sound.play("soundtrack");
	}
	this.frame_794 = function() {
		createjs.Sound.stop("soundtrack");
		
		
		var self=this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain(e){
			self.gotoAndPlay(1);
			}
	}
	this.frame_795 = function() {
		this.replay = this.כפתור_התחלה_סוף.replay;
	}
	this.frame_796 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(793).call(this.frame_794).wait(1).call(this.frame_795).wait(1).call(this.frame_796).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({scaleX:0.9909,scaleY:0.9909,x:639.5889,y:360.9111},0).wait(1).to({scaleX:0.9818,scaleY:0.9818,x:639.1778,y:361.8222},0).wait(1).to({scaleX:0.9726,scaleY:0.9726,x:638.7667,y:362.7333},0).wait(1).to({scaleX:0.9635,scaleY:0.9635,x:638.3556,y:363.6444},0).wait(1).to({scaleX:0.9544,scaleY:0.9544,x:637.9444,y:364.5556},0).wait(1).to({scaleX:0.9453,scaleY:0.9453,x:637.5333,y:365.4667},0).wait(1).to({scaleX:0.9362,scaleY:0.9362,x:637.1222,y:366.3778},0).wait(1).to({scaleX:0.9271,scaleY:0.9271,x:636.7111,y:367.2889},0).wait(1).to({scaleX:0.9179,scaleY:0.9179,x:636.3,y:368.2},0).wait(1).to({scaleX:0.9112,scaleY:0.9112,x:635.6906,y:370.4125},0).wait(1).to({scaleX:0.9044,scaleY:0.9044,x:635.0813,y:372.625},0).wait(1).to({scaleX:0.8976,scaleY:0.8976,x:634.4719,y:374.8375},0).wait(1).to({scaleX:0.8908,scaleY:0.8908,x:633.8625,y:377.05},0).wait(1).to({scaleX:0.884,scaleY:0.884,x:633.2531,y:379.2625},0).wait(1).to({scaleX:0.8772,scaleY:0.8772,x:632.6438,y:381.475},0).wait(1).to({scaleX:0.8705,scaleY:0.8705,x:632.0344,y:383.6875},0).wait(1).to({scaleX:0.8637,scaleY:0.8637,x:631.425,y:385.9},0).wait(1).to({scaleX:0.8569,scaleY:0.8569,x:630.8156,y:388.1125},0).wait(1).to({scaleX:0.8501,scaleY:0.8501,x:630.2063,y:390.325},0).wait(1).to({scaleX:0.8433,scaleY:0.8433,x:629.5969,y:392.5375},0).wait(1).to({scaleX:0.8365,scaleY:0.8365,x:628.9875,y:394.75},0).wait(1).to({scaleX:0.8298,scaleY:0.8298,x:628.3781,y:396.9625},0).wait(1).to({scaleX:0.823,scaleY:0.823,x:627.7688,y:399.175},0).wait(1).to({scaleX:0.8162,scaleY:0.8162,x:627.1594,y:401.3875},0).wait(1).to({scaleX:0.8094,scaleY:0.8094,x:626.55,y:403.6},0).wait(1).to({scaleX:0.8084,scaleY:0.8084,x:626.5306,y:403.9194},0).wait(1).to({scaleX:0.8074,scaleY:0.8074,x:626.5111,y:404.2389},0).wait(1).to({scaleX:0.8063,scaleY:0.8063,x:626.4917,y:404.5583},0).wait(1).to({scaleX:0.8053,scaleY:0.8053,x:626.4722,y:404.8778},0).wait(1).to({scaleX:0.8043,scaleY:0.8043,x:626.4528,y:405.1972},0).wait(1).to({scaleX:0.8033,scaleY:0.8033,x:626.4333,y:405.5167},0).wait(1).to({scaleX:0.8022,scaleY:0.8022,x:626.4139,y:405.8361},0).wait(1).to({scaleX:0.8012,scaleY:0.8012,x:626.3944,y:406.1556},0).wait(1).to({scaleX:0.8002,scaleY:0.8002,x:626.375,y:406.475},0).wait(1).to({scaleX:0.7992,scaleY:0.7992,x:626.3556,y:406.7944},0).wait(1).to({scaleX:0.7981,scaleY:0.7981,x:626.3361,y:407.1139},0).wait(1).to({scaleX:0.7971,scaleY:0.7971,x:626.3167,y:407.4333},0).wait(1).to({scaleX:0.7961,scaleY:0.7961,x:626.2972,y:407.7528},0).wait(1).to({scaleX:0.7951,scaleY:0.7951,x:626.2778,y:408.0722},0).wait(1).to({scaleX:0.794,scaleY:0.794,x:626.2583,y:408.3917},0).wait(1).to({scaleX:0.793,scaleY:0.793,x:626.2389,y:408.7111},0).wait(1).to({scaleX:0.792,scaleY:0.792,x:626.2194,y:409.0306},0).wait(1).to({scaleX:0.791,scaleY:0.791,x:626.2,y:409.35},0).wait(1).to({scaleX:0.9822,scaleY:0.9822,x:639.45,y:367.45},0).wait(1).to({scaleX:0.9758,scaleY:0.9758,x:639.2556,y:364.7472},0).wait(1).to({scaleX:0.9693,scaleY:0.9693,x:639.0611,y:362.0444},0).wait(1).to({scaleX:0.9629,scaleY:0.9629,x:638.8667,y:359.3417},0).wait(1).to({scaleX:0.9564,scaleY:0.9564,x:638.6722,y:356.6389},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:638.4778,y:353.9361},0).wait(1).to({scaleX:0.9435,scaleY:0.9435,x:638.2833,y:351.2333},0).wait(1).to({scaleX:0.9371,scaleY:0.9371,x:638.0889,y:348.5306},0).wait(1).to({scaleX:0.9306,scaleY:0.9306,x:637.8944,y:345.8278},0).wait(1).to({scaleX:0.9242,scaleY:0.9242,x:637.7,y:343.125},0).wait(1).to({scaleX:0.9177,scaleY:0.9177,x:637.5056,y:340.4222},0).wait(1).to({scaleX:0.9113,scaleY:0.9113,x:637.3111,y:337.7194},0).wait(1).to({scaleX:0.9048,scaleY:0.9048,x:637.1167,y:335.0167},0).wait(1).to({scaleX:0.8984,scaleY:0.8984,x:636.9222,y:332.3139},0).wait(1).to({scaleX:0.8919,scaleY:0.8919,x:636.7278,y:329.6111},0).wait(1).to({scaleX:0.8855,scaleY:0.8855,x:636.5333,y:326.9083},0).wait(1).to({scaleX:0.879,scaleY:0.879,x:636.3389,y:324.2056},0).wait(1).to({scaleX:0.8726,scaleY:0.8726,x:636.1444,y:321.5028},0).wait(1).to({scaleX:0.8661,scaleY:0.8661,x:635.95,y:318.8},0).wait(1).to({scaleX:0.8651,scaleY:0.8651,x:636.0964,y:318.5644},0).wait(1).to({scaleX:0.864,scaleY:0.864,x:636.2428,y:318.3288},0).wait(1).to({scaleX:0.863,scaleY:0.863,x:636.3892,y:318.0932},0).wait(1).to({scaleX:0.8619,scaleY:0.8619,x:636.5356,y:317.8575},0).wait(1).to({scaleX:0.8609,scaleY:0.8609,x:636.682,y:317.6219},0).wait(1).to({scaleX:0.8598,scaleY:0.8598,x:636.8284,y:317.3863},0).wait(1).to({scaleX:0.8588,scaleY:0.8588,x:636.9748,y:317.1507},0).wait(1).to({scaleX:0.8577,scaleY:0.8577,x:637.1212,y:316.9151},0).wait(1).to({scaleX:0.8567,scaleY:0.8567,x:637.2676,y:316.6795},0).wait(1).to({scaleX:0.8557,scaleY:0.8557,x:637.414,y:316.4439},0).wait(1).to({scaleX:0.8546,scaleY:0.8546,x:637.5604,y:316.2082},0).wait(1).to({scaleX:0.8536,scaleY:0.8536,x:637.7068,y:315.9726},0).wait(1).to({scaleX:0.8525,scaleY:0.8525,x:637.8531,y:315.737},0).wait(1).to({scaleX:0.8515,scaleY:0.8515,x:637.9995,y:315.5014},0).wait(1).to({scaleX:0.8504,scaleY:0.8504,x:638.1459,y:315.2658},0).wait(1).to({scaleX:0.8494,scaleY:0.8494,x:638.2923,y:315.0302},0).wait(1).to({scaleX:0.8483,scaleY:0.8483,x:638.4387,y:314.7945},0).wait(1).to({scaleX:0.8473,scaleY:0.8473,x:638.5851,y:314.5589},0).wait(1).to({scaleX:0.8463,scaleY:0.8463,x:638.7315,y:314.3233},0).wait(1).to({scaleX:0.8452,scaleY:0.8452,x:638.8779,y:314.0877},0).wait(1).to({scaleX:0.8442,scaleY:0.8442,x:639.0243,y:313.8521},0).wait(1).to({scaleX:0.8431,scaleY:0.8431,x:639.1707,y:313.6165},0).wait(1).to({scaleX:0.8421,scaleY:0.8421,x:639.3171,y:313.3809},0).wait(1).to({scaleX:0.841,scaleY:0.841,x:639.4635,y:313.1452},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:639.6099,y:312.9096},0).wait(1).to({scaleX:0.8389,scaleY:0.8389,x:639.7563,y:312.674},0).wait(1).to({scaleX:0.8379,scaleY:0.8379,x:639.9027,y:312.4384},0).wait(1).to({scaleX:0.8369,scaleY:0.8369,x:640.0491,y:312.2028},0).wait(1).to({scaleX:0.8358,scaleY:0.8358,x:640.1955,y:311.9672},0).wait(1).to({scaleX:0.8348,scaleY:0.8348,x:640.3419,y:311.7315},0).wait(1).to({scaleX:0.8337,scaleY:0.8337,x:640.4883,y:311.4959},0).wait(1).to({scaleX:0.8327,scaleY:0.8327,x:640.6347,y:311.2603},0).wait(1).to({scaleX:0.8316,scaleY:0.8316,x:640.7811,y:311.0247},0).wait(1).to({scaleX:0.8306,scaleY:0.8306,x:640.9275,y:310.7891},0).wait(1).to({scaleX:0.8295,scaleY:0.8295,x:641.0738,y:310.5535},0).wait(1).to({scaleX:0.8285,scaleY:0.8285,x:641.2202,y:310.3179},0).wait(1).to({scaleX:0.8275,scaleY:0.8275,x:641.3666,y:310.0822},0).wait(1).to({scaleX:0.8264,scaleY:0.8264,x:641.513,y:309.8466},0).wait(1).to({scaleX:0.8254,scaleY:0.8254,x:641.6594,y:309.611},0).wait(1).to({scaleX:0.8243,scaleY:0.8243,x:641.8058,y:309.3754},0).wait(1).to({scaleX:0.8233,scaleY:0.8233,x:641.9522,y:309.1398},0).wait(1).to({scaleX:0.8222,scaleY:0.8222,x:642.0986,y:308.9042},0).wait(1).to({scaleX:0.8212,scaleY:0.8212,x:642.245,y:308.6685},0).wait(1).to({scaleX:0.8201,scaleY:0.8201,x:642.3914,y:308.4329},0).wait(1).to({scaleX:0.8191,scaleY:0.8191,x:642.5378,y:308.1973},0).wait(1).to({scaleX:0.8181,scaleY:0.8181,x:642.6842,y:307.9617},0).wait(1).to({scaleX:0.817,scaleY:0.817,x:642.8306,y:307.7261},0).wait(1).to({scaleX:0.816,scaleY:0.816,x:642.977,y:307.4905},0).wait(1).to({scaleX:0.8149,scaleY:0.8149,x:643.1234,y:307.2548},0).wait(1).to({scaleX:0.8139,scaleY:0.8139,x:643.2698,y:307.0192},0).wait(1).to({scaleX:0.8128,scaleY:0.8128,x:643.4162,y:306.7836},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:643.5626,y:306.548},0).wait(1).to({scaleX:0.8107,scaleY:0.8107,x:643.709,y:306.3124},0).wait(1).to({scaleX:0.8097,scaleY:0.8097,x:643.8554,y:306.0768},0).wait(1).to({scaleX:0.8086,scaleY:0.8086,x:644.0018,y:305.8412},0).wait(1).to({scaleX:0.8076,scaleY:0.8076,x:644.1482,y:305.6055},0).wait(1).to({scaleX:0.8066,scaleY:0.8066,x:644.2946,y:305.3699},0).wait(1).to({scaleX:0.8055,scaleY:0.8055,x:644.4409,y:305.1343},0).wait(1).to({scaleX:0.8045,scaleY:0.8045,x:644.5873,y:304.8987},0).wait(1).to({scaleX:0.8034,scaleY:0.8034,x:644.7337,y:304.6631},0).wait(1).to({scaleX:0.8024,scaleY:0.8024,x:644.8801,y:304.4275},0).wait(1).to({scaleX:0.8013,scaleY:0.8013,x:645.0265,y:304.1919},0).wait(1).to({scaleX:0.8003,scaleY:0.8003,x:645.1729,y:303.9562},0).wait(1).to({scaleX:0.7992,scaleY:0.7992,x:645.3193,y:303.7206},0).wait(1).to({scaleX:0.7982,scaleY:0.7982,x:645.4657,y:303.485},0).wait(1).to({scaleX:0.7972,scaleY:0.7972,x:645.6121,y:303.2494},0).wait(1).to({scaleX:0.7961,scaleY:0.7961,x:645.7585,y:303.0138},0).wait(1).to({scaleX:0.7951,scaleY:0.7951,x:645.9049,y:302.7782},0).wait(1).to({scaleX:0.794,scaleY:0.794,x:646.0513,y:302.5426},0).wait(1).to({scaleX:0.793,scaleY:0.793,x:646.1977,y:302.3069},0).wait(1).to({scaleX:0.7919,scaleY:0.7919,x:646.3441,y:302.0713},0).wait(1).to({scaleX:0.7909,scaleY:0.7909,x:646.4905,y:301.8357},0).wait(1).to({scaleX:0.9938,scaleY:0.9938,x:636.3,y:360.3},0).wait(1).to({x:636.2828,y:360.2927},0).wait(1).to({scaleX:0.9937,scaleY:0.9937,x:636.2656,y:360.2854},0).wait(1).to({x:636.2485,y:360.2781},0).wait(1).to({scaleX:0.9936,scaleY:0.9936,x:636.2313,y:360.2708},0).wait(1).to({x:636.2141,y:360.2635},0).wait(1).to({x:636.1969,y:360.2562},0).wait(1).to({scaleX:0.9935,scaleY:0.9935,x:636.1797,y:360.2489},0).wait(1).to({x:636.1625,y:360.2416},0).wait(1).to({scaleX:0.9934,scaleY:0.9934,x:636.1454,y:360.2343},0).wait(1).to({x:636.1282,y:360.227},0).wait(1).to({x:636.111,y:360.2197},0).wait(1).to({scaleX:0.9933,scaleY:0.9933,x:636.0938,y:360.2124},0).wait(1).to({x:636.0766,y:360.2052},0).wait(1).to({x:636.0594,y:360.1979},0).wait(1).to({scaleX:0.9932,scaleY:0.9932,x:636.0423,y:360.1906},0).wait(1).to({x:636.0251,y:360.1833},0).wait(1).to({scaleX:0.9931,scaleY:0.9931,x:636.0079,y:360.176},0).wait(1).to({x:635.9907,y:360.1687},0).wait(1).to({x:635.9735,y:360.1614},0).wait(1).to({scaleX:0.993,scaleY:0.993,x:635.9563,y:360.1541},0).wait(1).to({x:635.9392,y:360.1468},0).wait(1).to({scaleX:0.9929,scaleY:0.9929,x:635.922,y:360.1395},0).wait(1).to({x:635.9048,y:360.1322},0).wait(1).to({x:635.8876,y:360.1249},0).wait(1).to({scaleX:0.9928,scaleY:0.9928,x:635.8704,y:360.1176},0).wait(1).to({x:635.8533,y:360.1103},0).wait(1).to({x:635.8361,y:360.103},0).wait(1).to({scaleX:0.9927,scaleY:0.9927,x:635.8189,y:360.0957},0).wait(1).to({x:635.8017,y:360.0884},0).wait(1).to({scaleX:0.9926,scaleY:0.9926,x:635.7845,y:360.0811},0).wait(1).to({x:635.7673,y:360.0738},0).wait(1).to({x:635.7502,y:360.0665},0).wait(1).to({scaleX:0.9925,scaleY:0.9925,x:635.733,y:360.0592},0).wait(1).to({x:635.7158,y:360.0519},0).wait(1).to({scaleX:0.9924,scaleY:0.9924,x:635.6986,y:360.0446},0).wait(1).to({x:635.6814,y:360.0373},0).wait(1).to({x:635.6642,y:360.03},0).wait(1).to({scaleX:0.9923,scaleY:0.9923,x:635.6471,y:360.0227},0).wait(1).to({x:635.6299,y:360.0155},0).wait(1).to({x:635.6127,y:360.0082},0).wait(1).to({scaleX:0.9922,scaleY:0.9922,x:635.5955,y:360.0009},0).wait(1).to({x:635.5783,y:359.9936},0).wait(1).to({scaleX:0.9921,scaleY:0.9921,x:635.5611,y:359.9863},0).wait(1).to({x:635.544,y:359.979},0).wait(1).to({x:635.5268,y:359.9717},0).wait(1).to({scaleX:0.992,scaleY:0.992,x:635.5096,y:359.9644},0).wait(1).to({x:635.4924,y:359.9571},0).wait(1).to({scaleX:0.9919,scaleY:0.9919,x:635.4752,y:359.9498},0).wait(1).to({x:635.458,y:359.9425},0).wait(1).to({x:635.4409,y:359.9352},0).wait(1).to({scaleX:0.9918,scaleY:0.9918,x:635.4237,y:359.9279},0).wait(1).to({x:635.4065,y:359.9206},0).wait(1).to({x:635.3893,y:359.9133},0).wait(1).to({scaleX:0.9917,scaleY:0.9917,x:635.3721,y:359.906},0).wait(1).to({x:635.3549,y:359.8987},0).wait(1).to({scaleX:0.9916,scaleY:0.9916,x:635.3378,y:359.8914},0).wait(1).to({x:635.3206,y:359.8841},0).wait(1).to({scaleX:0.1261,scaleY:0.1261,x:742.65,y:221.1},0).wait(1).to({scaleX:0.1377,scaleY:0.1377,x:741.2757,y:222.9165},0).wait(1).to({scaleX:0.1492,scaleY:0.1492,x:739.9013,y:224.7329},0).wait(1).to({scaleX:0.1608,scaleY:0.1608,x:738.527,y:226.5493},0).wait(1).to({scaleX:0.1723,scaleY:0.1723,x:737.1526,y:228.3658},0).wait(1).to({scaleX:0.1838,scaleY:0.1838,x:735.7783,y:230.1822},0).wait(1).to({scaleX:0.1954,scaleY:0.1954,x:734.404,y:231.9987},0).wait(1).to({scaleX:0.2069,scaleY:0.2069,x:733.0296,y:233.8151},0).wait(1).to({scaleX:0.2185,scaleY:0.2185,x:731.6553,y:235.6316},0).wait(1).to({scaleX:0.23,scaleY:0.23,x:730.2809,y:237.448},0).wait(1).to({scaleX:0.2415,scaleY:0.2415,x:728.9066,y:239.2645},0).wait(1).to({scaleX:0.2531,scaleY:0.2531,x:727.5322,y:241.0809},0).wait(1).to({scaleX:0.2646,scaleY:0.2646,x:726.1579,y:242.8974},0).wait(1).to({scaleX:0.2762,scaleY:0.2762,x:724.7836,y:244.7138},0).wait(1).to({scaleX:0.2877,scaleY:0.2877,x:723.4092,y:246.5303},0).wait(1).to({scaleX:0.2992,scaleY:0.2992,x:722.0349,y:248.3467},0).wait(1).to({scaleX:0.3108,scaleY:0.3108,x:720.6605,y:250.1632},0).wait(1).to({scaleX:0.3223,scaleY:0.3223,x:719.2862,y:251.9796},0).wait(1).to({scaleX:0.3339,scaleY:0.3339,x:717.9118,y:253.7961},0).wait(1).to({scaleX:0.3454,scaleY:0.3454,x:716.5375,y:255.6125},0).wait(1).to({scaleX:0.3569,scaleY:0.3569,x:715.1632,y:257.429},0).wait(1).to({scaleX:0.3685,scaleY:0.3685,x:713.7888,y:259.2454},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:712.4145,y:261.0618},0).wait(1).to({scaleX:0.3916,scaleY:0.3916,x:711.0401,y:262.8783},0).wait(1).to({scaleX:0.4031,scaleY:0.4031,x:709.6658,y:264.6947},0).wait(1).to({scaleX:0.4146,scaleY:0.4146,x:708.2915,y:266.5112},0).wait(1).to({scaleX:0.4262,scaleY:0.4262,x:706.9171,y:268.3276},0).wait(1).to({scaleX:0.4377,scaleY:0.4377,x:705.5428,y:270.1441},0).wait(1).to({scaleX:0.4493,scaleY:0.4493,x:704.1684,y:271.9605},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,x:702.7941,y:273.777},0).wait(1).to({scaleX:0.4724,scaleY:0.4724,x:701.4197,y:275.5934},0).wait(1).to({scaleX:0.4839,scaleY:0.4839,x:700.0454,y:277.4099},0).wait(1).to({scaleX:0.4954,scaleY:0.4954,x:698.6711,y:279.2263},0).wait(1).to({scaleX:0.507,scaleY:0.507,x:697.2967,y:281.0428},0).wait(1).to({scaleX:0.5185,scaleY:0.5185,x:695.9224,y:282.8592},0).wait(1).to({scaleX:0.5301,scaleY:0.5301,x:694.548,y:284.6757},0).wait(1).to({scaleX:0.5416,scaleY:0.5416,x:693.1737,y:286.4921},0).wait(1).to({scaleX:0.5531,scaleY:0.5531,x:691.7993,y:288.3086},0).wait(1).to({scaleX:0.5647,scaleY:0.5647,x:690.425,y:290.125},0).wait(1).to({scaleX:0.5762,scaleY:0.5762,x:689.0507,y:291.9414},0).wait(1).to({scaleX:0.5878,scaleY:0.5878,x:687.6763,y:293.7579},0).wait(1).to({scaleX:0.5993,scaleY:0.5993,x:686.302,y:295.5743},0).wait(1).to({scaleX:0.6108,scaleY:0.6108,x:684.9276,y:297.3908},0).wait(1).to({scaleX:0.6224,scaleY:0.6224,x:683.5533,y:299.2072},0).wait(1).to({scaleX:0.6339,scaleY:0.6339,x:682.179,y:301.0237},0).wait(1).to({scaleX:0.6455,scaleY:0.6455,x:680.8046,y:302.8401},0).wait(1).to({scaleX:0.657,scaleY:0.657,x:679.4303,y:304.6566},0).wait(1).to({scaleX:0.6685,scaleY:0.6685,x:678.0559,y:306.473},0).wait(1).to({scaleX:0.6801,scaleY:0.6801,x:676.6816,y:308.2895},0).wait(1).to({scaleX:0.6916,scaleY:0.6916,x:675.3072,y:310.1059},0).wait(1).to({scaleX:0.7032,scaleY:0.7032,x:673.9329,y:311.9224},0).wait(1).to({scaleX:0.7147,scaleY:0.7147,x:672.5586,y:313.7388},0).wait(1).to({scaleX:0.7263,scaleY:0.7263,x:671.1842,y:315.5553},0).wait(1).to({scaleX:0.7378,scaleY:0.7378,x:669.8099,y:317.3717},0).wait(1).to({scaleX:0.7493,scaleY:0.7493,x:668.4355,y:319.1882},0).wait(1).to({scaleX:0.7609,scaleY:0.7609,x:667.0612,y:321.0046},0).wait(1).to({scaleX:0.7724,scaleY:0.7724,x:665.6868,y:322.8211},0).wait(1).to({scaleX:0.784,scaleY:0.784,x:664.3125,y:324.6375},0).wait(1).to({scaleX:0.7955,scaleY:0.7955,x:662.9382,y:326.454},0).wait(1).to({scaleX:0.807,scaleY:0.807,x:661.5638,y:328.2704},0).wait(1).to({scaleX:0.8186,scaleY:0.8186,x:660.1895,y:330.0868},0).wait(1).to({scaleX:0.8301,scaleY:0.8301,x:658.8151,y:331.9033},0).wait(1).to({scaleX:0.8417,scaleY:0.8417,x:657.4408,y:333.7197},0).wait(1).to({scaleX:0.8532,scaleY:0.8532,x:656.0665,y:335.5362},0).wait(1).to({scaleX:0.8647,scaleY:0.8647,x:654.6921,y:337.3526},0).wait(1).to({scaleX:0.8763,scaleY:0.8763,x:653.3178,y:339.1691},0).wait(1).to({scaleX:0.8878,scaleY:0.8878,x:651.9434,y:340.9855},0).wait(1).to({scaleX:0.8994,scaleY:0.8994,x:650.5691,y:342.802},0).wait(1).to({scaleX:0.9109,scaleY:0.9109,x:649.1947,y:344.6184},0).wait(1).to({scaleX:0.9224,scaleY:0.9224,x:647.8204,y:346.4349},0).wait(1).to({scaleX:0.934,scaleY:0.934,x:646.4461,y:348.2513},0).wait(1).to({scaleX:0.9455,scaleY:0.9455,x:645.0717,y:350.0678},0).wait(1).to({scaleX:0.9571,scaleY:0.9571,x:643.6974,y:351.8842},0).wait(1).to({scaleX:0.9686,scaleY:0.9686,x:642.323,y:353.7007},0).wait(1).to({scaleX:0.9801,scaleY:0.9801,x:640.9487,y:355.5171},0).wait(1).to({scaleX:0.9917,scaleY:0.9917,x:639.5743,y:357.3336},0).wait(1).to({scaleX:1.0032,scaleY:1.0032,x:638.2,y:359.15},0).wait(1).to({scaleX:0.997,scaleY:0.997,x:642.0513,y:358.927},0).wait(1).to({scaleX:0.9908,scaleY:0.9908,x:645.9026,y:358.704},0).wait(1).to({scaleX:0.9846,scaleY:0.9846,x:649.754,y:358.4809},0).wait(1).to({scaleX:0.9784,scaleY:0.9784,x:653.6053,y:358.2579},0).wait(1).to({scaleX:0.9722,scaleY:0.9722,x:657.4566,y:358.0349},0).wait(1).to({scaleX:0.9659,scaleY:0.9659,x:661.3079,y:357.8118},0).wait(1).to({scaleX:0.9597,scaleY:0.9597,x:665.1592,y:357.5888},0).wait(1).to({scaleX:0.9535,scaleY:0.9535,x:669.0105,y:357.3658},0).wait(1).to({scaleX:0.9473,scaleY:0.9473,x:672.8618,y:357.1428},0).wait(1).to({scaleX:0.9411,scaleY:0.9411,x:676.7132,y:356.9197},0).wait(1).to({scaleX:0.9349,scaleY:0.9349,x:680.5645,y:356.6967},0).wait(1).to({scaleX:0.9287,scaleY:0.9287,x:684.4158,y:356.4737},0).wait(1).to({scaleX:0.9224,scaleY:0.9224,x:688.2671,y:356.2507},0).wait(1).to({scaleX:0.9162,scaleY:0.9162,x:692.1184,y:356.0276},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:695.9697,y:355.8046},0).wait(1).to({scaleX:0.9038,scaleY:0.9038,x:699.8211,y:355.5816},0).wait(1).to({scaleX:0.8976,scaleY:0.8976,x:703.6724,y:355.3586},0).wait(1).to({scaleX:0.8914,scaleY:0.8914,x:707.5237,y:355.1355},0).wait(1).to({scaleX:0.8852,scaleY:0.8852,x:711.375,y:354.9125},0).wait(1).to({scaleX:0.8789,scaleY:0.8789,x:715.2263,y:354.6895},0).wait(1).to({scaleX:0.8727,scaleY:0.8727,x:719.0776,y:354.4665},0).wait(1).to({scaleX:0.8665,scaleY:0.8665,x:722.929,y:354.2434},0).wait(1).to({scaleX:0.8603,scaleY:0.8603,x:726.7803,y:354.0204},0).wait(1).to({scaleX:0.8541,scaleY:0.8541,x:730.6316,y:353.7974},0).wait(1).to({scaleX:0.8479,scaleY:0.8479,x:734.4829,y:353.5743},0).wait(1).to({scaleX:0.8417,scaleY:0.8417,x:738.3342,y:353.3513},0).wait(1).to({scaleX:0.8354,scaleY:0.8354,x:742.1855,y:353.1283},0).wait(1).to({scaleX:0.8292,scaleY:0.8292,x:746.0368,y:352.9053},0).wait(1).to({scaleX:0.823,scaleY:0.823,x:749.8882,y:352.6822},0).wait(1).to({scaleX:0.8168,scaleY:0.8168,x:753.7395,y:352.4592},0).wait(1).to({scaleX:0.8106,scaleY:0.8106,x:757.5908,y:352.2362},0).wait(1).to({scaleX:0.8044,scaleY:0.8044,x:761.4421,y:352.0132},0).wait(1).to({scaleX:0.7982,scaleY:0.7982,x:765.2934,y:351.7901},0).wait(1).to({scaleX:0.7919,scaleY:0.7919,x:769.1447,y:351.5671},0).wait(1).to({scaleX:0.7857,scaleY:0.7857,x:772.9961,y:351.3441},0).wait(1).to({scaleX:0.7795,scaleY:0.7795,x:776.8474,y:351.1211},0).wait(1).to({scaleX:0.7733,scaleY:0.7733,x:780.6987,y:350.898},0).wait(1).to({scaleX:0.7671,scaleY:0.7671,x:784.55,y:350.675},0).wait(1).to({scaleX:0.7609,scaleY:0.7609,x:788.4013,y:350.452},0).wait(1).to({scaleX:0.7547,scaleY:0.7547,x:792.2526,y:350.229},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:796.104,y:350.0059},0).wait(1).to({scaleX:0.7422,scaleY:0.7422,x:799.9553,y:349.7829},0).wait(1).to({scaleX:0.736,scaleY:0.736,x:803.8066,y:349.5599},0).wait(1).to({scaleX:0.7298,scaleY:0.7298,x:807.6579,y:349.3368},0).wait(1).to({scaleX:0.7236,scaleY:0.7236,x:811.5092,y:349.1138},0).wait(1).to({scaleX:0.7174,scaleY:0.7174,x:815.3605,y:348.8908},0).wait(1).to({scaleX:0.7111,scaleY:0.7111,x:819.2118,y:348.6678},0).wait(1).to({scaleX:0.7049,scaleY:0.7049,x:823.0632,y:348.4447},0).wait(1).to({scaleX:0.6987,scaleY:0.6987,x:826.9145,y:348.2217},0).wait(1).to({scaleX:0.6925,scaleY:0.6925,x:830.7658,y:347.9987},0).wait(1).to({scaleX:0.6863,scaleY:0.6863,x:834.6171,y:347.7757},0).wait(1).to({scaleX:0.6801,scaleY:0.6801,x:838.4684,y:347.5526},0).wait(1).to({scaleX:0.6739,scaleY:0.6739,x:842.3197,y:347.3296},0).wait(1).to({scaleX:0.6676,scaleY:0.6676,x:846.1711,y:347.1066},0).wait(1).to({scaleX:0.6614,scaleY:0.6614,x:850.0224,y:346.8836},0).wait(1).to({scaleX:0.6552,scaleY:0.6552,x:853.8737,y:346.6605},0).wait(1).to({scaleX:0.649,scaleY:0.649,x:857.725,y:346.4375},0).wait(1).to({scaleX:0.6428,scaleY:0.6428,x:861.5763,y:346.2145},0).wait(1).to({scaleX:0.6366,scaleY:0.6366,x:865.4276,y:345.9915},0).wait(1).to({scaleX:0.6304,scaleY:0.6304,x:869.279,y:345.7684},0).wait(1).to({scaleX:0.6241,scaleY:0.6241,x:873.1303,y:345.5454},0).wait(1).to({scaleX:0.6179,scaleY:0.6179,x:876.9816,y:345.3224},0).wait(1).to({scaleX:0.6117,scaleY:0.6117,x:880.8329,y:345.0993},0).wait(1).to({scaleX:0.6055,scaleY:0.6055,x:884.6842,y:344.8763},0).wait(1).to({scaleX:0.5993,scaleY:0.5993,x:888.5355,y:344.6533},0).wait(1).to({scaleX:0.5931,scaleY:0.5931,x:892.3868,y:344.4303},0).wait(1).to({scaleX:0.5869,scaleY:0.5869,x:896.2382,y:344.2072},0).wait(1).to({scaleX:0.5806,scaleY:0.5806,x:900.0895,y:343.9842},0).wait(1).to({scaleX:0.5744,scaleY:0.5744,x:903.9408,y:343.7612},0).wait(1).to({scaleX:0.5682,scaleY:0.5682,x:907.7921,y:343.5382},0).wait(1).to({scaleX:0.562,scaleY:0.562,x:911.6434,y:343.3151},0).wait(1).to({scaleX:0.5558,scaleY:0.5558,x:915.4947,y:343.0921},0).wait(1).to({scaleX:0.5496,scaleY:0.5496,x:919.3461,y:342.8691},0).wait(1).to({scaleX:0.5434,scaleY:0.5434,x:923.1974,y:342.6461},0).wait(1).to({scaleX:0.5371,scaleY:0.5371,x:927.0487,y:342.423},0).wait(1).to({scaleX:0.5309,scaleY:0.5309,x:930.9,y:342.2},0).wait(1).to({scaleX:0.6019,scaleY:0.6019,x:886.4},0).wait(104).to({regX:0.3,regY:0.6,scaleX:0.1756,scaleY:0.1756,x:1157.95,y:369.45},0).wait(1).to({regX:0,regY:0,scaleX:0.1785,scaleY:0.1785,x:1154.1625,y:368.3613},0).wait(1).to({scaleX:0.1813,scaleY:0.1813,x:1150.4249,y:367.3727},0).wait(1).to({scaleX:0.1842,scaleY:0.1842,x:1146.6874,y:366.384},0).wait(1).to({scaleX:0.187,scaleY:0.187,x:1142.9498,y:365.3953},0).wait(1).to({scaleX:0.1899,scaleY:0.1899,x:1139.2123,y:364.4067},0).wait(1).to({scaleX:0.1927,scaleY:0.1927,x:1135.4747,y:363.418},0).wait(1).to({scaleX:0.1956,scaleY:0.1956,x:1131.7372,y:362.4293},0).wait(1).to({scaleX:0.1984,scaleY:0.1984,x:1127.9996,y:361.4407},0).wait(1).to({scaleX:0.2013,scaleY:0.2013,x:1124.2621,y:360.452},0).wait(1).to({scaleX:0.2041,scaleY:0.2041,x:1120.5245,y:359.4634},0).wait(1).to({scaleX:0.207,scaleY:0.207,x:1116.787,y:358.4747},0).wait(1).to({scaleX:0.2098,scaleY:0.2098,x:1113.0495,y:357.486},0).wait(1).to({scaleX:0.2127,scaleY:0.2127,x:1109.3119,y:356.4974},0).wait(1).to({scaleX:0.2155,scaleY:0.2155,x:1105.5744,y:355.5087},0).wait(1).to({scaleX:0.2184,scaleY:0.2184,x:1101.8368,y:354.52},0).wait(1).to({scaleX:0.2212,scaleY:0.2212,x:1098.0993,y:353.5314},0).wait(1).to({scaleX:0.2241,scaleY:0.2241,x:1094.3617,y:352.5427},0).wait(1).to({scaleX:0.2269,scaleY:0.2269,x:1090.6242,y:351.554},0).wait(1).to({scaleX:0.2298,scaleY:0.2298,x:1086.8866,y:350.5654},0).wait(1).to({scaleX:0.2326,scaleY:0.2326,x:1083.1491,y:349.5767},0).wait(1).to({scaleX:0.2355,scaleY:0.2355,x:1079.4116,y:348.588},0).wait(1).to({scaleX:0.2383,scaleY:0.2383,x:1075.674,y:347.5994},0).wait(1).to({scaleX:0.2412,scaleY:0.2412,x:1071.9365,y:346.6107},0).wait(1).to({scaleX:0.244,scaleY:0.244,x:1068.1989,y:345.6221},0).wait(1).to({scaleX:0.2469,scaleY:0.2469,x:1064.4614,y:344.6334},0).wait(1).to({scaleX:0.2497,scaleY:0.2497,x:1060.7238,y:343.6447},0).wait(1).to({scaleX:0.2526,scaleY:0.2526,x:1056.9863,y:342.6561},0).wait(1).to({scaleX:0.2554,scaleY:0.2554,x:1053.2487,y:341.6674},0).wait(1).to({scaleX:0.2583,scaleY:0.2583,x:1049.5112,y:340.6787},0).wait(1).to({regX:0.2,regY:0.4,scaleX:0.2646,scaleY:0.2646,x:1041.25,y:338.65},0).wait(1).to({regX:0,regY:0,scaleX:0.2664,scaleY:0.2664,x:1035.2564,y:336.9781},0).wait(1).to({scaleX:0.2681,scaleY:0.2681,x:1029.3128,y:335.4061},0).wait(1).to({scaleX:0.2699,scaleY:0.2699,x:1023.3693,y:333.8342},0).wait(1).to({scaleX:0.2716,scaleY:0.2716,x:1017.4257,y:332.2623},0).wait(1).to({scaleX:0.2734,scaleY:0.2734,x:1011.4821,y:330.6904},0).wait(1).to({scaleX:0.2751,scaleY:0.2751,x:1005.5385,y:329.1184},0).wait(1).to({scaleX:0.2769,scaleY:0.2769,x:999.595,y:327.5465},0).wait(1).to({scaleX:0.2786,scaleY:0.2786,x:993.6514,y:325.9746},0).wait(1).to({scaleX:0.2803,scaleY:0.2803,x:987.7078,y:324.4027},0).wait(1).to({scaleX:0.2821,scaleY:0.2821,x:981.7642,y:322.8307},0).wait(1).to({scaleX:0.2838,scaleY:0.2838,x:975.8206,y:321.2588},0).wait(1).to({scaleX:0.2856,scaleY:0.2856,x:969.8771,y:319.6869},0).wait(1).to({scaleX:0.2873,scaleY:0.2873,x:963.9335,y:318.1149},0).wait(1).to({scaleX:0.2891,scaleY:0.2891,x:957.9899,y:316.543},0).wait(1).to({scaleX:0.2908,scaleY:0.2908,x:952.0463,y:314.9711},0).wait(1).to({scaleX:0.2926,scaleY:0.2926,x:946.1027,y:313.3992},0).wait(1).to({scaleX:0.2943,scaleY:0.2943,x:940.1592,y:311.8272},0).wait(1).to({scaleX:0.2961,scaleY:0.2961,x:934.2156,y:310.2553},0).wait(1).to({scaleX:0.2978,scaleY:0.2978,x:928.272,y:308.6834},0).wait(1).to({scaleX:0.2996,scaleY:0.2996,x:922.3284,y:307.1114},0).wait(1).to({scaleX:0.3013,scaleY:0.3013,x:916.3849,y:305.5395},0).wait(1).to({scaleX:0.3031,scaleY:0.3031,x:910.4413,y:303.9676},0).wait(1).to({scaleX:0.3048,scaleY:0.3048,x:904.4977,y:302.3957},0).wait(1).to({scaleX:0.3066,scaleY:0.3066,x:898.5541,y:300.8237},0).wait(1).to({scaleX:0.3083,scaleY:0.3083,x:892.6105,y:299.2518},0).wait(1).to({scaleX:0.3101,scaleY:0.3101,x:886.667,y:297.6799},0).wait(1).to({scaleX:0.3118,scaleY:0.3118,x:880.7234,y:296.108},0).wait(1).to({scaleX:0.3136,scaleY:0.3136,x:874.7798,y:294.536},0).wait(1).to({scaleX:0.3153,scaleY:0.3153,x:868.8362,y:292.9641},0).wait(1).to({scaleX:0.3171,scaleY:0.3171,x:862.8927,y:291.3922},0).wait(1).to({scaleX:0.3188,scaleY:0.3188,x:856.9491,y:289.8202},0).wait(1).to({scaleX:0.3205,scaleY:0.3205,x:851.0055,y:288.2483},0).wait(1).to({scaleX:0.3223,scaleY:0.3223,x:845.0619,y:286.6764},0).wait(1).to({scaleX:0.324,scaleY:0.324,x:839.1183,y:285.1045},0).wait(1).to({scaleX:0.3258,scaleY:0.3258,x:833.1748,y:283.5325},0).wait(1).to({scaleX:0.3255,scaleY:0.3255,x:826.65,y:281.4},0).wait(1).to({scaleX:0.3253,scaleY:0.3253,x:820.0533,y:279.1274},0).wait(1).to({scaleX:0.325,scaleY:0.325,x:813.4567,y:276.8548},0).wait(1).to({scaleX:0.3247,scaleY:0.3247,x:806.86,y:274.5822},0).wait(1).to({scaleX:0.3244,scaleY:0.3244,x:800.2633,y:272.3096},0).wait(1).to({scaleX:0.3242,scaleY:0.3242,x:793.6667,y:270.0371},0).wait(1).to({scaleX:0.3239,scaleY:0.3239,x:787.07,y:267.7645},0).wait(1).to({scaleX:0.3236,scaleY:0.3236,x:780.4733,y:265.4919},0).wait(1).to({scaleX:0.3234,scaleY:0.3234,x:773.8767,y:263.2193},0).wait(1).to({scaleX:0.3231,scaleY:0.3231,x:767.28,y:260.9467},0).wait(1).to({scaleX:0.3228,scaleY:0.3228,x:760.6833,y:258.6741},0).wait(1).to({scaleX:0.3226,scaleY:0.3226,x:754.0867,y:256.4015},0).wait(1).to({scaleX:0.3223,scaleY:0.3223,x:747.49,y:254.1289},0).wait(1).to({scaleX:0.322,scaleY:0.322,x:740.8933,y:251.8563},0).wait(1).to({scaleX:0.3218,scaleY:0.3218,x:734.2967,y:249.5838},0).wait(1).to({scaleX:0.3215,scaleY:0.3215,x:727.7,y:247.3112},0).wait(1).to({scaleX:0.3212,scaleY:0.3212,x:721.1033,y:245.0386},0).wait(1).to({scaleX:0.321,scaleY:0.321,x:714.5067,y:242.766},0).wait(1).to({scaleX:0.3207,scaleY:0.3207,x:707.91,y:240.4934},0).wait(1).to({scaleX:0.3146,scaleY:0.3146,x:704.024,y:239.3694},0).wait(1).to({scaleX:0.3085,scaleY:0.3085,x:700.138,y:238.2454},0).wait(1).to({scaleX:0.3024,scaleY:0.3024,x:696.252,y:237.1214},0).wait(1).to({scaleX:0.2963,scaleY:0.2963,x:692.366,y:235.9974},0).wait(1).to({scaleX:0.2902,scaleY:0.2902,x:688.48,y:234.8734},0).wait(1).to({scaleX:0.2841,scaleY:0.2841,x:684.594,y:233.7494},0).wait(1).to({scaleX:0.278,scaleY:0.278,x:680.708,y:232.6255},0).wait(1).to({scaleX:0.2719,scaleY:0.2719,x:676.822,y:231.5015},0).wait(1).to({scaleX:0.2658,scaleY:0.2658,x:672.936,y:230.3775},0).wait(1).to({scaleX:0.2597,scaleY:0.2597,x:669.05,y:229.2535},0).wait(1).to({scaleX:0.2536,scaleY:0.2536,x:665.164,y:228.1295},0).wait(1).to({scaleX:0.2475,scaleY:0.2475,x:661.278,y:227.0055},0).wait(1).to({scaleX:0.2414,scaleY:0.2414,x:657.392,y:225.8815},0).wait(1).to({scaleX:0.2353,scaleY:0.2353,x:653.506,y:224.7575},0).wait(1).to({scaleX:0.2292,scaleY:0.2292,x:649.62,y:223.6335},0).wait(1).to({scaleX:0.2231,scaleY:0.2231,x:645.734,y:222.5095},0).wait(1).to({scaleX:0.217,scaleY:0.217,x:641.848,y:221.3855},0).wait(1).to({scaleX:0.2109,scaleY:0.2109,x:637.962,y:220.2615},0).wait(1).to({scaleX:0.2048,scaleY:0.2048,x:634.076,y:219.1376},0).wait(1).to({scaleX:0.1987,scaleY:0.1987,x:630.19,y:218.0136},0).wait(1).to({scaleX:0.1926,scaleY:0.1926,x:626.304,y:216.8896},0).wait(1).to({scaleX:0.1866,scaleY:0.1866,x:622.418,y:215.7656},0).wait(1).to({scaleX:0.1805,scaleY:0.1805,x:618.532,y:214.6416},0).wait(1).to({scaleX:0.1744,scaleY:0.1744,x:614.646,y:213.5176},0).wait(1).to({scaleX:0.1683,scaleY:0.1683,x:610.76,y:212.3936},0).wait(1).to({regY:0.7,scaleX:0.1598,scaleY:0.1598,x:855.9,y:233.4},0).wait(1).to({regY:0,y:233.3},0).wait(49).to({regX:0.3,regY:0.8,scaleX:0.3641,scaleY:0.3641,x:785.6,y:322.9},0).wait(1).to({regX:0,regY:0,scaleX:0.3642,scaleY:0.3642,x:785.5,y:322.6},0).wait(46).to({regX:0.4,regY:0.8,scaleX:0.599,scaleY:0.599,x:888.3,y:341.15},0).wait(1).to({regX:0,regY:0,scaleX:0.5936,scaleY:0.5936,x:888.0175,y:340.3238},0).wait(1).to({scaleX:0.5883,scaleY:0.5883,x:887.985,y:339.9976},0).wait(1).to({scaleX:0.583,scaleY:0.583,x:887.9525,y:339.6714},0).wait(1).to({scaleX:0.5776,scaleY:0.5776,x:887.92,y:339.3453},0).wait(1).to({scaleX:0.5723,scaleY:0.5723,x:887.8875,y:339.0191},0).wait(1).to({scaleX:0.567,scaleY:0.567,x:887.855,y:338.6929},0).wait(1).to({scaleX:0.5616,scaleY:0.5616,x:887.8226,y:338.3667},0).wait(1).to({scaleX:0.5563,scaleY:0.5563,x:887.7901,y:338.0405},0).wait(1).to({scaleX:0.551,scaleY:0.551,x:887.7576,y:337.7143},0).wait(1).to({scaleX:0.5456,scaleY:0.5456,x:887.7251,y:337.3882},0).wait(1).to({scaleX:0.5403,scaleY:0.5403,x:887.6926,y:337.062},0).wait(1).to({scaleX:0.535,scaleY:0.535,x:887.6601,y:336.7358},0).wait(1).to({scaleX:0.5296,scaleY:0.5296,x:887.6276,y:336.4096},0).wait(1).to({scaleX:0.5243,scaleY:0.5243,x:887.5951,y:336.0834},0).wait(1).to({regX:0.5,regY:0.8,scaleX:0.5231,scaleY:0.5231,x:886.8,y:336.2},0).wait(1).to({regX:0,regY:0,scaleX:0.5162,scaleY:0.5162,x:888.4448,y:335.154},0).wait(1).to({scaleX:0.5093,scaleY:0.5093,x:890.3396,y:334.508},0).wait(1).to({scaleX:0.5024,scaleY:0.5024,x:892.2344,y:333.862},0).wait(1).to({scaleX:0.4955,scaleY:0.4955,x:894.1292,y:333.216},0).wait(1).to({scaleX:0.4886,scaleY:0.4886,x:896.024,y:332.5699},0).wait(1).to({scaleX:0.4817,scaleY:0.4817,x:897.9188,y:331.9239},0).wait(1).to({scaleX:0.4748,scaleY:0.4748,x:899.8136,y:331.2779},0).wait(1).to({scaleX:0.4679,scaleY:0.4679,x:901.7084,y:330.6319},0).wait(1).to({scaleX:0.461,scaleY:0.461,x:903.6033,y:329.9859},0).wait(1).to({regX:0.5,regY:0.5,scaleX:0.4541,scaleY:0.4541,x:905.75,y:329.75},0).wait(1).to({regX:0,regY:0,scaleX:0.45,scaleY:0.45,x:906.6367,y:329.1111},0).wait(1).to({scaleX:0.4458,scaleY:0.4458,x:907.7734,y:328.7223},0).wait(1).to({scaleX:0.4417,scaleY:0.4417,x:908.91,y:328.3335},0).wait(1).to({scaleX:0.4375,scaleY:0.4375,x:910.0467,y:327.9446},0).wait(1).to({scaleX:0.4334,scaleY:0.4334,x:911.1834,y:327.5558},0).wait(1).to({scaleX:0.4292,scaleY:0.4292,x:912.3201,y:327.1669},0).wait(1).to({scaleX:0.4251,scaleY:0.4251,x:913.4568,y:326.7781},0).wait(1).to({scaleX:0.421,scaleY:0.421,x:914.5934,y:326.3892},0).wait(1).to({scaleX:0.4168,scaleY:0.4168,x:915.7301,y:326.0004},0).wait(1).to({scaleX:0.4127,scaleY:0.4127,x:916.8668,y:325.6115},0).wait(1).to({scaleX:0.4085,scaleY:0.4085,x:918.0035,y:325.2227},0).wait(1).to({scaleX:0.4044,scaleY:0.4044,x:919.1402,y:324.8338},0).wait(1).to({scaleX:0.4003,scaleY:0.4003,x:920.2768,y:324.445},0).wait(1).to({scaleX:0.3961,scaleY:0.3961,x:921.4135,y:324.0561},0).wait(1).to({scaleX:0.392,scaleY:0.392,x:922.5502,y:323.6673},0).wait(1).to({scaleX:0.3878,scaleY:0.3878,x:923.6869,y:323.2784},0).wait(1).to({scaleX:0.3837,scaleY:0.3837,x:924.8236,y:322.8896},0).wait(1).to({scaleX:0.3796,scaleY:0.3796,x:925.9602,y:322.5007},0).wait(1).to({scaleX:0.3754,scaleY:0.3754,x:927.0969,y:322.1119},0).wait(1).to({scaleX:0.3713,scaleY:0.3713,x:928.2336,y:321.723},0).wait(1).to({scaleX:0.3671,scaleY:0.3671,x:929.3703,y:321.3342},0).wait(1).to({scaleX:0.363,scaleY:0.363,x:930.507,y:320.9453},0).wait(1).to({scaleX:0.3589,scaleY:0.3589,x:931.6436,y:320.5565},0).wait(1).to({scaleX:0.3547,scaleY:0.3547,x:932.7803,y:320.1676},0).wait(1).to({scaleX:0.3506,scaleY:0.3506,x:933.917,y:319.7788},0).wait(1).to({scaleX:0.3464,scaleY:0.3464,x:935.0537,y:319.3899},0).wait(1).to({scaleX:0.3423,scaleY:0.3423,x:936.1904,y:319.0011},0).wait(1).to({scaleX:0.3382,scaleY:0.3382,x:937.327,y:318.6122},0).wait(1).to({scaleX:0.334,scaleY:0.334,x:938.4637,y:318.2234},0).wait(1).to({scaleX:0.3299,scaleY:0.3299,x:939.6004,y:317.8346},0).wait(1).to({scaleX:0.3257,scaleY:0.3257,x:940.7371,y:317.4457},0).wait(1).to({scaleX:0.3216,scaleY:0.3216,x:941.8738,y:317.0569},0).wait(1).to({scaleX:0.3175,scaleY:0.3175,x:943.0105,y:316.668},0).wait(1).to({scaleX:0.3133,scaleY:0.3133,x:944.1471,y:316.2792},0).wait(1).to({scaleX:0.3092,scaleY:0.3092,x:945.2838,y:315.8903},0).wait(1).to({regX:0.4,regY:0.5,scaleX:0.3023,scaleY:0.3023,x:947.3,y:315.4},0).wait(1).to({regX:0,regY:0,scaleX:0.2954,scaleY:0.2954,x:949.0938,y:314.6023},0).wait(1).to({scaleX:0.2885,scaleY:0.2885,x:950.9875,y:313.9545},0).wait(1).to({scaleX:0.2816,scaleY:0.2816,x:952.8813,y:313.3068},0).wait(1).to({scaleX:0.2747,scaleY:0.2747,x:954.7751,y:312.6591},0).wait(1).to({scaleX:0.2678,scaleY:0.2678,x:956.6689,y:312.0113},0).wait(1).to({scaleX:0.2609,scaleY:0.2609,x:958.5627,y:311.3636},0).wait(1).to({scaleX:0.254,scaleY:0.254,x:960.4564,y:310.7159},0).wait(1).to({scaleX:0.2471,scaleY:0.2471,x:962.3502,y:310.0681},0).wait(1).to({scaleX:0.2402,scaleY:0.2402,x:964.244,y:309.4204},0).wait(1).to({scaleX:0.2333,scaleY:0.2333,x:966.1378,y:308.7727},0).wait(1).to({scaleX:0.2264,scaleY:0.2264,x:968.0315,y:308.1249},0).wait(1).to({scaleX:0.2195,scaleY:0.2195,x:969.9253,y:307.4772},0).wait(1).to({scaleX:0.2126,scaleY:0.2126,x:971.8191,y:306.8294},0).wait(1).to({scaleX:0.2057,scaleY:0.2057,x:973.7129,y:306.1817},0).wait(1).to({scaleX:0.1988,scaleY:0.1988,x:975.6066,y:305.534},0).wait(1).to({scaleX:0.1919,scaleY:0.1919,x:977.5004,y:304.8862},0).wait(1).to({scaleX:0.1849,scaleY:0.1849,x:979.3942,y:304.2385},0).wait(1).to({scaleX:0.178,scaleY:0.178,x:981.288,y:303.5908},0).wait(1).to({scaleX:0.1711,scaleY:0.1711,x:983.1817,y:302.943},0).wait(1).to({scaleX:0.1642,scaleY:0.1642,x:985.0755,y:302.2953},0).wait(1).to({regY:2.8,scaleX:0.1651,scaleY:0.1651,x:992.05,y:303.85},0).wait(1).to({regY:0,scaleX:0.1639,scaleY:0.1639,x:993.6607,y:303.1207},0).wait(1).to({scaleX:0.1627,scaleY:0.1627,x:995.2714,y:302.8415},0).wait(1).to({scaleX:0.1614,scaleY:0.1614,x:996.8821,y:302.5623},0).wait(1).to({scaleX:0.1602,scaleY:0.1602,x:998.4928,y:302.2831},0).wait(1).to({scaleX:0.159,scaleY:0.159,x:1000.1035,y:302.0039},0).wait(1).to({scaleX:0.1578,scaleY:0.1578,x:1001.7142,y:301.7247},0).wait(1).to({scaleX:0.1566,scaleY:0.1566,x:1003.3248,y:301.4455},0).wait(1).to({scaleX:0.1553,scaleY:0.1553,x:1004.9355,y:301.1662},0).wait(1).to({scaleX:0.1541,scaleY:0.1541,x:1006.5462,y:300.887},0).wait(1).to({scaleX:0.1529,scaleY:0.1529,x:1008.1569,y:300.6078},0).wait(1).to({scaleX:0.1517,scaleY:0.1517,x:1009.7676,y:300.3286},0).wait(1).to({scaleX:0.1505,scaleY:0.1505,x:1011.3783,y:300.0494},0).wait(1).to({scaleX:0.1492,scaleY:0.1492,x:1012.989,y:299.7702},0).wait(1).to({scaleX:0.1503,scaleY:0.1503,x:1016.208,y:300.4192},0).wait(1).to({scaleX:0.1514,scaleY:0.1514,x:1019.427,y:301.0681},0).wait(1).to({scaleX:0.1524,scaleY:0.1524,x:1022.646,y:301.7171},0).wait(1).to({scaleX:0.1535,scaleY:0.1535,x:1025.865,y:302.3661},0).wait(1).to({scaleX:0.1546,scaleY:0.1546,x:1029.084,y:303.0151},0).wait(1).to({scaleX:0.1556,scaleY:0.1556,x:1032.303,y:303.6641},0).wait(1).to({scaleX:0.1567,scaleY:0.1567,x:1035.522,y:304.3131},0).wait(1).to({scaleX:0.1578,scaleY:0.1578,x:1038.741,y:304.962},0).wait(1).to({scaleX:0.1588,scaleY:0.1588,x:1041.96,y:305.611},0).wait(1).to({scaleX:0.1599,scaleY:0.1599,x:1045.179,y:306.26},0).wait(1).to({scaleX:0.161,scaleY:0.161,x:1048.398,y:306.909},0).wait(1).to({scaleX:0.162,scaleY:0.162,x:1051.617,y:307.558},0).wait(1).to({scaleX:0.1631,scaleY:0.1631,x:1054.836,y:308.207},0).wait(1).to({scaleX:0.1642,scaleY:0.1642,x:1058.055,y:308.8559},0).wait(1).to({scaleX:0.1652,scaleY:0.1652,x:1061.274,y:309.5049},0).wait(1).to({scaleX:0.1594,scaleY:0.1594,x:1070.5703,y:308.4287},0).wait(1).to({scaleX:0.1535,scaleY:0.1535,x:1079.8666,y:307.3525},0).wait(1).to({scaleX:0.1477,scaleY:0.1477,x:1089.1629,y:306.2763},0).wait(1).to({scaleX:0.1418,scaleY:0.1418,x:1098.4593,y:305.2001},0).wait(1).to({scaleX:0.136,scaleY:0.136,x:1107.7556,y:304.1239},0).wait(1).to({scaleX:0.1301,scaleY:0.1301,x:1117.0519,y:303.0477},0).wait(1).to({scaleX:0.1243,scaleY:0.1243,x:1126.3482,y:301.9715},0).wait(1).to({scaleX:0.1184,scaleY:0.1184,x:1135.6445,y:300.8952},0).wait(1).to({scaleX:0.1126,scaleY:0.1126,x:1144.9408,y:299.819},0).wait(1).to({scaleX:0.1067,scaleY:0.1067,x:1154.2372,y:298.7428},0).wait(1).to({scaleX:0.1008,scaleY:0.1008,x:1163.5335,y:297.6666},0).wait(1).to({scaleX:0.095,scaleY:0.095,x:1172.8298,y:296.5904},0).wait(1).to({scaleX:0.0891,scaleY:0.0891,x:1182.1261,y:295.5142},0).wait(1).to({scaleX:0.0833,scaleY:0.0833,x:1191.4224,y:294.438},0).wait(1).to({scaleX:0.0774,scaleY:0.0774,x:1200.7187,y:293.3618},0).wait(1).to({scaleX:0.0716,scaleY:0.0716,x:1210.0151,y:292.2856},0).wait(1).to({scaleX:0.0657,scaleY:0.0657,x:1219.3114,y:291.2094},0).wait(1).to({scaleX:0.0599,scaleY:0.0599,x:1228.6077,y:290.1331},0).wait(1).to({scaleX:0.054,scaleY:0.054,x:1237.904,y:289.0569},0).wait(9).to({_off:true},1).wait(1));

	// חבר_טלפון_obj_
	this.חבר_טלפון = new lib.Scene_1_חבר_טלפון();
	this.חבר_טלפון.name = "חבר_טלפון";
	this.חבר_טלפון.depth = 0;
	this.חבר_טלפון.isAttachedToCamera = 0
	this.חבר_טלפון.isAttachedToMask = 0
	this.חבר_טלפון.layerDepth = 0
	this.חבר_טלפון.layerIndex = 0
	this.חבר_טלפון.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.חבר_טלפון).wait(450).to({regX:1045.5,regY:306.1,scaleX:5.6948,scaleY:5.6948,y:0.05},0).wait(57).to({regX:681.1,regY:183.8,scaleX:3.2074,scaleY:3.2074,x:-0.15,y:-0.15},0).wait(53).to({regX:753.6,regY:175.8,scaleX:6.2588,scaleY:6.2588,x:0,y:0.35},0).wait(50).to({regX:552.5,regY:191.5,scaleX:2.7462,scaleY:2.7462,x:0.15,y:0},0).wait(47).to({regX:504.7,regY:125,scaleX:1.6695,scaleY:1.6695,x:0,y:0.05},0).wait(25).to({regX:614.9,regY:166,scaleX:2.2022,scaleY:2.2022,x:0.15,y:0},0).wait(11).to({regX:656.5,regY:178.2,scaleX:2.4478,scaleY:2.4478,y:0.15},0).wait(12).to({regX:701.9,regY:191.4,scaleX:2.7867,scaleY:2.7867,x:0,y:0.05},0).wait(13).to({regX:753.8,regY:206.4,scaleX:3.3084,scaleY:3.3084,x:0.15,y:0},0).to({_off:true},21).wait(58));

	// טלפון_ושולחן_obj_
	this.טלפון_ושולחן = new lib.Scene_1_טלפון_ושולחן();
	this.טלפון_ושולחן.name = "טלפון_ושולחן";
	this.טלפון_ושולחן.setTransform(615.3,421.4,1,1,0,0,0,615.3,421.4);
	this.טלפון_ושולחן.depth = 0;
	this.טלפון_ושולחן.isAttachedToCamera = 0
	this.טלפון_ושולחן.isAttachedToMask = 0
	this.טלפון_ושולחן.layerDepth = 0
	this.טלפון_ושולחן.layerIndex = 1
	this.טלפון_ושולחן.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.טלפון_ושולחן).wait(23).to({regX:607.5,regY:449.7,scaleX:1.2151,scaleY:1.2151,y:421.45},0).wait(21).to({regX:615.1,regY:427.7,scaleX:1.0181,scaleY:1.0181,y:421.35},0).wait(10).to({regX:614.8,regY:396.7,scaleX:1.0897,scaleY:1.0897,x:615.35,y:421.3},0).wait(8).to({regX:614.5,regY:371.9,scaleX:1.1546,scaleY:1.1546,y:421.35},0).wait(11).to({regX:616.4,regY:368.7,scaleX:1.1702,scaleY:1.1702,x:615.3,y:421.4},0).wait(6).to({regX:617.4,regY:366.8,scaleX:1.1788,scaleY:1.1788,x:615.25,y:421.3},0).wait(10).to({regX:619.1,regY:363.8,scaleX:1.1935,scaleY:1.1935,x:615.3,y:421.35},0).wait(7).to({regX:620.3,regY:361.8,scaleX:1.204,scaleY:1.204,x:615.35,y:421.4},0).wait(7).to({regX:621.6,regY:359.7,scaleX:1.2147,scaleY:1.2147},0).wait(7).to({regX:622.7,regY:357.6,scaleX:1.2256,scaleY:1.2256,x:615.25,y:421.35},0).wait(7).to({regX:624,regY:355.4,scaleX:1.2367,scaleY:1.2367,x:615.4,y:421.3},0).wait(7).to({regX:625.1,regY:353.3,scaleX:1.248,scaleY:1.248,x:615.25,y:421.35},0).wait(11).to({regX:611.8,regY:421.2,scaleX:1.0062,scaleY:1.0062,x:615.35,y:421.3},0).wait(58).to({regX:739.5,regY:228.8,scaleX:7.9293,scaleY:7.9293,y:421.5},0).to({_off:true},153).wait(451));

	// איש_עם_פלאפון_מאוהב_obj_
	this.איש_עם_פלאפון_מאוהב = new lib.Scene_1_איש_עם_פלאפון_מאוהב();
	this.איש_עם_פלאפון_מאוהב.name = "איש_עם_פלאפון_מאוהב";
	this.איש_עם_פלאפון_מאוהב.depth = 0;
	this.איש_עם_פלאפון_מאוהב.isAttachedToCamera = 0
	this.איש_עם_פלאפון_מאוהב.isAttachedToMask = 0
	this.איש_עם_פלאפון_מאוהב.layerDepth = 0
	this.איש_עם_פלאפון_מאוהב.layerIndex = 2
	this.איש_עם_פלאפון_מאוהב.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.איש_עם_פלאפון_מאוהב).wait(44).to({regX:10.8,regY:13.8,scaleX:1.0181,scaleY:1.0181,x:0.05,y:-0.05},0).wait(45).to({regX:103.5,regY:10.8,scaleX:1.1935,scaleY:1.1935,x:-0.05,y:0.05},0).wait(46).to({regX:0.3,regY:2.5,scaleX:1.0062,scaleY:1.0062,x:0.05,y:0},0).wait(1).to({scaleX:1.0063,scaleY:1.0063,x:0},0).wait(1).to({_off:true},209).wait(451));

	// שלט_מזבלה_obj_
	this.שלט_מזבלה = new lib.Scene_1_שלט_מזבלה();
	this.שלט_מזבלה.name = "שלט_מזבלה";
	this.שלט_מזבלה.depth = 0;
	this.שלט_מזבלה.isAttachedToCamera = 0
	this.שלט_מזבלה.isAttachedToMask = 0
	this.שלט_מזבלה.layerDepth = 0
	this.שלט_מזבלה.layerIndex = 3
	this.שלט_מזבלה.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.שלט_מזבלה).wait(193).to({regX:661.9,regY:175.7,scaleX:7.9293,scaleY:7.9293,x:0.05,y:0.45},0).wait(153).to({regX:501.2,regY:125.5,scaleX:1.6614,scaleY:1.6614,x:0.1,y:0},0).wait(205).to({regX:502.9,regY:143.3,scaleX:4.6081,scaleY:4.6081,x:-0.2,y:0.25},0).wait(59).to({regX:552.5,regY:191.5,scaleX:2.7462,scaleY:2.7462,x:0.15,y:0},0).wait(47).to({regX:504.7,regY:125,scaleX:1.6695,scaleY:1.6695,x:0,y:0.05},0).to({_off:true},26).wait(114));

	// כפתור_התחלה_סוף_obj_
	this.כפתור_התחלה_סוף = new lib.Scene_1_כפתור_התחלה_סוף();
	this.כפתור_התחלה_סוף.name = "כפתור_התחלה_סוף";
	this.כפתור_התחלה_סוף.setTransform(629.9,171.9,1,1,0,0,0,629.9,171.9);
	this.כפתור_התחלה_סוף.depth = 0;
	this.כפתור_התחלה_סוף.isAttachedToCamera = 0
	this.כפתור_התחלה_סוף.isAttachedToMask = 0
	this.כפתור_התחלה_סוף.layerDepth = 0
	this.כפתור_התחלה_סוף.layerIndex = 4
	this.כפתור_התחלה_סוף.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.כפתור_התחלה_סוף).wait(1).to({regX:629.6,regY:174.5,scaleX:1.0092,scaleY:1.0092},0).wait(794).to({regX:1237.3,regY:278.9,scaleX:18.5235,scaleY:18.5235,x:629.8,y:171.35},0).wait(2));

	// הסוף_obj_
	this.הסוף = new lib.Scene_1_הסוף();
	this.הסוף.name = "הסוף";
	this.הסוף.depth = 0;
	this.הסוף.isAttachedToCamera = 0
	this.הסוף.isAttachedToMask = 0
	this.הסוף.layerDepth = 0
	this.הסוף.layerIndex = 5
	this.הסוף.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.הסוף).wait(193).to({regX:661.9,regY:175.7,scaleX:7.9293,scaleY:7.9293,x:0.05,y:0.45},0).wait(387).to({regX:753.6,regY:175.8,scaleX:6.2594,scaleY:6.2594,x:0,y:0.35},0).wait(77).to({regX:504.7,regY:125,scaleX:1.6695,scaleY:1.6695,y:0.05},0).wait(25).to({regX:614.9,regY:166,scaleX:2.2022,scaleY:2.2022,x:0.15,y:0},0).wait(11).to({regX:656.5,regY:178.2,scaleX:2.4478,scaleY:2.4478,y:0.15},0).wait(12).to({regX:701.9,regY:191.4,scaleX:2.7867,scaleY:2.7867,x:0,y:0.05},0).wait(13).to({regX:753.8,regY:206.4,scaleX:3.3084,scaleY:3.3084,x:0.15,y:0},0).wait(21).to({regX:886.4,regY:244,scaleX:6.0575,scaleY:6.0575,x:0.3,y:0.35},0).to({_off:true},56).wait(2));

	// טלפון_בהר_זבל_obj_
	this.טלפון_בהר_זבל = new lib.Scene_1_טלפון_בהר_זבל();
	this.טלפון_בהר_זבל.name = "טלפון_בהר_זבל";
	this.טלפון_בהר_זבל.depth = 0;
	this.טלפון_בהר_זבל.isAttachedToCamera = 0
	this.טלפון_בהר_זבל.isAttachedToMask = 0
	this.טלפון_בהר_זבל.layerDepth = 0
	this.טלפון_בהר_זבל.layerIndex = 6
	this.טלפון_בהר_זבל.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.טלפון_בהר_זבל).wait(193).to({regX:661.9,regY:175.7,scaleX:7.9293,scaleY:7.9293,x:0.05,y:0.45},0).wait(153).to({regX:501.2,regY:125.5,scaleX:1.6614,scaleY:1.6614,x:0.1,y:0},0).wait(6).to({y:0.1},0).wait(98).to({regX:1045.5,regY:306.1,scaleX:5.6948,scaleY:5.6948,x:0,y:0.05},0).wait(110).to({regX:753.6,regY:175.8,scaleX:6.2588,scaleY:6.2588,y:0.35},0).wait(50).to({regX:552.5,regY:191.5,scaleX:2.7462,scaleY:2.7462,x:0.15,y:0},0).wait(47).to({regX:504.7,regY:125,scaleX:1.6695,scaleY:1.6695,x:0,y:0.05},0).to({_off:true},46).wait(94));

	// חלון_בביתוזבל_עם_איש_obj_
	this.חלון_בביתוזבל_עם_איש = new lib.Scene_1_חלון_בביתוזבל_עם_איש();
	this.חלון_בביתוזבל_עם_איש.name = "חלון_בביתוזבל_עם_איש";
	this.חלון_בביתוזבל_עם_איש.depth = 0;
	this.חלון_בביתוזבל_עם_איש.isAttachedToCamera = 0
	this.חלון_בביתוזבל_עם_איש.isAttachedToMask = 0
	this.חלון_בביתוזבל_עם_איש.layerDepth = 0
	this.חלון_בביתוזבל_עם_איש.layerIndex = 7
	this.חלון_בביתוזבל_עם_איש.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.חלון_בביתוזבל_עם_איש).wait(22).to({regX:97.4,regY:98.3,scaleX:1.2052,scaleY:1.2052,x:0.05,y:0.05},0).wait(171).to({regX:661.9,regY:175.7,scaleX:7.9293,scaleY:7.9293,y:0.45},0).to({_off:true},153).wait(451));

	// בית_וזבל_obj_
	this.בית_וזבל = new lib.Scene_1_בית_וזבל();
	this.בית_וזבל.name = "בית_וזבל";
	this.בית_וזבל.depth = 0;
	this.בית_וזבל.isAttachedToCamera = 0
	this.בית_וזבל.isAttachedToMask = 0
	this.בית_וזבל.layerDepth = 0
	this.בית_וזבל.layerIndex = 8
	this.בית_וזבל.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.בית_וזבל).wait(193).to({regX:661.9,regY:175.7,scaleX:7.9293,scaleY:7.9293,x:0.05,y:0.45},0).to({_off:true},153).wait(451));

	// מחיצת_חלון_obj_
	this.מחיצת_חלון = new lib.Scene_1_מחיצת_חלון();
	this.מחיצת_חלון.name = "מחיצת_חלון";
	this.מחיצת_חלון.setTransform(642.4,211.3,1,1,0,0,0,642.4,211.3);
	this.מחיצת_חלון.depth = 0;
	this.מחיצת_חלון.isAttachedToCamera = 0
	this.מחיצת_חלון.isAttachedToMask = 0
	this.מחיצת_חלון.layerDepth = 0
	this.מחיצת_חלון.layerIndex = 9
	this.מחיצת_חלון.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.מחיצת_חלון).wait(44).to({regX:641.6,regY:221.5,scaleX:1.0181,scaleY:1.0181,x:642.25,y:211.4},0).wait(91).to({regX:638.6,regY:212.5,scaleX:1.0062,scaleY:1.0062,x:642.35,y:211.3},0).to({_off:true},58).wait(604));

	// חלון_ווילון_obj_
	this.חלון_ווילון = new lib.Scene_1_חלון_ווילון();
	this.חלון_ווילון.name = "חלון_ווילון";
	this.חלון_ווילון.setTransform(633.4,229,1,1,0,0,0,633.4,229);
	this.חלון_ווילון.depth = 0;
	this.חלון_ווילון.isAttachedToCamera = 0
	this.חלון_ווילון.isAttachedToMask = 0
	this.חלון_ווילון.layerDepth = 0
	this.חלון_ווילון.layerIndex = 10
	this.חלון_ווילון.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.חלון_ווילון).wait(44).to({regX:632.9,regY:238.7,scaleX:1.0181,scaleY:1.0181,y:228.9},0).wait(8).to({regX:631.7,regY:223.9,scaleX:1.0746,scaleY:1.0746,y:228.95},0).wait(10).to({regX:630.1,regY:205.3,scaleX:1.1546,scaleY:1.1546,x:633.35,y:229},0).wait(7).to({regX:631.3,regY:204.7,scaleX:1.1645,scaleY:1.1645,x:633.45},0).wait(10).to({regX:632.8,regY:203.6,scaleX:1.1788,scaleY:1.1788,y:228.95},0).wait(7).to({regX:633.9,regY:203,scaleX:1.189,scaleY:1.189,x:633.5,y:229.05},0).wait(10).to({regX:635.3,regY:202,scaleX:1.204,scaleY:1.204,x:633.4,y:229},0).wait(7).to({regX:636.5,regY:201.3,scaleX:1.2147,scaleY:1.2147,x:633.45},0).wait(7).to({regX:637.5,regY:200.6,scaleX:1.2256,scaleY:1.2256,x:633.4,y:228.95},0).wait(7).to({regX:638.6,regY:199.8,scaleX:1.2367,scaleY:1.2367,x:633.45,y:228.9},0).wait(7).to({regX:639.6,regY:199.1,scaleX:1.248,scaleY:1.248,x:633.35},0).wait(7).to({regX:640.8,regY:198.5,scaleX:1.2594,scaleY:1.2594,x:633.45,y:229},0).wait(4).to({regX:629.7,regY:230,scaleX:1.0062,scaleY:1.0062,x:633.35,y:228.95},0).to({_off:true},58).wait(604));

	// רקע_obj_
	this.רקע = new lib.Scene_1_רקע();
	this.רקע.name = "רקע";
	this.רקע.setTransform(639.3,359.9,1,1,0,0,0,639.3,359.9);
	this.רקע.depth = 0;
	this.רקע.isAttachedToCamera = 0
	this.רקע.isAttachedToMask = 0
	this.רקע.layerDepth = 0
	this.רקע.layerIndex = 11
	this.רקע.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.רקע).wait(44).to({regX:638.6,regY:367.3,scaleX:1.0181,scaleY:1.0181,x:639.2,y:359.85},0).wait(149).to({regX:742.5,regY:221.1,scaleX:7.9293,scaleY:7.9293,x:639.15,y:360.45},0).wait(3).to({regX:738.4,regY:226.4,scaleX:6.2214,scaleY:6.2214,x:639.55,y:359.9},0).wait(5).to({regX:731.4,regY:235.5,scaleX:4.5781,scaleY:4.5781,x:639.15,y:360.1},0).wait(145).to({regX:885.9,regY:342.1,scaleX:1.6614,scaleY:1.6614,x:639.25,y:359.85},0).wait(311).to({regX:887.6,regY:340.5,scaleX:1.6695,scaleY:1.6695,y:359.8},0).wait(1).to({regY:340.2,scaleX:1.6846,scaleY:1.6846,x:639.3,y:359.85},0).wait(1).to({regX:887.5,regY:339.9,scaleX:1.6999,scaleY:1.6999,x:639.25,y:359.9},0).wait(1).to({regY:339.6,scaleX:1.7154,scaleY:1.7154,y:359.85},0).wait(1).to({regY:339.3,scaleX:1.7313,scaleY:1.7313,x:639.2,y:359.95},0).wait(1).to({regY:338.9,scaleX:1.7474,scaleY:1.7474,x:639.3,y:359.9},0).wait(1).to({regX:887.4,regY:338.6,scaleX:1.7638,scaleY:1.7638,x:639.2,y:359.85},0).wait(1).to({regX:887.5,regY:338.3,scaleX:1.7806,scaleY:1.7806,x:639.35,y:359.9},0).wait(1).to({regX:887.4,regY:337.9,scaleX:1.7977,scaleY:1.7977,x:639.25,y:359.75},0).wait(1).to({regY:337.7,scaleX:1.8151,scaleY:1.8151,x:639.35,y:359.95},0).wait(1).to({regY:337.3,scaleX:1.8328,scaleY:1.8328,x:639.4,y:359.9},0).wait(1).to({regX:887.3,regY:337,scaleX:1.8509,scaleY:1.8509,x:639.3,y:359.85},0).wait(1).to({regY:336.7,scaleX:1.8694,scaleY:1.8694,x:639.35,y:359.95},0).wait(1).to({regY:336.4,scaleX:1.8882,scaleY:1.8882,x:639.25,y:359.9},0).wait(1).to({regY:336,scaleX:1.9074,scaleY:1.9074,x:639.35,y:359.85},0).wait(1).to({regX:886.1,regY:335.7,scaleX:1.9117,scaleY:1.9117,x:639.15,y:359.9},0).wait(1).to({regX:888,regY:334.9,scaleX:1.9373,scaleY:1.9373,x:639.2,y:359.7},0).wait(1).to({regX:889.9,regY:334.4,scaleX:1.9636,scaleY:1.9636,x:639.25,y:359.85},0).wait(1).to({regX:891.9,regY:333.8,scaleX:1.9905,scaleY:1.9905,x:639.35,y:359.9},0).wait(1).to({regX:893.8,regY:333.2,scaleX:2.0183,scaleY:2.0183,x:639.4,y:360},0).wait(1).to({regX:895.6,regY:332.4,scaleX:2.0468,scaleY:2.0468,x:639.25,y:359.75},0).wait(1).to({regX:897.5,regY:331.9,scaleX:2.0761,scaleY:2.0761,x:639.2,y:360},0).wait(1).to({regX:899.4,regY:331.2,scaleX:2.1062,scaleY:2.1062,x:639.25,y:359.9},0).wait(1).to({regX:901.3,regY:330.5,scaleX:2.1374,scaleY:2.1374,x:639.3,y:359.85},0).wait(1).to({regX:903.2,regY:329.9,scaleX:2.1693,scaleY:2.1693,x:639.2,y:359.9},0).wait(1).to({regX:905.1,regY:329.4,scaleX:2.2022,scaleY:2.2022,y:359.85},0).wait(1).to({regX:906.2,regY:329.1,scaleX:2.2226,scaleY:2.2226,y:359.95},0).wait(1).to({regX:907.4,regY:328.7,scaleX:2.2432,scaleY:2.2432,x:639.35},0).wait(1).to({regX:908.5,regY:328.3,scaleX:2.2642,scaleY:2.2642,x:639.2},0).wait(1).to({regX:909.6,regY:327.8,scaleX:2.2857,scaleY:2.2857,x:639.25,y:359.8},0).wait(1).to({regX:910.9,regY:327.4,scaleX:2.3075,scaleY:2.3075,x:639.4},0).wait(1).to({regX:911.9,regY:327.1,scaleX:2.3297,scaleY:2.3297,x:639.2,y:359.85},0).wait(1).to({regX:913.1,regY:326.7,scaleX:2.3525,scaleY:2.3525,x:639.4},0).wait(1).to({regX:914.2,regY:326.3,scaleX:2.3756,scaleY:2.3756,x:639.25,y:359.8},0).wait(1).to({regX:915.4,regY:325.9,scaleX:2.3992,scaleY:2.3992,x:639.4},0).wait(1).to({regX:916.5,regY:325.6,scaleX:2.4233,scaleY:2.4233,x:639.3,y:360.05},0).wait(1).to({regX:917.6,regY:325.2,scaleX:2.4478,scaleY:2.4478,x:639.25,y:360},0).wait(31).to({regX:958.3,regY:311.3,scaleX:3.8338,scaleY:3.8338,x:639.35,y:359.85},0).wait(1).to({regX:960.2,regY:310.7,scaleX:3.938,scaleY:3.938,x:639.15,y:359.95},0).wait(1).to({regX:962.1,regY:310,scaleX:4.0479,scaleY:4.0479,x:639.2,y:359.9},0).wait(1).to({regX:964,regY:309.4,scaleX:4.1644,scaleY:4.1644,x:639.25,y:360.05},0).wait(1).to({regX:965.9,regY:308.8,scaleX:4.2876,scaleY:4.2876,x:639.3,y:360.15},0).wait(1).to({regX:967.9,regY:308.1,scaleX:4.4182,scaleY:4.4182,x:639.55,y:359.9},0).wait(1).to({regX:969.6,regY:307.4,scaleX:4.5571,scaleY:4.5571,x:638.95,y:359.55},0).wait(1).to({regX:971.6,regY:306.8,scaleX:4.7053,scaleY:4.7053,x:639.25,y:360},0).wait(1).to({regX:973.6,regY:306.2,scaleX:4.8632,scaleY:4.8632,x:639.5,y:360.15},0).wait(1).to({regX:975.5,regY:305.5,scaleX:5.0319,scaleY:5.0319,x:639.6,y:359.8},0).wait(1).to({regX:977.4,regY:304.9,scaleX:5.2128,scaleY:5.2128,x:639.65,y:359.95},0).wait(1).to({regX:979.2,regY:304.2,scaleX:5.4077,scaleY:5.4077,x:639.2,y:359.9},0).wait(1).to({regX:981.1,regY:303.6,scaleX:5.6172,scaleY:5.6172,x:639.25,y:360.1},0).wait(1).to({regX:983,regY:302.9,scaleX:5.8436,scaleY:5.8436,x:639.3,y:359.65},0).wait(1).to({regX:984.9,regY:302.3,scaleX:6.089,scaleY:6.089,x:639.35,y:359.9},0).wait(1).to({regX:991.9,regY:303.4,scaleX:6.0575,scaleY:6.0575,y:360.15},0).wait(1).to({regX:993.5,regY:303.1,scaleX:6.1032,scaleY:6.1032,x:639.6,y:360.1},0).wait(1).to({regX:995.1,regY:302.8,scaleX:6.149,scaleY:6.149,x:639.5,y:360.05},0).wait(1).to({regX:996.7,regY:302.6,scaleX:6.1955,scaleY:6.1955,x:639.4,y:360.3},0).wait(1).to({regX:998.3,regY:302.3,scaleX:6.2427,scaleY:6.2427,x:639.6,y:360.2},0).to({_off:true},52).wait(2));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(590.6,357,840.9999999999999,512);
// library properties:
lib.properties = {
	id: 'C72935C9F0F4814CB694FC37EA4A4A51',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/animation_lirazasido_atlas_1.png?1618577581861", id:"animation_lirazasido_atlas_1"},
		{src:"sounds/MarriedLife.mp3?1618577582257", id:"MarriedLife"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C72935C9F0F4814CB694FC37EA4A4A51'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;