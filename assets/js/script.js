(function() {
  var MESH = {
    width: 1.2,
    height: 1.2,
    slices: 250,
    ambient: '#555555',
    diffuse: '#FFFFFF',
    depth: 0,
  };

  var LIGHT = {
    count: 2,
    ambient: '#880066',
    diffuse: '#FF8800',
    zOffset: 100,
  };

  var RENDER = {
    renderer: 'canvas'
  };

  var center = FSS.Vector3.create();
  var container = document.body;
  var renderer, scene, mesh, geometry, material;

  function initialise() {
    createRenderer();
    createScene();
    createMesh();
    addLights();
    addEventListeners();
    resize(container.offsetWidth, container.offsetHeight);
    animate();
  }

  function createRenderer() {
    renderer = new FSS.CanvasRenderer();
    setRenderer(RENDER.renderer);
  }

  function setRenderer() {
    if (renderer) {
      if (renderer.element.parentNode) {
        container.removeChild(renderer.element);
      }
    }
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.element);
  }

  function createScene() {
    scene = new FSS.Scene();
  }

  function createMesh() {
    scene.remove(mesh);
    renderer.clear();
    geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.slices);
    material = new FSS.Material(MESH.ambient, MESH.diffuse);
    mesh = new FSS.Mesh(geometry, material);
    scene.add(mesh);

    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.depth = Math.randomInRange(0, 20);
      vertex.anchor = FSS.Vector3.clone(vertex.position);
    }
  }

  function addLights() {
    var i;
    for (i = 0; i < LIGHT.count; i++) {
      var light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
      light.setPosition(Math.randomInRange(-300, 300), Math.randomInRange(-300, 300), LIGHT.zOffset);
      scene.add(light);
    }
  }

  function resize(width, height) {
    renderer.setSize(width, height);
    FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
    createMesh();
  }

  function animate() {
    render();
    requestAnimationFrame(animate);
  }

  function render() {
    renderer.render(scene);
  }

  function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize(event) {
    resize(container.offsetWidth, container.offsetHeight);
    render();
  }

  initialise();
})();