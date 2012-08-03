package  
{
	import flash.display.Sprite;
	
	/**
	 * ...
	 * @author Arthur
	 */
	public class SimbExpr extends Sprite 
	{
		private var _connectedTo:Sprite = null;
		
		private var _valor:Boolean = false;
		
		public function setPosition(x:int, y:int):Sprite {
			this.x = x;
			this.y = y;
			return this;
		}
		
		public function SimbExpr() 
		{

		}
		
		public function get connectedTo():Sprite 
		{
			return _connectedTo;
		}
		
		public function set connectedTo(value:Sprite):void 
		{
			_connectedTo = value;
		}
		
		public function get valor():Boolean 
		{
			return _valor;
		}
		
		public function set valor(value:Boolean):void 
		{
			_valor = value;
		}
		
	}

}