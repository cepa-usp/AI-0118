package  
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	/**
	 * ...
	 * @author Arthur
	 */
	public class Cabo extends Sprite 
	{
		
		private var _ladoExpr:SimbExpr = null;
		private var _ladMat:SimbMat = null;
		private var _posExpr:Point = new Point(0, 0);
		private var _posMat:Point = null;
		private var contr:Point = new Point(0, 0);
		
		
		public function Cabo() 
		{
			
		}
		
		public function bindMouseEvents():void 
		{
			stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
			
		}
		
		public function setDestination(dest:SimbExpr):void 
		{
			this.ladoExpr = dest;
			this.ladoExpr.connectedTo = this._ladMat;
			this._ladMat.connectedTo = this.ladoExpr;
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
		}
		
		private function onMouseMove(e:MouseEvent):void 
		{
			posExpr.x = e.stageX;
			posExpr.y = e.stageY;
			draw();
		}
		
		private function draw():void 
		{
			this.graphics.clear();
			this.graphics.lineStyle(2, 0xFF8000, 1);
			this.graphics.moveTo(posMat.x, posMat.y);
			//this.graphics.lineTo(posExpr.x, posExpr.y);
			contr.x = _posMat.x + (posExpr.x - _posMat.x)/2;
			contr.y = posExpr.y + 200;
			this.graphics.curveTo(contr.x, contr.y, posExpr.x, posExpr.y)
			//this.graphics.drawCircle(contr.x, contr.y, 3);
			var dist:Number = Point.distance(posMat, posExpr);
			var dist2:Number = dist + dist * .3;
			var ang:Number = Math.atan2(posExpr.y-posMat.y, posExpr.x-posMat.x);
			
			
			trace(Math.cos(ang))
		}
		

		
		public function get ladoExpr():SimbExpr 
		{
			return _ladoExpr;
		}
		
		public function set ladoExpr(value:SimbExpr):void 
		{
			_ladoExpr = value;
		}
		
		public function get ladMat():SimbMat 
		{
			return _ladMat;
		}
		
		public function set ladMat(value:SimbMat):void 
		{
			_ladMat = value;
		}
		
		public function get posExpr():Point 
		{
			return _posExpr;
		}
		
		public function set posExpr(value:Point):void 
		{
			_posExpr = value;
		}
		
		public function get posMat():Point 
		{
			return _posMat;
		}
		
		public function set posMat(value:Point):void 
		{
			_posMat = value;
		}
		
	}

}