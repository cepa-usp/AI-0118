package  
{
	import flash.display.Sprite;
	
	/**
	 * ...
	 * @author Arthur
	 */
	public class SimbMat extends Sprite 
	{
		private var _connectedTo:Sprite = null;
		private var _cable:Cabo = null;
		public function SimbMat() 
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
		
		public function get cable():Cabo 
		{
			return _cable;
		}
		
		public function set cable(value:Cabo):void 
		{
			_cable = value;
		}
		
	}

}