export interface PlanConf extends NewPlanConf {
  id: string
  created: number
}

export type NewPlanConf = {
  name: string
  areaHa: number
  json: any
  fileSettings: {
    fileType: FileType
    zoningColumn: string
    tableName?: string
    crs?: string
  }
}

export type FileType = 'shp' | 'geojson' | 'gpkg'
