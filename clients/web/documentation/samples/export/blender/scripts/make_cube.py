from Blender import *
import bpy
point_cloud = [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]]
mesh = bpy.data.meshes.new("rad_mesh")
mesh.verts.extend(point_cloud)
scene = bpy.data.scenes.active
scene.objects.new(mesh, "rad_object")