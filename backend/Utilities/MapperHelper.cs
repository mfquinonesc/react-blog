public static class MapperHelper
{
    public static TTarget Map<TSource, TTarget>(TSource source) where TTarget : new()
    {
        var target = new TTarget();
        var sourceProperties = typeof(TSource).GetProperties();
        var targetProperties = typeof(TTarget).GetProperties();

        foreach (var sourceProp in sourceProperties)
        {
            var targetProp = targetProperties.FirstOrDefault(p => p.Name == sourceProp.Name && p.PropertyType == sourceProp.PropertyType);
            if (targetProp != null)
            {
                targetProp.SetValue(target, sourceProp.GetValue(source));
            }
        }

        return target;
    }
}
