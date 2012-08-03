package 
{
	import com.eclecticdesignstudio.motion.Actuate;
	import com.eclecticdesignstudio.motion.easing.Elastic;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
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
		private var cable:Cabo = null;
		private var expressoes:Vector.<SimbExpr> = new Vector.<SimbExpr>();
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
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
			b.x = stage.stageWidth / 2 + b.width / 2;
			b.y = stage.height - b.height - 20;
			
		}
		
		private function onBtClick(e:MouseEvent):void 
		{
			avaliar();
		}
		
		private function avaliar():void 
		{
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
						}
						trace(rel[i].exp, rel[i].mat, exp.valor)
					}
				}
			}
			
			atualizaCertoErrado();
			
		}
		
		private var rr:Number = -1;
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
		
		
		
		private function onStageMouseDown(e:MouseEvent):void 
		{
			if (cable != null) {
				if (cable.ladoExpr == null) {
					lyr_cabos.removeChild(cable);
					
					cable = null;
				}
			}
		}
		
		private function prepareExpr():void {
			procExpr(addChild(new Exp_Conjunto().setPosition(560, 170)));
			procExpr(addChild(new Exp_Ee().setPosition(160, 220)));
			procExpr(addChild(new Exp_Eh().setPosition(400, 300)));
			procExpr(addChild(new Exp_Pertence().setPosition(80, 390)));
			procExpr(addChild(new Exp_Talque().setPosition(450, 400)));
		}
		
		private function procExpr(d:DisplayObject):void {
			var s:Sprite = Sprite(d);
			expressoes.push(SimbExpr(d));
			s.buttonMode = true;
			s.addEventListener(MouseEvent.MOUSE_OVER, highLight)
			s.addEventListener(MouseEvent.MOUSE_OVER, verifyCable)
			s.addEventListener(MouseEvent.MOUSE_OUT, unHighLight)
			s.addEventListener(MouseEvent.MOUSE_UP, releaseCable)		
			
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
			eq.y = 100
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
			if (cable != null) return;
			var mat:SimbMat = SimbMat(e.target);
			if (mat.connectedTo != null) return;
			var c:Cabo = new Cabo();
			lyr_cabos.addChild(c);
			c.posMat = new Point(e.stageX, e.stageY)
			c.posExpr.x = stage.mouseX;
			c.posExpr.y = stage.mouseY;
			c.ladMat = mat;
			c.bindMouseEvents();
			cable = c;	
			e.stopImmediatePropagation();
			
			
		}
		
	}
	
}