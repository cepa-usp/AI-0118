package 
{
	import cepa.tutorial.CaixaTexto;
	import cepa.tutorial.Tutorial;
	import cepa.tutorial.TutorialEvent;
	import com.eclecticdesignstudio.motion.Actuate;
	import com.eclecticdesignstudio.motion.easing.Elastic;
	import com.eclecticdesignstudio.motion.easing.Linear;
	import com.eclecticdesignstudio.motion.easing.Quad;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.geom.Point;
	import flash.utils.getDefinitionByName;
	
	
	/**
	 * ...
	 * @author Arthur
	 */
	public class Main extends Sprite 
	{
		private var eq:Equacao = new Equacao();
		private var lyr_cabos:Sprite = new Sprite();
		private var tut:Tutorial = new Tutorial();
		private var istut:Boolean = false;
		private var cable:Cabo = null;
		private var expressoes:Vector.<SimbExpr> = new Vector.<SimbExpr>();
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
			if(ExternalInterface.available){
				ExternalInterface.addCallback("getScore", getScore)
				
			}
		}
		
		private function fazTutorial():void {
			istut = true;
			tut.adicionarBalao("Clique sobre um elemento da equação", new Point(40, 80), CaixaTexto.TOP, CaixaTexto.FIRST)
			tut.adicionarBalao("Conecte-o a uma das palavras", new Point(300, 380), -1, -1)
			tut.addEventListener(TutorialEvent.BALAO_ABRIU, onBalaoAbriu);
			tut.addEventListener(TutorialEvent.FIM_TUTORIAL, onFimTutorial);
			tut.iniciar(this.stage);
			
		}
		
		private function onFimTutorial(e:TutorialEvent):void 
		{
			istut = false;
			highl(eq.s1, false)
			highl(expressoes[4], false)
			if (cable == null) return;
			cable.ladoExpr = null;
			onStageMouseDown();
			
		}
		
		private function onBalaoAbriu(e:TutorialEvent):void 
		{
			switch(e.numBalao) {
				case 0:
					highl(eq.s1, true, 0xFF0000);	
					startCable2(eq.s1, 40, 80, 200, 200)
					stage.removeEventListener(MouseEvent.MOUSE_MOVE, cable.onMouseMove);
					
					cable.posExpr.y = 185;
					cable.posExpr.x  200;
					cable.draw()
					break;
				case 1:
					
					Actuate.tween(cable.posExpr, 0.6, { x:500, y:330 }
					 ).onUpdate(function():void {					
						if (cable == null) return;
						 cable.draw();
					}).onComplete(function():void {
						highl(expressoes[4], true);
					}).ease(Quad.easeInOut);
					break;
			}
			
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			addChild(lyr_cabos);
			
			prepareExpr();
			prepareEq();
			stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageMouseDown)
			var b:BotaoOK = new BotaoOK();
			b.addEventListener(MouseEvent.CLICK, onBtClick);
			addChild(b);
			b.x = stage.stageWidth - (b.width/2)  - 10;
			b.y = stage.stageHeight - (b.height/2) - 10;
			fazTutorial()
		}
		
		private function onBtClick(e:MouseEvent):void 
		{
			if (istut) return;
			Sprite(e.target).removeEventListener(MouseEvent.CLICK, onBtClick);
			if (cable != null) return;
			avaliar();
			Actuate.tween(Sprite(e.target), 0.5, { alpha:0 } );
		}
		
		private function avaliar():void 
		{
			score = 0;
			var rel:Array = [ 
			{exp:"Exp_Ee", mat:"S_E"},
			{exp:"Exp_Eh", mat:"S_Igual" },
			{exp:"Exp_Conjunto", mat:"S_Colchetes" },
			{exp:"Exp_Pertence", mat:"S_Pertence" },
			{exp:"Exp_Talque", mat:"S_Talque" },
			]
			for each (var exp:SimbExpr in expressoes) {
				for (var i:int = 0; i < rel.length; i++) {
					if (exp is (getDefinitionByName(rel[i].exp) as Class)) {
						if (exp.connectedTo == null) {
								exp.valor = false;
						} else {
							exp.valor = (exp.connectedTo is (getDefinitionByName(rel[i].mat) as Class)) 
							if (exp.valor) score += 20;
						}
						//trace(rel[i].exp, rel[i].mat, exp.valor)
					}
				}
			}
			if(ExternalInterface.available){
				ExternalInterface.call("onFlashAvaliou");
			}
			atualizaCertoErrado();
			trace(score);
			
		}
		
		
		private function getScore():int {
			return score;
		}
		
		private var rr:Number = -1;
		private var score:Number;
		
		private function atualizaCertoErrado():void 
		{	
			
			rr++;
			if (rr >= expressoes.length) return;
			var exp:SimbExpr = expressoes[rr];
			var r:Sprite = new RCerto();
			if (!exp.valor) {
				r = new R_Errado();
			}	
			r.x = exp.x + exp.width/2;
			r.y = exp.y - 20;
			r.alpha = 0;
			r.scaleX = 0.1;
			r.scaleY = 0.1;
			addChild(r);
			Actuate.tween(r, 0.7, {scaleX:1, scaleY:1, alpha:1 } ).ease(Elastic.easeInOut)
			Actuate.timer(0.2).onComplete(atualizaCertoErrado);	
			
			
			
		}
		
		
		
		private function onStageMouseDown(e:MouseEvent = null):void 
		{
			if (istut) return;
			if (cable != null) {
				if (cable.ladoExpr == null) {
					lyr_cabos.removeChild(cable);
					
					cable = null;
				}
			}
		}
		
		private function prepareExpr():void {
			procExpr(addChild(new Exp_Conjunto().setPosition(360, 220)));
			procExpr(addChild(new Exp_Ee().setPosition(160, 250)));
			procExpr(addChild(new Exp_Eh().setPosition(300, 300)));
			procExpr(addChild(new Exp_Pertence().setPosition(80, 390)));
			procExpr(addChild(new Exp_Talque().setPosition(420, 360)));
		}
		
		private function procExpr(d:DisplayObject):void {
			var s:Sprite = Sprite(d);
			expressoes.push(SimbExpr(d));
			s.buttonMode = true;
			s.y -= 60;
			s.addEventListener(MouseEvent.MOUSE_OVER, highLight)
			s.addEventListener(MouseEvent.MOUSE_OVER, verifyCable)
			s.addEventListener(MouseEvent.MOUSE_OUT, unHighLight)
			s.addEventListener(MouseEvent.MOUSE_OUT, unverifyCable)
			s.addEventListener(MouseEvent.MOUSE_UP, releaseCable)		
			
		}
		
		private function unverifyCable(e:MouseEvent):void 
		{
			if (cable == null) return;
			cable.ladoExpr = null;
		}
		
		private function verifyCable(e:MouseEvent):void 
		{
			if (cable != null) {				
				cable.ladoExpr = SimbExpr(e.target);
				
			}
		}
		
		
		
		private function releaseCable(e:MouseEvent):void 
		{
			if (cable != null) {
				cable.setDestination(SimbExpr(e.target))
				cable = null;
			}
		}
		
		
		private function highl(s:Sprite, on_off:Boolean, cor:int = -1):void {
			var c:uint = (cor == -1?0x0000CE:cor);
			if (on_off) {
				Actuate.transform (s, 1).color (c, 1);	
			} else {
				Actuate.transform (s, 1).color (0x000000, 1);			
			}
		}
		
		private function unHighLight(e:MouseEvent):void 
		{
			var s:Sprite = Sprite(e.target);
			highl(s, false);			
		}
		
		private function highLight(e:MouseEvent):void 
		{
			var s:Sprite = Sprite(e.target);
			highl(s, true);			
		}

		
		private function highLightEQ(e:MouseEvent):void 
		{
			var s:Sprite = Sprite(e.target);
			highl(s, true, 0xFF0000);			
		}		
		
		private function prepareEq():void 
		{
			addChild(eq);
			eq.x = stage.stageWidth / 2 - eq.width / 2
			eq.y = 40
			for (var i:int = 1; i <= 8; i++) {
				eq.getChildByName("s" + i.toString()).filters = [];
				var sp:Sprite = Sprite(eq.getChildByName("s" + i.toString()));
				sp.buttonMode = true;
				sp.addEventListener(MouseEvent.MOUSE_OVER, highLightEQ)
				sp.addEventListener(MouseEvent.MOUSE_DOWN, startCable)
				sp.addEventListener(MouseEvent.MOUSE_OUT, unHighLight)				
			}
			
		}
		
		private function startCable(e:MouseEvent):void 
		{
			startCable2(SimbMat(e.target), e.stageX, e.stageY, stage.mouseX, stage.mouseY);
			e.stopImmediatePropagation();
		}
		
		private function startCable2(simbmat:SimbMat, posmatX:int, posmatY:int, posexpX:int, posexpY:int):void {
			if (cable != null) return;
			var mat:SimbMat = simbmat;
			if (mat.connectedTo != null) {
				SimbExpr(mat.connectedTo).connectedTo = null;
				mat.connectedTo = null;
				lyr_cabos.removeChild(mat.cable);
				mat.cable = null;
			}
			var c:Cabo = new Cabo();
			lyr_cabos.addChild(c);
			c.posMat = new Point(posmatX, posmatY)
			c.posExpr.x = posexpX;
			c.posExpr.y = posexpY;
			c.ladMat = mat;
			c.bindMouseEvents();
			cable = c;	
			mat.cable = cable;
		}
		
	}
	
}